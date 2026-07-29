"""
Debug script: test the exact auto-suggested question through retrieval + reranking.
"""
import asyncio
import sys
import os

os.environ["PYTHONIOENCODING"] = "utf-8"
sys.path.insert(0, ".")

from app.core.config import get_settings
from app.services.rag.sparse_retriever import SparseRetriever
from app.services.rag.vector_store import VectorStore
from app.services.rag.embeddings import EmbeddingModel
from app.services.rag.reranker import Reranker

settings = get_settings()
QUERY = "What is Praneeth's experience at DRDO?"

async def main():
    print(f"Testing query: {QUERY!r}")
    print(f"MIN_RELEVANCE_SCORE: {settings.MIN_RELEVANCE_SCORE}")
    print(f"RERANK_TOP_K: {settings.RERANK_TOP_K}")
    print()

    embedding_model = EmbeddingModel(settings.EMBEDDING_MODEL_NAME)
    await embedding_model.load()

    vector_store = VectorStore(
        persist_dir=settings.CHROMA_PERSIST_DIR,
        collection_name=settings.CHROMA_COLLECTION_NAME,
        embedding_dim=384,
    )
    sparse = SparseRetriever(settings.BM25_INDEX_DIR)

    # Test BM25
    bm25_results = sparse.query(QUERY, top_k=10)
    print(f"BM25 results ({len(bm25_results)}):")
    for r in bm25_results[:5]:
        text = r["text"][:100].encode("ascii", "replace").decode()
        print(f"  score={r['score']:.3f} | {text!r}")

    # Test dense
    query_vec = (await embedding_model.encode_async([QUERY]))[0]
    dense_results = await vector_store.query_async(query_vec, top_k=10)
    print(f"\nDense results ({len(dense_results)}):")
    for r in dense_results[:5]:
        text = r["text"][:100].encode("ascii", "replace").decode()
        print(f"  score={r['score']:.3f} | {text!r}")

    # Fuse scores
    fused = {}
    for r in dense_results:
        fused[r["id"]] = {**r, "dense_score": r["score"], "sparse_score": 0.0}
    for r in bm25_results:
        if r["id"] in fused:
            fused[r["id"]]["sparse_score"] = r["score"]
        else:
            fused[r["id"]] = {**r, "dense_score": 0.0, "sparse_score": r["score"]}
    for item in fused.values():
        item["fused_score"] = (
            settings.DENSE_WEIGHT * item["dense_score"] +
            settings.SPARSE_WEIGHT * item["sparse_score"]
        )
    merged = sorted(fused.values(), key=lambda x: x["fused_score"], reverse=True)

    print(f"\nFused hybrid results ({len(merged)}):")
    for r in merged[:7]:
        text = r["text"][:100].encode("ascii", "replace").decode()
        print(f"  fused={r['fused_score']:.3f} dense={r['dense_score']:.3f} sparse={r['sparse_score']:.3f} | {text!r}")

    # Reranker
    reranker = Reranker(settings.RERANKER_MODEL_NAME)
    reranked = await reranker.rerank_async(QUERY, merged[:20], top_k=settings.RERANK_TOP_K)
    print(f"\nReranked results:")
    for r in reranked:
        text = r["text"][:100].encode("ascii", "replace").decode()
        print(f"  rerank_score={r['rerank_score']:.4f} | {text!r}")

    valid = [c for c in reranked if c["rerank_score"] >= settings.MIN_RELEVANCE_SCORE]
    print(f"\nValid after MIN_RELEVANCE_SCORE ({settings.MIN_RELEVANCE_SCORE}): {len(valid)} chunks")
    if not valid:
        print(">>> PROBLEM: No valid chunks - chatbot will return fallback message!")
    else:
        print(">>> OK: Chunks found, LLM will be called.")

asyncio.run(main())
