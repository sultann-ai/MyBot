import os                                           # access environment variables and OS-level features
import openai                                       # OpenAI Python client used to call the Embeddings API
import numpy as np                                  # numerical arrays and vector math utilities
import hashlib                                      # hashing utilities (SHA-256) for deterministic mock embedding

EMBED_MODEL = "text-embedding-3-small"              # constant: model name to request from OpenAI embeddings API

def _mock_embedding(text: str, dim: int = 1536):    # helper: deterministic, local-only embedding generator
    """Deterministic mock embedding based on SHA256 hash (for local dev)."""
    h = hashlib.sha256(text.encode('utf-8')).digest()   # compute SHA-256 digest of the UTF-8 bytes of the text
    arr = np.frombuffer(h, dtype=np.uint8).astype(float) # interpret digest bytes as unsigned ints, convert to float array
    reps = int(np.ceil(dim / arr.size))                  # compute how many times we need to repeat the digest to reach dim
    vals = np.tile(arr, reps)[:dim]                      # tile the digest bytes and slice to exactly `dim` length
    norm = np.linalg.norm(vals)                          # compute L2 norm of the vector (for normalization)
    if norm == 0:                                        # guard against zero-length vector (shouldn't happen here)
        return vals.astype(float)                        # return raw values if norm is zero
    return (vals / norm).astype(float)                   # return L2-normalized vector as floats

def get_embedding(text: str):
    # refresh key at call time in case dotenv was loaded later
    openai.api_key = os.environ.get('OPENAI_API_KEY')     # read OPENAI_API_KEY from environment and set client key
    use_mock = os.environ.get('DEV_USE_MOCK_EMBEDDINGS', '0').lower() in ('1', 'true', 'yes') 
                                                         # read flag to decide whether to use mock embeddings (interprets common truthy strings)
    if not openai.api_key:                                # if API key is not set in environment
        if use_mock:                                      # and if mock embeddings are allowed
            return _mock_embedding(text)                  # return deterministic mock embedding for local dev
        raise RuntimeError('OPENAI_API_KEY is not set in environment') 
                                                         # otherwise raise an explicit error (no API key available)
    resp = openai.Embedding.create(input=text, model=EMBED_MODEL)
                                                         # call OpenAI Embeddings API with provided text and chosen model
    vec = resp['data'][0]['embedding']                    # extract the embedding vector from the API response payload
    return np.array(vec, dtype=float)                     # convert to numpy array of floats and return it
