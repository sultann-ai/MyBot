MyBot — NLP Project

MyBot is a web-based chatbot developed as an academic NLP project.
The system allows users to ask questions and receive accurate responses based on a predefined knowledge source.

Project Features

Web interface built with React

Backend service using FastAPI

Retrieval pipeline for relevant information search

Language model for answer generation

Firebase Realtime Database for chat history

Clean modular design and scalable structure

System Architecture

The system consists of the following components:

Frontend: React web application

Backend: FastAPI server

Retrieval Module: Finds relevant text segments

Vector Store: Stores embeddings and metadata

Language Model: Generates responses

Database: Firebase Realtime Database for chat logs

Technologies Used

React

FastAPI

Python

Firebase Realtime Database

Embedding-based retrieval

REST APIs

How to Run the Project
Backend
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Frontend
cd frontend
npm install
npm run dev


Open your browser and visit:
http://localhost:5173

Environment Variables

Create a .env file in the backend folder and .env.local in the frontend folder.
These files are intentionally excluded from GitHub for security reasons.

Academic Use

This project was developed as part of an NLP course project and demonstrates practical implementation of information retrieval and natural language processing concepts.

Author:

Sultan Mehmood
