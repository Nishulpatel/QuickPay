import { useSearchParams } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKRND_URL } from "../config";
import { Button } from "../components/Button";


export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleTransfer = async () => {
    setStatus("Sending...");
    try {
      await axios.post(
        `${BACKRND_URL}/api/v1/account/transfer`,
        { to: id, amount },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      setStatus("✅ Transfer successful!");
    } catch (error) {
      setStatus("❌ Transfer failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-slate-200 to-slate-400 p-4">
      <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-96 p-6 space-y-6 my-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800">Send Money</h2>

        <div className="flex items-center space-x-4 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-medium">
            {name ? name[0].toUpperCase() : "?"}
          </div>
          <h3 className="text-xl font-semibold text-slate-800">{name || "User"}</h3>
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-slate-600"
            htmlFor="amount"
          >
            Amount (in Rs)
          </label>
          <input
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            id="amount"
            placeholder="Enter amount"
            className="w-full h-10 rounded-md border border-slate-300 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={handleTransfer}
          className="w-full h-10 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          Initiate Transfer
        </button>

        <Button
          label="← Back to Dashboard"
          onClick={() => navigate("/dashboard")}
        />

        {status && (
          <p className="text-center text-sm mt-2 font-medium text-slate-600">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};
