import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";

type Transaction = {
  id: number;
  transactionAmount: number;
  senderId: string;
  recieverId: string;
  walletId: string;
};

const WalletTransaction = () => {
  const { id } = useParams<{ id?: string }>();
  const userId = id ? parseInt(id) : null;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [receiverNames, setReceiverNames] = useState<Record<string, string>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5143/wallet-transactions/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No transactions found.");
        }
        return res.json();
      })
      .then(async (data: Transaction[]) => {
        setTransactions(data);

        // Fetch receiver names for each transaction
        const namesMap: Record<string, string> = {};
        await Promise.all(
          data.map(async (tx) => {
            if (!namesMap[tx.recieverId]) {
              try {
                const res = await fetch(
                  `http://localhost:5143/api/user/${tx.recieverId}`
                );
                if (res.ok) {
                  const user = await res.json();
                  namesMap[tx.recieverId] = user.username; // Assuming API returns user.name
                } else {
                  namesMap[tx.recieverId] = "Unknown";
                }
              } catch {
                namesMap[tx.recieverId] = "Unknown";
              }
            }
          })
        );

        setReceiverNames(namesMap);
      })
      .catch((err) => console.error("Error fetching transactions:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="flex min-h-screen">
      <SideBar id={id || ""} />
      <div className="pt-24 w-full px-4">
        <h2 className="text-2xl font-semibold">Wallet Transactions</h2>

        {loading ? (
          <p className="mt-4">Loading transactions...</p>
        ) : transactions.length > 0 ? (
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Amount</th>
                <th className="border p-2">Receiver</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {transactions.map((tx) => (
                <tr key={tx.id} className="border">
                  <td className="border p-2">ZMW{tx.transactionAmount}</td>
                  <td className="border p-2">
                    {receiverNames[tx.recieverId] || "Loading..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4">No transactions found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default WalletTransaction;
