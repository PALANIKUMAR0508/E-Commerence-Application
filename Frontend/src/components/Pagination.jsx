import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Pagination = ({
  currentPage,
  onPageChange,
  nextPageText = <ChevronRight size={20} />,
  prevPageText = <ChevronLeft size={20} />,
  firstPageText = <ChevronsLeft size={20} />,
  lastPageText = <ChevronsRight size={20} />,
}) => {
  const { totalPages, products } = useSelector((state) => state.product);

  if (!products || products.length === 0 || totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 1; //pagewindow=>currrent page ku apparam athana page no show aaganum
    for (
      let i = Math.max(1, currentPage - pageWindow); //math.max(1,1-1)=>1,0=>1
      i <= Math.min(totalPages, currentPage + pageWindow); //math.min(4,1+1)=>4,2=>2
      i++
    ) {
      pageNumbers.push(i); //[(1,2)]
    }
    return pageNumbers;
  };

  const btnBase =
    "relative inline-flex items-center justify-center w-8 h-8 text-sm font-semibold transition-all duration ease-in-out rounded-full mx-1";
  const activeBtn =
    "bg-blue-500 text-white shadow-lg shadow-blue-200 ring-1 ring-blue-300 ring-offset-2 scale-85";
  const inactiveBtn =
    "text-gray-600 hover:bg-blue-50 hoover:text-blue-600 hover:scale-105 border-transparent";
  const controlBtn =
    "bg-white border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 shadow-sm";

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-12">
      <div className="flex items-center p-2 bg-white rounded-full shadow-md border border-gray-100">
        {/*First & Prev */}
        <div className="flex gap-1 mr-2 border-r pr-2 border-gray-100">
          <button
            disabled={currentPage === 1}
            className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`}
            title="First Page"
            onClick={() => onPageChange(1)}
          >
            {firstPageText}
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`}
            title="Previous"
          >
            {prevPageText}
          </button>
        </div>
        {/*Page Number */}
        <div className="flex gap-1">
          {getPageNumbers().map(
            (
              number, //getPageNumber=>vathu js function
            ) => (
              <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`${btnBase} ${number === currentPage ? activeBtn : inactiveBtn}`}
              >
                {number}
              </button>
            ),
          )}
        </div>
        {/*Next & Last */}
        <div className="flex gap-1 ml-2 border-l pl-2 border-gray-100">
          <button
            className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            title="Next"
          >
            {nextPageText}
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            title="Last"
            className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`}
          >
            {lastPageText}
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-400 font-mono tracking-wider uppercase">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default Pagination;
