"""
Comprehensive query test — checks which questions work and which don't.
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

QUERIES = [
    "What is Praneeth's experience at DRDO?",
    "Tell me about the missile project",
    "What did Praneeth build at DRDO?",
    "What is Praneeth's experience at CognitBotz?",
    "What projects has Praneeth built?",
    "What are Praneeth's skills?",
    "Tell me about OpenViz",
    "Tell me about SiLens AI",
    "What is Praneeth's education?",
    "Where did Praneeth study?",
    "What certifications does Praneeth have?",
    "Is Praneeth open to work?",
    "What is Praneeth's contact information?",
    "Who is Praneeth?",
    "Tell me about yourself",
    "What is his tech stack?",
    "Tell me about AI File Explorer",
    "What did he do for Adani?",
    "Tell me about Meet-Ops",
    "What is AURASELECT?",
]

async def main():
    embedding_model = EmbeddingModel(settings.EMBEDDING_MODEL_NAME)
    vector_store = VectorStore(
        persist_dir=str(settings.CHROMA_PERSIST_DIR),
        collection_name=settings.CHROMA_COLLECTION_NAME,
    )
    sparse = SparseRetriever(settings.BM25_INDEX_DIR)
    retriever = HybridRetriever(vector_store, sparse, embedding_model)
    reranker = Reranker(settings.RERANKER_MODEL_NAME)

    print(f"{'QUERY':<45} {'CANDIDATES':>10} {'TOP SCORE':>10} {'STATUS':>10}")
    print("-" * 80)

    for query in QUERIES:
        candidates = await retriever.retrieve(query, top_k=settings.RETRIEVAL_TOP_K)
        if not candidates:
            print(f"{query[:44]:<45} {'0':>10} {'N/A':>10} {'NO HITS':>10}")
            continue

        reranked = await reranker.rerank_async(query, candidates, top_k=settings.RERANK_TOP_K)
        valid = [c for c in reranked if c["rerank_score"] >= settings.MIN_RELEVANCE_SCORE]
        top_score = reranked[0]["rerank_score"] if reranked else 0
        top_source = reranked[0]["metadata"].get("source", "?") if reranked else "?"
        status = "OK" if valid else "FAIL"
        print(f"{query[:44]:<45} {len(candidates):>10} {top_score:>10.4f} {status:>10}  [{top_source}]")

    print()
    print("Details for any FAILED queries:")
    print("=" * 80)
    for query in QUERIES:
        candidates = await retriever.retrieve(query, top_k=settings.RETRIEVAL_TOP_K)
        if not candidates:
            print(f"\n❌ QUERY: {query!r}")
            print("   No candidates returned at all!")
            continue
        reranked = await reranker.rerank_async(query, candidates, top_k=settings.RERANK_TOP_K)
        valid = [c for c in reranked if c["rerank_score"] >= settings.MIN_RELEVANCE_SCORE]
        if not valid:
            print(f"\nFAIL: {query!r}")
            print(f"   Top chunk (score={reranked[0]['rerank_score']:.4f}): {reranked[0]['text'][:120]!r}")

asyncio.run(main())
