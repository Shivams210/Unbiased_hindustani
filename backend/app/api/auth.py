from fastapi import APIRouter

router = APIRouter()

@router.get("/token")
async def get_token():
    return {"access_token": "demo_token", "token_type": "bearer"}