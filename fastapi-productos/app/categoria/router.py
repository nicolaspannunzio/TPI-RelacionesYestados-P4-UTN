from typing import List
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from app.core.database import get_session
from app.categoria.schema import CategoriaCreate, CategoriaResponse, CategoriaUpdate
from app.categoria import service

router = APIRouter()

@router.get("/", response_model=List[CategoriaResponse])
def listar_categorias(session: Session = Depends(get_session)):
    return service.get_all_categorias(session)

@router.get("/{categoria_id}", response_model=CategoriaResponse)
def obtener_categoria(categoria_id: int, session: Session = Depends(get_session)):
    return service.get_categoria_by_id(categoria_id, session)

@router.post("/", response_model=CategoriaResponse, status_code=status.HTTP_201_CREATED)
def crear_categoria(
    categoria_in: CategoriaCreate, session: Session = Depends(get_session)
):
    return service.create_categoria(categoria_in, session)

@router.put("/{categoria_id}", response_model=CategoriaResponse)
def actualizar_categoria(
    categoria_id: int,
    categoria_in: CategoriaUpdate,
    session: Session = Depends(get_session),
):
    return service.update_categoria(categoria_id, categoria_in, session)

@router.delete("/{categoria_id}")
def eliminar_categoria(categoria_id: int, session: Session = Depends(get_session)):
    return service.delete_categoria(categoria_id, session)