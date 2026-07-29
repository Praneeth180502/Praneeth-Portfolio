"""
Quick test to check DRDO query retrieval pipeline.
"""
import asyncio, sys, os
os.environ["PYTHONIOENCODING"] = "utf-8"
sys.path.insert(0, ".")

from app.core.config import get_settings
from app.services.rag.sparse_retriever import SparseRetriever
from app.services.rag.vector_store import VectorStore
from app.services.rag.embeddings import EmbeddingModel
from app.services.rag.reranker import Reranker
from app.services.rag.hybrid_retriever import HybridRetriever

settings = get_settings()
QUERY = "What is Praneeth's experience at DRDO?"

async def main():
    print(f"Testing query: {QUERY!r}")
    print(f"MIN_RELEVANCE_SCORE: {settings.MIN_RELEVANCE_SCORE}")
    print(f"RERANK_TOP_K: {settings.RERANK_TOP_K}")
    print()

    embedding_model = EmbeddingModel(settings.EMBEDDING_MODEL_NAME)
    vector_store = VectorStore(
        persist_dir=str(settings.CHROMA_PERSIST_DIR),
        collection_name=settings.CHROMA_COLLECTION_NAME,
    )
    sparse = SparseRetriever(settings.BM25_INDEX_DIR)

    retriever = HybridRetriever(vector_store, sparse, embedding_model)
    candidates = await retriever.retrieve(QUERY, top_k=settings.RETRIEVAL_TOP_K)

    print(f"Hybrid candidates ({len(candidates)}):")
    for r in candidates[:10]:
        text = r["text"][:120].encode("ascii", "replace").decode()
        print(f"  fused={r['fused_score']:.4f} | {text!r}")

    print()
    reranker = Reranker(settings.RERANKER_MODEL_NAME)
    reranked = await reranker.rerank_async(QUERY, candidates, top_k=settings.RERANK_TOP_K)

    print(f"After reranking ({len(reranked)}):")
    for r in reranked:
        text = r["text"][:120].encode("ascii", "replace").decode()
        print(f"  rerank_score={r['rerank_score']:.4f} | {text!r}")

    valid = [c for c in reranked if c["rerank_score"] >= settings.MIN_RELEVANCE_SCORE]
    print(f"\nValid after MIN_RELEVANCE_SCORE ({settings.MIN_RELEVANCE_SCORE}): {len(valid)} chunks")
    if not valid:
        print(">>> PROBLEM: No valid chunks — chatbot will return fallback message!")
    else:
        print(">>> OK: Chunks found, LLM will be called.")
        for c in valid:
            print(f"  Source: {c['metadata'].get('source')} | Score: {c['rerank_score']:.4f}")
            print(f"  Text preview: {c['text'][:200]}")
            print()

asyncio.run(main())
