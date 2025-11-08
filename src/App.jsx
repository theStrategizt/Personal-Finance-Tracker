import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Headers";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import Charts from "./components/Charts";
import Filters from "./components/Filters";
import TransactionList from "./components/TransactionList";
import CategoryModal from "./components/CategoryModal";

const FinanceTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState({
    income: ["Salary", "Freelance", "Investment"],
    expense: ["Food", "Transport", "Rent", "Entertainment"],
  });
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({
    type: "all",
    category: "",
    sort: "newest",
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Load and save transactions & categories from localStorage
  useEffect(() => {
    const tx = JSON.parse(localStorage.getItem("transactions")) || [];
    const cats = JSON.parse(localStorage.getItem("categories")) || categories;
    setTransactions(tx);
    setCategories(cats);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [transactions, categories]);

  // Submit transaction
  const handleSubmit = () => {
    if (!formData.amount || !formData.category || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    const tx = editingId
      ? transactions.map((t) =>
          t.id === editingId ? { ...formData, id: editingId } : t
        )
      : [...transactions, { ...formData, id: Date.now().toString() }];

    setTransactions(tx);
    setFormData({
      type: "expense",
      category: "",
      amount: "",
      notes: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const tx = transactions.find((t) => t.id === id);
    setFormData(tx);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;
    setCategories({
      ...categories,
      [formData.type]: [...categories[formData.type], newCategory.trim()],
    });
    setNewCategory("");
  };

  // Totals
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions]
  );
  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions]
  );
  const balance = totalIncome - totalExpense;

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => filters.type === "all" || t.type === filters.type)
      .filter((t) => !filters.category || t.category === filters.category)
      .sort((a, b) =>
        filters.sort === "newest"
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date)
      );
  }, [transactions, filters]);

  // Chart data
  const categoryData = useMemo(() => {
    const data = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        data[t.category] = (data[t.category] || 0) + Number(t.amount);
      });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const data = {};
    transactions.forEach((t) => {
      const month = t.date.substring(0, 7);
      if (!data[month]) data[month] = { month, income: 0, expense: 0 };
      data[month][t.type] += Number(t.amount);
    });
    return Object.values(data).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  // Export CSV
  const exportCSV = () => {
    const csv = ["Type,Category,Amount,Notes,Date"];
    transactions.forEach((t) =>
      csv.push(`${t.type},${t.category},${t.amount},${t.notes},${t.date}`)
    );
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finance_data.csv";
    a.click();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Header
        onAddTransaction={() => setEditingId(null)}
        onExport={exportCSV}
        onManageCategories={() => setShowCategoryModal(true)}
      />
      <SummaryCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />
      <TransactionForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        setShowForm={() => setEditingId(null)}
        editingId={editingId}
        categories={categories}
      />
      <Charts categoryData={categoryData} monthlyData={monthlyData} />
      <Filters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />
      <TransactionList
        filteredTransactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CategoryModal
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        categories={categories}
        addCategory={addCategory}
      />
    </div>
  );
};

export default FinanceTracker;
