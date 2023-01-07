import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import TransactionTable from "../../components/TransactionTable";
import { getApprovedTransactionService } from "../../service/transactionService";

const Completed = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    setLoading(true);
    try {
      const { data } = await getApprovedTransactionService();
      if (data) setTransaction(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : transaction.length ? (
        <TransactionTable
          delayed={false}
          completed={true}
          path={"/admin/ongoing/detail"}
          transaction={transaction}
        />
      ) : (
        <p className="text-[brown] text-2xl font-mono">
          There is no completed transaction yet
        </p>
      )}
    </div>
  );
};

export default Completed;
