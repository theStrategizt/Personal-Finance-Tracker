// tests/financeUtils.test.js
import { describe, it, expect } from "vitest";
import {
  addTransaction,
  getTotals,
  filterTransactions,
} from "../src/utils/financeUtils";

describe("financeUtils", () => {
  const baseTx = [
    {
      id: "1",
      type: "income",
      amount: 100,
      category: "Salary",
      date: "2025-01-01",
    },
    {
      id: "2",
      type: "expense",
      amount: 30,
      category: "Food",
      date: "2025-01-02",
    },
  ];

  it("adds a new transaction", () => {
    const newTx = {
      type: "expense",
      amount: 20,
      category: "Transport",
      date: "2025-01-03",
    };
    const res = addTransaction(baseTx, newTx);
    expect(res.length).toBe(3);
    expect(
      res.some((t) => t.category === "Transport" && Number(t.amount) === 20)
    ).toBeTruthy();
  });

  it("edits a transaction when editingId provided", () => {
    const updated = {
      type: "income",
      amount: 200,
      category: "Salary",
      date: "2025-01-01",
    };
    const res = addTransaction(baseTx, updated, "1");
    expect(res.find((t) => t.id === "1").amount).toBe(200);
  });

  it("calculates totals correctly", () => {
    const totals = getTotals(baseTx);
    expect(totals.income).toBe(100);
    expect(totals.expense).toBe(30);
    expect(totals.balance).toBe(70);
  });

  it("filters transactions by type and category and sorts", () => {
    const txs = [
      ...baseTx,
      {
        id: "3",
        type: "expense",
        amount: 10,
        category: "Food",
        date: "2025-01-03",
      },
    ];
    const filtered = filterTransactions(txs, {
      type: "expense",
      category: "Food",
      sort: "newest",
    });
    expect(filtered.length).toBe(2);
    expect(filtered[0].date >= filtered[1].date).toBeTruthy();
  });
});
