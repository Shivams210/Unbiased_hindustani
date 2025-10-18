from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Unbiased Hindustani API"}

@app.get("/api/news")
async def get_news():
    return [
        {
            "id": 1,
            "title": "Sample News",
            "summaryPoints": ["Point 1", "Point 2", "Point 3"],
            "youtubeUrl": "https://www.youtube.com/watch?v=sample"
        }
    ]