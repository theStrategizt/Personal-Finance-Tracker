import React from "react";

const Filters = ({ filters, setFilters, categories }) => {
  // Always ensure categories is an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
        >
          <option value="">All Categories</option>
          {safeCategories.length > 0 ? (
            safeCategories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))
          ) : (
            <option disabled>No categories available</option>
          )}
        </select>

        {/* Sort Filter */}
        <select
          value={filters.sort}
          onChange={(e) => handleChange("sort", e.target.value)}
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
