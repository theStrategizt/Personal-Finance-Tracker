import React from "react";

const CategoryModal = ({
  show,
  onClose,
  newCategory,
  setNewCategory,
  categories,
  addCategory,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-6 space-y-4">
        <h2 className="text-lg font-bold mb-2">Manage Categories</h2>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="border rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button
            onClick={addCategory}
            className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>

        <ul className="mt-3 space-y-1 max-h-40 overflow-y-auto text-sm">
          {categories.map((c, i) => (
            <li key={i} className="border-b py-1 text-gray-700">
              {c}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="w-full bg-gray-200 rounded-md py-2 mt-4 hover:bg-gray-300 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
