from typing import TYPE_CHECKING, List, Optional
from sqlmodel import Field, Relationship, SQLModel
from app.producto.model import ProductoCategoria

if TYPE_CHECKING:
    from app.producto.model import Producto

class CategoriaBase(SQLModel):
    nombre: str = Field(index=True, nullable=False)
    descripcion: str = Field(default="", nullable=False)

class Categoria(CategoriaBase, table=True):
    __tablename__ = "categorias"

    id: Optional[int] = Field(default=None, primary_key=True)

    productos: List["Producto"] = Relationship(
        back_populates="categorias",
        link_model=ProductoCategoria,
    )