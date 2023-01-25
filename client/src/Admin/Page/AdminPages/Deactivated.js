import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { getAuctionRoomUsingProductIdService } from "../../../service/auctionService";
import DeactivatedTable from "../../components/DeactivatedTable";
import TransactionTable from "../../components/TransactionTable";
import { getDelayedTransactionService } from "../../service/transactionService";

const Deactivated = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDelayedTransaction();
  }, []);

  const getDelayedTransaction = async () => {
    setLoading(true);
    try {
      const { data } = await getDelayedTransactionService();
      if (data) {
        let array = [];
        data.map(async (items) => {
          const { data } = await getAuctionRoomUsingProductIdService(items._id);
          if (data) array.push(data);
          setTransaction(array);
        });
      }
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
        <DeactivatedTable
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
