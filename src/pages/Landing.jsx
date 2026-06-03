import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 text-sm">
              Smart Expense Management
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
              Control Your
              <span className="block text-green-500">
                Financial Future
              </span>
            </h1>

            <p className="text-gray-400 mt-6 text-lg leading-relaxed">
              Track income, monitor expenses, and visualize your spending
              habits with a modern and intuitive dashboard designed for
              smarter financial decisions.
            </p>

            <div className="flex gap-4 mt-8">
              <Link to="/dashboard">
                <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-lg shadow-green-500/20">
                  Get Started
                </button>
              </Link>

              <button className="border border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-3 rounded-xl transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-lg border border-green-900 p-8 rounded-3xl w-full max-w-md shadow-2xl">

              <h3 className="text-2xl font-semibold mb-6 text-green-400">
                Financial Overview
              </h3>

              <div className="space-y-5">
                <div className="bg-black/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Total Balance</p>
                  <h2 className="text-3xl font-bold text-green-500">
                    ₹45,000
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Income</p>
                    <h3 className="text-xl font-bold text-green-400">
                      ₹60,000
                    </h3>
                  </div>

                  <div className="bg-black/50 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Expense</p>
                    <h3 className="text-xl font-bold text-red-400">
                      ₹15,000
                    </h3>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-[#081613] p-6 rounded-2xl text-center border border-green-900">
            <h3 className="text-3xl font-bold text-green-400">10K+</h3>
            <p className="text-gray-400">Transactions</p>
          </div>

          <div className="bg-[#081613] p-6 rounded-2xl text-center border border-green-900">
            <h3 className="text-3xl font-bold text-green-400">5K+</h3>
            <p className="text-gray-400">Users</p>
          </div>

          <div className="bg-[#081613] p-6 rounded-2xl text-center border border-green-900">
            <h3 className="text-3xl font-bold text-green-400">99%</h3>
            <p className="text-gray-400">Accuracy</p>
          </div>

          <div className="bg-[#081613] p-6 rounded-2xl text-center border border-green-900">
            <h3 className="text-3xl font-bold text-green-400">24/7</h3>
            <p className="text-gray-400">Access</p>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#081613] border-t border-green-900">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-black/40 backdrop-blur-md border border-green-900 p-8 rounded-3xl hover:-translate-y-2 transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">
                Track Expenses
              </h3>
              <p className="text-gray-400">
                Add and organize all your daily transactions effortlessly.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-green-900 p-8 rounded-3xl hover:-translate-y-2 transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">
                Visual Analytics
              </h3>
              <p className="text-gray-400">
                Understand spending patterns with clear summaries.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-green-900 p-8 rounded-3xl hover:-translate-y-2 transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">
                Fast Management
              </h3>
              <p className="text-gray-400">
                Edit, delete, and manage records in real time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Start Managing Your Money Today
        </h2>

        <p className="text-gray-400 mt-4 mb-8">
          Join thousands of users taking control of their finances.
        </p>

        <Link to="/dashboard">
          <button className="bg-green-500 hover:bg-green-600 text-black font-bold px-10 py-4 rounded-xl text-lg transition shadow-lg shadow-green-500/20">
            Launch Dashboard
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-900 py-8 text-center text-gray-500">
        <p>© 2026 Expense Tracker</p>
        <p className="mt-2">
          Designed & Developed by <span className="text-green-400">Ameya</span>
        </p>
      </footer>

    </div>
  );
}

export default LandingPage;