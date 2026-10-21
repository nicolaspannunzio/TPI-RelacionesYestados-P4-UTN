import type { Categoria } from "../types/categoria";

interface CategoriaCardProps {
  categoria: Categoria;
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

export const CategoriaCard = ({
  categoria,
  onEdit,
  onDelete,
}: CategoriaCardProps) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
      <td className="py-4 px-4 text-sm text-gray-400">{categoria.id}</td>
      <td className="py-4 px-4 text-sm font-semibold text-gray-800">
        {categoria.nombre}
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">
        {categoria.descripcion}
      </td>
      <td className="py-4 px-4 text-sm text-right space-x-2">
        <button
          type="button"
          onClick={() => onEdit(categoria)}
          className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(categoria.id)}
          className="px-3 py-1 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-md transition"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};