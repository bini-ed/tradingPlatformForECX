import React, { useEffect, useState } from "react";
import CustomAppTable from "../../../components/CustomAppTable";
import TransactionTable from "../../components/TransactionTable";
import { getAllTransactionService } from "../../service/transactionService";

const OnGoing = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(transaction);
  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    setLoading(true);
    try {
      const { data } = await getAllTransactionService();
      if (data) setTransaction(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <TransactionTable transaction={transaction} />
    </div>
  );
};

export default OnGoing;
