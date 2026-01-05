from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ...services.rag.retriever import retrieve
from ...services.rag.llm_client import answer_with_context

router = APIRouter()

class QueryRequest(BaseModel):
    query: str
    k: int = 3

@router.post("/")
async def query_endpoint(body: QueryRequest):
    if not body.query or not body.query.strip():
        raise HTTPException(status_code=400, detail="Query is empty")
    docs = retrieve(body.query, k=body.k)
    if not docs:
        return {"answer": "I don't have information to answer that.", "sources": []}
    answer = answer_with_context(body.query, docs)
    return {"answer": answer, "sources": [d['meta'] for d in docs]}