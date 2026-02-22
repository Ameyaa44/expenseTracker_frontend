import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editTransaction } from "../Redux/Slice/transactionSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function EditTransaction() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transaction = location.state; 

  const [form, setForm] = useState({
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    date: transaction.date, 
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  dispatch(
    editTransaction({
      ...form,
      id: transaction.id,
      amount: Number(form.amount),
    })
  );

  await Swal.fire({
    title: "Transaction Updated!",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    background: "#0f2e24",
    color: "#ffffff",
  });

  navigate("/dashboard");
};

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-[#0f2e24] p-10 rounded-2xl  w-full max-w-[450px] border border-green-900">

        <h2 className="text-2xl font-bold mb-6">
          Edit Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full bg-black border border-green-800 rounded-lg px-4 py-2"
            required
          />


          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="w-full bg-black border border-green-800 rounded-lg px-4 py-2"
            required
          />

            {/* Date */}
            <input
            type="date"
            value={form.date || ""}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="w-full bg-black border border-green-800 rounded-lg px-4 py-2 text-white 
                      appearance-none 
                      [&::-webkit-calendar-picker-indicator]:invert"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="w-full bg-black border border-green-800 rounded-lg px-4 py-2"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <div className="flex justify-between mt-6">
            
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg"
            >
              Update
            </button>

            <Link to={'/dashboard'}>
            <button
              type="button"
              
              className="px-4 py-2 border border-white hover:bg-gray-300/10 rounded-lg"
            >
              Cancel
            </button>
            </Link>
            
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditTransaction;