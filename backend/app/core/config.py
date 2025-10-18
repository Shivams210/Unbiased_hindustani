from pydantic.v1 import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Unbiased Hindustani"
    PROJECT_VERSION: str = "1.0.0"
    FRONTEND_URL: str = "http://localhost:3000"

settings = Settings()