from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "API is working"}

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

@app.post("/api/news/generate")
async def generate_news(url: dict):
    return {
        "title": "Generated News",
        "summaryPoints": ["Summary point 1", "Summary point 2", "Summary point 3"],
        "youtubeUrl": url.get("url", "")
    }