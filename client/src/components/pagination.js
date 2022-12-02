import React from "react";
import { Pagination } from "@mui/material";
import _ from "lodash";

function Paginations({ itemsCount, onPageChange, currentPage, pageSize }) {
  const pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <div>
      <Pagination
        className="mt-2 "
        hidePrevButton
        hideNextButton
        color="secondary"
        count={pages.length}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
      ></Pagination>
    </div>
  );
}

export default Paginations;
