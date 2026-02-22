import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar
      <nav className="flex justify-between items-center px-10 py-6 border-b border-green-900">
        <h1 className="text-2xl font-bold text-green-500">
          Expense Tracker
        </h1>

        <Link to="/">
          <button className="border border-green-500/80 hover:bg-green-400/30 hover:text-white px-5 py-2 rounded-lg text-green-400/60  text-center">
          About
          </button>
        </Link>
      </nav> */}

      {/* Hero*/}
      <div className="max-w-6xl mx-auto px-10 py-50">

        <div className="text-center">
          <h2 className="text-6xl font-bold mb-6">
            Track Your Expenses <br />
            <span className="text-green-500 ">Smartly & Easily</span>
          </h2>

          <p className="text-gray-400 text-md mb-8 justify">
            Manage your income and expenses in one place.<br/>
            Stay in control of your financial life with a<br/>
            clean and powerful expense tracking dashboard.
          </p>

          <Link to="/dashboard">
            <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl text-black font-semibold text-lg transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Features*/}
      <div className="bg-[#081613] py-20 border-t border-green-900 mt-20">
        <div className="max-w-6xl mx-auto px-10 text-center">

          <h2 className="text-3xl font-bold mb-12 text-green-400">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-black p-8 rounded-2xl border border-green-900">
              <h3 className="text-xl font-semibold mb-3">
                Add Transactions
              </h3>
              <p className="text-gray-400">
                Quickly add income or expense entries with date tracking.
              </p>
            </div>

            <div className="bg-black p-8 rounded-2xl border border-green-900">
              <h3 className="text-xl font-semibold mb-3">
                Edit & Delete
              </h3>
              <p className="text-gray-400">
                Modify or remove transactions anytime.
              </p>
            </div>

            <div className="bg-black p-8 rounded-2xl border border-green-900">
              <h3 className="text-xl font-semibold mb-3">
                Smart Summary
              </h3>
              <p className="text-gray-400">
                View total balance, income and expenses instantly.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/*Footer*/}
      <footer className="text-center py-6 border-t border-green-900 text-gray-500">
        © 2026 Expense Tracker | Designed & Developed by Ameya | Powered by React & Redux
      </footer>

    </div>
  );
}

export default LandingPage;