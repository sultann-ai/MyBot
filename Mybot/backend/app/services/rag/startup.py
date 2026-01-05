import os
from .ingest import ingest_text

# Derive project root and default bio path
PROJECT_ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../'))
DEFAULT_BIO = os.path.join(PROJECT_ROOT, 'data', 'biodata.txt')

def preload_bio():
    bio_file = DEFAULT_BIO
    if not os.path.exists(bio_file):
        print(f"BIO file not found at {bio_file}")
        return
    with open(bio_file, 'r', encoding='utf-8') as f:
        text = f.read()
    print('Preloading bio and building vector index...')
    res = ingest_text('biodata.txt', text)
    print(f'Preload complete: {res.get("num_chunks")} chunks indexed')