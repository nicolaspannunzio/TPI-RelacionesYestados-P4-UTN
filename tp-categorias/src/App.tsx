import { useState, useEffect } from "react";
import type { Categoria } from "./types/categoria";
import { Navbar } from "./components/Navbar";
import { CategoriaList } from "./components/CategoriaList";
import { CategoriaModal } from "./components/CategoriaModal";

const API_URL = "http://localhost:8000/categorias";

export function App() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);

  const fetchCategorias = async () => {
    try {
      const res = await fetch(`${API_URL}/`);
      if (!res.ok) throw new Error("Error al obtener categorías");
      const data: Categoria[] = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error en fetchCategorias:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleCreate = async (data: { nombre: string; descripcion: string }) => {
    try {
      const res = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error del backend:", errorData);
        alert(`Error al guardar: ${JSON.stringify(errorData.detail || errorData)}`);
        return;
      }

      await fetchCategorias();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("No se pudo conectar con el backend. Verificá que FastAPI esté corriendo en el puerto 8000.");
    }
  };

  const handleUpdate = async (data: { nombre: string; descripcion: string }) => {
    if (!selectedCategoria) return;
    try {
      const res = await fetch(`${API_URL}/${selectedCategoria.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error al actualizar:", errorData);
        alert(`Error al actualizar: ${JSON.stringify(errorData.detail || errorData)}`);
        return;
      }

      await fetchCategorias();
      setIsModalOpen(false);
      setSelectedCategoria(null);
    } catch (error) {
      console.error("Error en handleUpdate:", error);
    }
  };

const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que querés eliminar esta categoría?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error al eliminar:", errorData);
        alert(`Error al eliminar: ${JSON.stringify(errorData.detail || errorData)}`);
        return;
      }

      await fetchCategorias();
    } catch (error) {
      console.error("Error en handleDelete:", error);
      alert("Hubo un error de conexión al intentar eliminar.");
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedCategoria(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: { nombre: string; descripcion: string }) => {
    if (selectedCategoria) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-4xl w-full mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Categorías</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Administración de categorías del catálogo
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <span>+</span> Añadir Categoría
          </button>
        </div>

        <CategoriaList
          categorias={categorias}
          onEdit={handleOpenEditModal}
          onDelete={handleDelete}
        />
      </main>

      <CategoriaModal
        isOpen={isModalOpen}
        categoriaToEdit={selectedCategoria}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategoria(null);
        }}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default App;