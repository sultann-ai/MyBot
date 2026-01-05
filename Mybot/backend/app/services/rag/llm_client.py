import os
import openai

openai.api_key = os.environ.get('OPENAI_API_KEY')
LLM = "gpt-3.5-turbo"

PROMPT_TEMPLATE = """
You are given the following context from Sultan's bio. Answer the question as accurately as possible using this context. 
If the answer is not present, you may make a reasonable guess based on the context. Do not say 'I don't know' unless you are sure.
Context:\n{context}\n\nQuestion: {query}\nAnswer:
"""


def answer_with_context(query: str, docs: list):
    context = '\n---\n'.join([d['text'] for d in docs])
    prompt = PROMPT_TEMPLATE.format(context=context, query=query)
    resp = openai.ChatCompletion.create(
        model=LLM,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300,
        temperature=0.0
    )
    return resp['choices'][0]['message']['content'].strip()