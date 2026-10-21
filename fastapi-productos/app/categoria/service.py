from typing import List, Optional
from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.categoria.model import Categoria
from app.categoria.schema import CategoriaCreate, CategoriaUpdate

def get_all_categorias(session: Session) -> List[Categoria]:
    statement = select(Categoria)
    return session.exec(statement).all()

def get_categoria_by_id(categoria_id: int, session: Session) -> Categoria:
    categoria = session.get(Categoria, categoria_id)
    if not categoria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Categoría con id {categoria_id} no encontrada",
        )
    return categoria

def create_categoria(categoria_in: CategoriaCreate, session: Session) -> Categoria:
    statement = select(Categoria).where(Categoria.nombre == categoria_in.nombre)
    existente = session.exec(statement).first()
    if existente:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"La categoría '{categoria_in.nombre}' ya existe",
        )
    db_categoria = Categoria.model_validate(categoria_in)
    session.add(db_categoria)
    session.commit()
    session.refresh(db_categoria)
    return db_categoria

def update_categoria(
    categoria_id: int, categoria_in: CategoriaUpdate, session: Session
) -> Categoria:
    categoria = get_categoria_by_id(categoria_id, session)
    update_data = categoria_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(categoria, key, value)
    session.add(categoria)
    session.commit()
    session.refresh(categoria)
    return categoria

def delete_categoria(categoria_id: int, session: Session) -> dict:
    categoria = session.get(Categoria, categoria_id)
    if not categoria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Categoría con id {categoria_id} no encontrada",
        )

    # 1. Buscar y remover los registros asociados en producto_categoria
    statement = select(ProductoCategoria).where(ProductoCategoria.categoria_id == categoria_id)
    vinculos = session.exec(statement).all()
    for item in vinculos:
        session.delete(item)

    # 2. Borrar la entidad categoría
    session.delete(categoria)
    session.commit()
    return {"message": f"Categoría {categoria_id} eliminada exitosamente"}