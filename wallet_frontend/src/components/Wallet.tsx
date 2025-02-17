import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";

type User = {
  id: number;
  username: string;
  email: string;
};

type Wallet = {
  id: number;
  amount: number;
  userId: number;
};

const Wallet = () => {
  const { id } = useParams<{ id?: string }>();
  const userId = id ? parseInt(id) : null;

  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // Fetch user details
    fetch(`http://localhost:5143/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));

    // Fetch wallet details
    fetch(`http://localhost:5143/api/wallet/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setWallet(data))
      .catch((err) => console.error("Error fetching wallet:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex min-h-screen">
      <SideBar id={id || ""} />
      <div className="pt-24 w-full px-4">
        <h2 className="text-2xl font-semibold">Wallet Details</h2>
        {user && (
          <div className="mt-4">
            <p>
              <strong>User:</strong> {user.username} ({user.email})
            </p>
          </div>
        )}
        {wallet ? (
          <div className="mt-2">
            <p>
              <strong>Wallet Amount:</strong> ${wallet.amount}
            </p>
          </div>
        ) : (
          <p>No wallet found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default Wallet;
