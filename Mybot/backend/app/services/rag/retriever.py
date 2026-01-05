import os
import json
import numpy as np
from .embedding import get_embedding

VECTOR_PATH = os.environ.get('VECTOR_STORE_PATH', './vectorstore/index.json')

def _load_index():
    if not os.path.exists(VECTOR_PATH):
        return {"chunks": [], "embeddings_path": VECTOR_PATH + '.npy'}
    with open(VECTOR_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def retrieve(query: str, k: int = 3):
    idx = _load_index()
    if not idx.get('chunks'):
        return []
    emb_path = idx['embeddings_path']
    if not os.path.exists(emb_path):
        return []
    embs = np.load(emb_path)
    q_emb = get_embedding(query)
    # cosine similarity
    q_norm = np.linalg.norm(q_emb)
    embs_norm = np.linalg.norm(embs, axis=1)
    sims = (embs @ q_emb) / (embs_norm * q_norm + 1e-10)
    topk_idx = np.argsort(-sims)[:k]
    results = []
    for i in topk_idx:
        if i >= len(idx['chunks']):
            continue
        chunk = idx['chunks'][i]
        results.append({"score": float(sims[i]), "text": chunk['text'], "meta": chunk['meta']})
    return results