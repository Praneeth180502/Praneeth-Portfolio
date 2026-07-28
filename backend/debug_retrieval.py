import asyncio
import sys
sys.path.insert(0, '.')

from app.core.config import get_settings
from app.services.rag.sparse_retriever import SparseRetriever
from app.services.rag.vector_store import VectorStore
from app.services.rag.embeddings import EmbeddingModel

settings = get_settings()
print("CHUNK_SIZE:", settings.CHUNK_SIZE)
print("RERANK_TOP_K:", settings.RERANK_TOP_K)
print("DENSE_WEIGHT:", settings.DENSE_WEIGHT)
print("SPARSE_WEIGHT:", settings.SPARSE_WEIGHT)
print()

# Test BM25 directly
sparse = SparseRetriever(settings.BM25_INDEX_DIR)
print("BM25 total chunks:", len(sparse.chunks))

results = sparse.query("DRDO experience internship Praneeth", top_k=5)
print("\nBM25 results for 'DRDO experience internship Praneeth':")
for r in results:
    score = r["score"]
    text = r["text"][:130]
    print(f"  score={score:.3f} | {text!r}")

print()
results2 = sparse.query("What is Praneeth experience at DRDO", top_k=5)
print("BM25 results for 'What is Praneeth experience at DRDO':")
for r in results2:
    score = r["score"]
    text = r["text"][:130]
    print(f"  score={score:.3f} | {text!r}")

# Check dense embeddings
async def test_dense():
    embedding_model = EmbeddingModel(settings.EMBEDDING_MODEL_NAME)
    await embedding_model.load()
    vector_store = VectorStore(
        persist_dir=settings.CHROMA_PERSIST_DIR,
        collection_name=settings.CHROMA_COLLECTION_NAME,
        embedding_dim=384,
    )
    print("\nChromaDB total chunks:", vector_store.count())
    query_vec = (await embedding_model.encode_async(["DRDO experience internship"]))[0]
    dense_results = await vector_store.query_async(query_vec, top_k=5)
    print("\nDense results for 'DRDO experience internship':")
    for r in dense_results:
        score = r["score"]
        text = r["text"][:130]
        print(f"  score={score:.3f} | {text!r}")

asyncio.run(test_dense())
