import os
import json
import numpy as np
from typing import Dict, Any
from .embedding import get_embedding
from ...utils.chunker import chunk_text

VECTOR_PATH = os.environ.get('VECTOR_STORE_PATH', './vectorstore/index.json')

os.makedirs(os.path.dirname(VECTOR_PATH), exist_ok=True)

def _load_index():
    if os.path.exists(VECTOR_PATH):
        with open(VECTOR_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"chunks": [], "embeddings_path": VECTOR_PATH + '.npy'}

def _save_index(index: Dict[str, Any]):
    with open(VECTOR_PATH, 'w', encoding='utf-8') as f:
        json.dump(index, f)

def ingest_text(filename: str, text: str):
    index = _load_index()
    chunks = chunk_text(text)
    embeddings = []
    metas = []
    for i, chunk in enumerate(chunks):
        emb = get_embedding(chunk)
        embeddings.append(emb.tolist())
        metas.append({"source": filename, "chunk": i, "text_snippet": chunk[:200]})
        index['chunks'].append({'id': f"{filename}_{i}", 'text': chunk, 'meta': metas[-1]})
    # persist embeddings as numpy array
    emb_arr = np.array(embeddings, dtype=float)
    np.save(index['embeddings_path'], emb_arr)
    _save_index(index)
    return {"num_chunks": len(chunks)}