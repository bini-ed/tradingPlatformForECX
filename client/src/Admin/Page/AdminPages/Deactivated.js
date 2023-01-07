import React, { useEffect, useState } from "react";
import TransactionTable from "../../components/TransactionTable";
import { getDelayedTransactionService } from "../../service/transactionService";

const Deactivated = () => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getDelayedTransaction();
  }, []);

  const getDelayedTransaction = async () => {
    try {
      const { data } = await getDelayedTransactionService();
      if (data) setTransaction(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {transaction.length ? (
        <TransactionTable
          delayed={true}
          path={"/admin/deactivated/detail"}
          transaction={transaction}
        />
      ) : (
        <p className="text-[brown] text-2xl font-mono">
          There is no deactivated transaction
        </p>
      )}
    </div>
  );
};

export default Deactivated;
