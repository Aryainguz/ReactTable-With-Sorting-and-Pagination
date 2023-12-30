"use client";
import React from "react";
import { data } from "../(data)/data";
import { Column, useTable,useSortBy,usePagination} from "react-table";

const HomePage  = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Salary",
        accessor: "salary",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Position",
        accessor: "position",
      },
    ],
    []
  );

  const Table = useTable({
    columns,
    data,
    initialState: { pageSize: 5 },  // you can set default page size here
  },useSortBy,usePagination);

  // use page instead of rows for pagination to work by default max length of page is 10
  const { getTableProps, headerGroups, page, prepareRow, getTableBodyProps,nextPage,previousPage,canNextPage,canPreviousPage,gotoPage,state:{pageIndex},pageCount } =
    Table;

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={pageIndex <= 1}
                    onClick={()=>gotoPage(0)}
                  >
                    FirstPage
                  </button>
                    <button
                    className = {`text-white  text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${canPreviousPage ? 'bg-indigo-500' : 'bg-gray-300 '}`} 
                    type="button"                    
                    onClick={previousPage}
                  >
                    Previous
                  </button>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-center">
                <span className="
                  text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-indigo-500 last:mr-0 mr-1">

                  {pageIndex + 1} of {pageCount}
                </span>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={!canNextPage}
                    onClick={nextPage}
                  >
                    Next
                  </button>
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={pageIndex >= pageCount-1}
                    onClick={()=>gotoPage(pageCount-1)}
                  >
                    LastPage
                  </button>
                  
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table
                className="items-center bg-transparent w-full border-collapse"
                {...getTableBodyProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((header) => (
                        <th
                          {...header.getHeaderProps(header.getSortByToggleProps())}
                          className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                        >
                          {header.render("Header")} {header.isSorted ? ( header.isSortedDesc ? "⬇️" : "⬆️" ) : "➡️"}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="hover:bg-gray-200">
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 "
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
