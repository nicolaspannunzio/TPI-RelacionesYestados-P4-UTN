import React, { useState, useEffect } from "react";
import type { Categoria } from "../types/categoria";

interface CategoriaModalProps {
  isOpen: boolean;
  categoriaToEdit: Categoria | null;
  onClose: () => void;
  onSubmit: (categoria: { nombre: string; descripcion: string }) => void;
}

export const CategoriaModal = ({
  isOpen,
  categoriaToEdit,
  onClose,
  onSubmit,
}: CategoriaModalProps) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (categoriaToEdit) {
      setNombre(categoriaToEdit.nombre);
      setDescripcion(categoriaToEdit.descripcion);
    } else {
      setNombre("");
      setDescripcion("");
    }
  }, [categoriaToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onSubmit({ nombre: nombre.trim(), descripcion: descripcion.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {categoriaToEdit ? "Editar Categoría" : "Añadir Categoría"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Nombre de la categoría
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Pizzas"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Descripción
            </label>
            <textarea
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Pizzas artesanales con masa madre"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};