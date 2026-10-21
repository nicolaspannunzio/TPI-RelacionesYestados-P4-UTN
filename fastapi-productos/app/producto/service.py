from typing import List
from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.producto.model import Producto, ProductoCategoria
from app.producto.schema import ProductoCreate, ProductoUpdate
from app.categoria.model import Categoria

def get_all_productos(session: Session) -> List[Producto]:
    return session.exec(select(Producto)).all()

def get_producto_by_id(producto_id: int, session: Session) -> Producto:
    producto = session.get(Producto, producto_id)
    if not producto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Producto con id {producto_id} no encontrado",
        )
    return producto

def create_producto(producto_in: ProductoCreate, session: Session) -> Producto:
    db_producto = Producto(
        nombre=producto_in.nombre,
        descripcion=producto_in.descripcion,
        precio_base=producto_in.precio_base,
        disponible=producto_in.disponible,
    )
    if producto_in.categoria_ids:
        categorias = session.exec(
            select(Categoria).where(Categoria.id.in_(producto_in.categoria_ids))
        ).all()
        db_producto.categorias = categorias

    session.add(db_producto)
    session.commit()
    session.refresh(db_producto)
    return db_producto

def update_producto(
    producto_id: int, producto_in: ProductoUpdate, session: Session
) -> Producto:
    producto = get_producto_by_id(producto_id, session)
    update_data = producto_in.model_dump(exclude_unset=True)

    if "categoria_ids" in update_data:
        cat_ids = update_data.pop("categoria_ids")
        if cat_ids is not None:
            categorias = session.exec(
                select(Categoria).where(Categoria.id.in_(cat_ids))
            ).all()
            producto.categorias = categorias

    for key, value in update_data.items():
        setattr(producto, key, value)

    session.add(producto)
    session.commit()
    session.refresh(producto)
    return producto

def delete_producto(producto_id: int, session: Session) -> dict:
    producto = get_producto_by_id(producto_id, session)
    session.delete(producto)
    session.commit()
    return {"message": f"Producto {producto_id} eliminado exitosamente"}