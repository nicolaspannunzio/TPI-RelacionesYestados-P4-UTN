from typing import List, Optional
from pydantic import BaseModel
from app.categoria.schema import CategoriaResponse

class ProductoCreate(BaseModel):
    nombre: str
    descripcion: str
    precio_base: str
    disponible: bool = True
    categoria_ids: List[int] = []

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio_base: Optional[str] = None
    disponible: Optional[bool] = None
    categoria_ids: Optional[List[int]] = None

class ProductoResponse(BaseModel):
    id: int
    nombre: str
    descripcion: str
    precio_base: str
    disponible: bool
    categorias: List[CategoriaResponse] = []

    class Config:
        from_attributes = True