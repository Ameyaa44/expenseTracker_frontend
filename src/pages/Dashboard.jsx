import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions, deleteTransaction } from "../Redux/Slice/transactionSlice";
import AddTransaction from "./AddTransaction";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";



function Dashboard() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.transactions);


  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

 
  const income = items
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expenses = items
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

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
    dispatch(deleteTransaction(id));

    Swal.fire({
      title: "Deleted!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      background: "#0f2e24",
      color: "#ffffff",
    });
  }
};

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-10 py-10">

        <div className="flex justify-between">
        {/*Header*/}
        <h1 className="text-3xl font-bold mb-8">
          Expense Tracker
        </h1>

        <Link to={'/'}>
        <button className="bg-black border border-gray-300/80 rounded-md py-1 px-3 text-gray-300/80 hover:bg-gray-300/20  flex">
        <IoChevronBackOutline style={{fontSize:'25px'}} />{' '}Back</button>
        </Link>
        </div>

        {/* Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <div className="bg-green-700 rounded-2xl p-6 shadow-xl">
            <p className="uppercase text-sm">Total Balance</p>
            <h2 className="text-4xl font-bold mt-4">
              ₹{balance}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-900/60 bg-gradient from-[#0f2e24] to-[#0b1f19] p-6">
            <p className="uppercase text-sm text-gray-400">
              Total Income
            </p>
            <h2 className="text-4xl font-bold text-green-400 mt-4">
              ₹{income}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-900/60 bg-gradient from-[#0f2e24] to-[#0b1f19] p-6">
            <p className="uppercase text-sm text-gray-400">
              Total Expenses
            </p>
            <h2 className="text-4xl font-bold text-red-400 mt-4">
              ₹{expenses}
            </h2>
          </div>
        </div>

        {/*Table */}
        <div className="bg-green-950/50 rounded-xl border border-green-900">

          {/* Table Header */}
          <div className="flex justify-between items-center p-6 border-b border-green-900">
            <h2 className="text-xl font-semibold">
              Recent Transactions
            </h2>


            <Link to={'/add'}>
            <button
              
              className=" border border-green-500/70 bg-green-500/30 text-white hover:bg-green-600 px-4 py-2 rounded-lg  font-semibold transition"
            >
              + Add Transaction
            </button>
            </Link>
          </div>

        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm uppercase border-b border-green-900">
              <tr>
                <th className="p-4">Description</th>
                <th>Type</th>
                <th className="text-right pr-6">Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-green-900 hover:bg-green-900/30 transition"
                >
                  <td className="p-4 font-medium">
                    {item.description}
                  </td>


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

              {/* Date */}
              <td className="pr-6">
                {new Date(item.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
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
                    className="text-red-400 hover:text-red-300">
                    Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          {items.length === 0 &&  (
            <p className="p-6 text-gray-500 text-center">
              No transactions yet
            </p>
          )}
        </div>


      </div>
    </div>
  );
}

export default Dashboard;