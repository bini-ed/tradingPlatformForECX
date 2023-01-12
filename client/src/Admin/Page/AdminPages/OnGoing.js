import React, { useEffect, useState } from "react";
import CustomAppTable from "../../../components/CustomAppTable";
import TransactionTable from "../../components/TransactionTable";
import { getUnApprovedTransactionService } from "../../service/transactionService";

const OnGoing = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    setLoading(true);
    try {
      const { data } = await getUnApprovedTransactionService();
      if (data) setTransaction(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {transaction.length ? (
        <TransactionTable
          delayed={false}
          path={"/admin/ongoing/detail"}
          transaction={transaction}
        />
      ) : (
        <p className="text-[brown] text-2xl font-mono">
          There is no active transaction request
        </p>
      )}
    </div>
  );
};

export default OnGoing;
