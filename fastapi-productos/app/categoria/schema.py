from typing import Optional
from pydantic import BaseModel

class CategoriaCreate(BaseModel):
    nombre: str
    descripcion: str

class CategoriaUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None

class CategoriaResponse(BaseModel):
    id: int
    nombre: str
    descripcion: str

    class Config:
        from_attributes = True