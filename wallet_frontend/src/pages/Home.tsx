import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import Auth from "../hooks/Auth";

type User = {
  id: number;
  username: string;
  email: string;
};

const Home = () => {
  const { id } = useParams<{ id?: string }>();
  const userId = id ? parseInt(id) : null;

  // Auth middleware
  Auth();

  const [users, setUsers] = useState<User[]>([]);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Fetch all users
    fetch("http://localhost:5143/api/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !receiverId || amount <= 0) {
      setMessage("Invalid transaction details.");
      return;
    }

    const response = await fetch("http://localhost:5143/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: userId,
        receiverId,
        amount,
      }),
    });

    const data = await response.json();
    setMessage(data.message || "Transaction failed.");
  };

  return (
    <div className="flex min-h-screen">
      <SideBar id={id || ""} />
      <div className="w-full pt-24 px-4 bg-gray-100">
        <div className="py-4 grid">
          <h1 className="font-bold text-2xl">Dashboard</h1>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Make a Transaction</h2>

          <form onSubmit={handleTransfer} className="space-y-4">
            <div>
              <label className="block font-medium">Select Receiver</label>
              <select
                value={receiverId || ""}
                onChange={(e) => setReceiverId(parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select User --</option>
                {users
                  .filter((user) => user.id !== userId) // Exclude the sender from the list
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} ({user.email})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="w-full p-2 border rounded"
                min="1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#82eefd] text-black py-2 rounded hover:bg-[#63c1ce]"
            >
              Send Money
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center font-semibold">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
