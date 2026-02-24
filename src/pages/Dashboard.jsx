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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-10 py-10">

        {/* Header */}
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Expense Tracker</h1>

          <Link to="/">
            <button className="border border-gray-400 px-3 py-1 rounded-md flex items-center gap-2 hover:bg-gray-700">
              <IoChevronBackOutline size={20} />
              Back
            </button>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-700 rounded-2xl p-6">
            <p>Total Balance</p>
            <h2 className="text-3xl font-bold mt-2 break-words">
              ₹{balance.toLocaleString("en-IN")}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-900/60 bg-gradient from-[#0f2e24] to-[#0b1f19] p-6">
            <p>Total Income</p>
            <h2 className="text-3xl text-green-400 font-bold mt-2 break-words">
              ₹{income.toLocaleString("en-IN")}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-900/60 bg-gradient from-[#0f2e24] to-[#0b1f19] p-6">
            <p>Total Expenses</p>
            <h2 className="text-3xl text-red-400 font-bold mt-2 break-words">
              ₹{expenses.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="bg-green-950/50 rounded-xl border border-green-900">

          <div className="flex justify-between items-center p-6 border-b border-green-900">
            <h2 className="text-xl font-semibold">
              Recent Transactions
            </h2>

            <Link to="/add">
              <button className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">
                + Add Transaction
              </button>
            </Link>
          </div>

          {items.length === 0 ? (
            <p className="p-6 text-center text-gray-400">
              No transactions yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-gray-400 border-b border-green-900">
                  <tr>
                    <th className="p-4">Description</th>
                    <th>Type</th>
                    <th className="text-right pr-6">Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-green-900 hover:bg-green-900/30"
                    >
                      <td className="p-4">{item.description}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            item.type === "income"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>

                      <td
                        className={`text-right pr-6 font-semibold ${
                          item.type === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        ₹{item.amount}
                      </td>

                      <td>
                        {item.date
                          ? new Date(item.date).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      <td>
                      <Link to={`/edit/${item.id}`} state={item}>
                      <button
                      className="text-yellow-400 hover:text-yellow-200 mr-3" >
                      Edit
                      </button>
                      </Link>
                      </td>

                      <td>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
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