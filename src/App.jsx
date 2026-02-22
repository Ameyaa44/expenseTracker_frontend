import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import TransactionList from "./components/TransactionList";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import LandingPage from "./pages/Landing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddTransaction />} />
      <Route path="/edit/:id" element={<EditTransaction />} />
      {/* <Route path="/translist" element={<TransactionList />} /> */}
    </Routes>
  );
}

export default App;