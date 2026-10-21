from typing import List
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from app.core.database import get_session
from app.producto.schema import ProductoCreate, ProductoResponse, ProductoUpdate
from app.producto import service

router = APIRouter()

@router.get("/", response_model=List[ProductoResponse])
def listar_productos(session: Session = Depends(get_session)):
    return service.get_all_productos(session)

@router.get("/{producto_id}", response_model=ProductoResponse)
def obtener_producto(producto_id: int, session: Session = Depends(get_session)):
    return service.get_producto_by_id(producto_id, session)

@router.post("/", response_model=ProductoResponse, status_code=status.HTTP_201_CREATED)
def crear_producto(
    producto_in: ProductoCreate, session: Session = Depends(get_session)
):
    return service.create_producto(producto_in, session)

@router.put("/{producto_id}", response_model=ProductoResponse)
def actualizar_producto(
    producto_id: int,
    producto_in: ProductoUpdate,
    session: Session = Depends(get_session),
):
    return service.update_producto(producto_id, producto_in, session)

@router.delete("/{producto_id}")
def eliminar_producto(producto_id: int, session: Session = Depends(get_session)):
    return service.delete_producto(producto_id, session)