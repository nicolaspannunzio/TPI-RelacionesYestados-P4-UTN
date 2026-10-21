import type { Categoria } from "../types/categoria";
import { CategoriaCard } from "./CategoriaCard";

interface CategoriaListProps {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

export const CategoriaList = ({
  categorias,
  onEdit,
  onDelete,
}: CategoriaListProps) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
              <th className="py-3 px-4 font-semibold">Número</th>
              <th className="py-3 px-4 font-semibold">Nombre</th>
              <th className="py-3 px-4 font-semibold">Descripción</th>
              <th className="py-3 px-4 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-gray-400">
                  No hay categorías registradas. ¡Añadí la primera!
                </td>
              </tr>
            ) : (
              categorias.map((cat) => (
                <CategoriaCard
                  key={cat.id}
                  categoria={cat}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};