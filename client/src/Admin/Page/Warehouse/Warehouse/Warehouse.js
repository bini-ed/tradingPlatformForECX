import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomAppTable from "../../../../components/CustomAppTable";
import CustomToast from "../../../../components/CustomToast";
import Loader from "../../../../components/Loader";
import { getStorageService } from "../../../service/storageService";

const Warehouse = () => {
  const [warehouse, setWarehouse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllWarehouse();
  }, []);

  const getAllWarehouse = async () => {
    setLoading(true);
    try {
      const { data } = await getStorageService();
      if (data) setWarehouse(data);
    } catch (error) {
      CustomToast("error", error.response?.data ?? error.message);
    }
    setLoading(false);
  };

  let filteredWarehouse = warehouse?.filter((warehouse) => {
    return warehouse?.warehouseName?.match(new RegExp(filter, "i"));
  });

  return (
    <div className="flex flex-col px-20 items-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-row rounded-md  bg-slate-500  my-3 place-self-end">
            <Link
              to={"/admin/addWarehouse"}
              className="text-lg text-white font-semibold p-1"
            >
              Add Warehouse
            </Link>
          </div>
          {warehouse.length ? (
            <CustomAppTable
              column={[
                {
                  warehouseName: "Warehouse Name",
                  location: "Location",
                },
              ]}
              field={filteredWarehouse}
              count={filteredWarehouse.length}
              filter={filter}
              setFilter={setFilter}
              color="bg-slate-800"
              path={"/admin/warehouse/product"}
            />
          ) : (
            <>
              <p className="text-[red] font-mono text-lg">No warehouse found</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Warehouse;
