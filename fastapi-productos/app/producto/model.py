from typing import TYPE_CHECKING, List, Optional
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.categoria.model import Categoria

class ProductoCategoria(SQLModel, table=True):
    __tablename__ = "producto_categoria"

    producto_id: int = Field(foreign_key="productos.id", primary_key=True)
    categoria_id: int = Field(foreign_key="categorias.id", primary_key=True)

class ProductoBase(SQLModel):
    nombre: str = Field(index=True, nullable=False)
    descripcion: str = Field(default="", nullable=False)
    precio_base: str = Field(nullable=False)
    disponible: bool = Field(default=True, nullable=False)

class Producto(ProductoBase, table=True):
    __tablename__ = "productos"

    id: Optional[int] = Field(default=None, primary_key=True)

    categorias: List["Categoria"] = Relationship(
        back_populates="productos",
        link_model=ProductoCategoria,
    )