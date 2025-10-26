// react custom hook file
import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_URL = "https://rn-wallet-backend-1f5p.onrender.com";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // useCallback is used for performance reasons,it will memoize the funcion
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/transactions/summary/${userId}`
      );
      const data = response.json();
      setSummary(data);
    } catch (error) {
      console.log("Error fetching summary:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    try {
      await Promise.all([fetchTransactions(), fetchSummary]);
    } catch (error) {
      console.log("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransactions = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transaction");
      // Refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted Successfully");
    } catch (error) {
      console.log("Error deleting transaction:", error);
      Alert.alert("Error", error.messages);
    }
  };
  return { transactions, summary, isLoading, loadData, deleteTransactions };
};
