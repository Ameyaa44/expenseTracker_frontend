import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTransactions,
  deleteTransaction,
} from "../Redux/Slice/transactionSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IoChevronBackOutline } from "react-icons/io5";

function Dashboard() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-400">Loading...</p>
        </div>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-400">
        Error: {error}
      </div>
    );
  }

  //Calculations 
  const income = items
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const expenses = items
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const balance = income - expenses;

 
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#0f2e24",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteTransaction(id)).unwrap();

        Swal.fire({
          title: "Deleted!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#0f2e24",
          color: "#ffffff",
        });
      } catch (err) {
        Swal.fire("Error!", err, "error");
      }
    }
  };

return (
  <div className="min-h-screen bg-black text-white relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>

    <div className="relative max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

        <div>
          <h1 className="text-4xl font-bold">
            Expense Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Track your financial activity
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-green-900 hover:bg-green-900/20 transition">
              <IoChevronBackOutline />
              Back
            </button>
          </Link>

          <Link to="/add">
            <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-5 py-2 rounded-xl transition">
              + Add Transaction
            </button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* Balance */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-6 shadow-lg shadow-green-500/20">
          <p className="text-green-100">
            Total Balance
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ₹{balance.toLocaleString("en-IN")}
          </h2>

          <p className="mt-3 text-green-100 text-sm">
            Current available balance
          </p>
        </div>

        {/* Income */}
        <div className="backdrop-blur-lg bg-white/5 border border-green-900 rounded-3xl p-6 hover:border-green-500 transition">

          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">
              Income
            </h3>

            <span className="text-2xl">📈</span>
          </div>

          <h2 className="text-3xl text-green-400 font-bold mt-4">
            ₹{income.toLocaleString("en-IN")}
          </h2>
        </div>

        {/* Expense */}
        <div className="backdrop-blur-lg bg-white/5 border border-green-900 rounded-3xl p-6 hover:border-red-500 transition">

          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">
              Expenses
            </h3>

            <span className="text-2xl">📉</span>
          </div>

          <h2 className="text-3xl text-red-400 font-bold mt-4">
            ₹{expenses.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* Transactions Card */}
      <div className="backdrop-blur-lg bg-white/5 border border-green-900 rounded-3xl overflow-hidden">

        {/* Top */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-green-900">
          <h2 className="text-2xl font-semibold">
            Recent Transactions
          </h2>

          <span className="text-sm text-gray-400">
            {items.length} Records
          </span>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">💸</div>

            <h3 className="text-xl font-semibold mb-2">
              No Transactions Found
            </h3>

            <p className="text-gray-400">
              Start by adding your first transaction.
            </p>

            <Link to="/add">
              <button className="mt-6 bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-xl">
                Add Transaction
              </button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-green-900 text-gray-400">
                  <th className="text-left p-5">Description</th>
                  <th className="text-left">Type</th>
                  <th className="text-right">Amount</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-green-900/40 hover:bg-green-900/10 transition"
                  >
                    <td className="p-5 font-medium">
                      {item.description}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.type === "income"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>

                    <td
                      className={`text-right font-semibold ${
                        item.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      ₹{Number(item.amount).toLocaleString("en-IN")}
                    </td>

                    <td className="text-center text-gray-400">
                      {item.date
                        ? new Date(item.date).toLocaleDateString("en-IN")
                        : "-"}
                    </td>

                    <td>
                      <div className="flex justify-center gap-3">

                        <Link
                          to={`/edit/${item.id}`}
                          state={item}
                        >
                          <button className="px-4 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
                            Edit
                          </button>
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="px-4 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}
      </div>

    </div>
  </div>
);
}

export default Dashboard;