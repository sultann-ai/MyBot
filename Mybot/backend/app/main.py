import os
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1 import query
from .services.rag.startup import preload_bio

app = FastAPI(title="TANi Backend (single-file)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Preload bio at startup
@app.on_event("startup")
async def startup_event():
    # preload the single bio file and build vector index
    preload_bio()

app.include_router(query.router, prefix="/api/v1/query", tags=["query"])

@app.get("/status")
async def status():
    # simple readiness endpoint
    return {"ready": True}  
@app.get("/health")
async def health():
    return {"status": "ok"}