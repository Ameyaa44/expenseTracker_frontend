// import { useSelector, useDispatch } from "react-redux";
// import { deleteTransaction, fetchTransactions } from "../Redux/Slice/transactionSlice";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function TransactionList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { items } = useSelector((state) => state.transactions);

//   useEffect(() => {
//     dispatch(fetchTransactions());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h2 className="text-xl mb-4">Transactions</h2>

//       {items.map((item) => (
//         <div
//           key={item.id}
//           className="flex justify-between bg-gray-800 p-4 rounded mb-3"
//         >
//           <p>{item.description}</p>
//           <div className="flex gap-4">
//             <span>${item.amount}</span>

//             <button
//               onClick={() => navigate(`/edittrans/${item.id}`)}
//               className="bg-yellow-500 px-3 py-1 rounded"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() =>
//                 dispatch(deleteTransaction(item.id))
//               }
//               className="bg-red-600 px-3 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TransactionList;