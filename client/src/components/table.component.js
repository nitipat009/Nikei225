import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { useFilters, useTable } from "react-table";
import BTable from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";

export default function Table({ history }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const load_data = async (offset, limit) => {
    try {
      const result = (
        await axios.get(
          `${process.env.REACT_APP_API_URL}api`,
          {
            params: { offset: offset, limit: limit ?? itemsPerPage },
          },
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        )
      ).data;
      setData(result);
      setPageCount(Math.ceil(result.total / itemsPerPage));
      setCurrentPageData(result.items.slice(data.offset, itemsPerPage));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    load_data();
  }, []);

  const [formData, setFormData] = useState({
    filter: "data_date",
  });
  const { filter } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  // Create a state
  const today = new Date().toISOString().substr(0, 10);
  const [filterInput, setFilterInput] = useState(today);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const columns = useMemo(
    () => [
      {
        Header: "ตารางหุ้น Nikkei225",
        // First group columns
        columns: [
          {
            Header: "2ตัวบน",
            accessor: "price_upper",
          },

          {
            Header: "2ตัวล่าง",
            accessor: "price_lower",
          },

          {
            Header: "วันที่",
            accessor: "data_date",
          },

          {
            Header: "เวลา",
            accessor: "data_time",
          },

          {
            Header: "เปิดตลาด",
            accessor: "open_price",
          },

          {
            Header: "เวลาเปิดตลาด",
            accessor: "opentime",
          },
        ],
      },
    ],
    []
  );

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter,
  } = useTable(
    {
      columns: columns,
      data: currentPageData,
    },
    useFilters
  );

  const formatDate = (data_date) => {  // วัน เดือน ปี -> เดือน วัน ปี
    const [date , month , year] = data_date.split('-').reverse().map(Number);
    return `${monthNames[month-1].slice(0,3)}/${date}/${year}`
  };

  // Update the state when input changes
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(filter, formatDate(value)); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };
  return (
    <form className="d-grid gap-3 rounded">
      <select
        class="form-select"
        aria-label=""
        onChange={handleChange("filter")}
        value={filter}
      >
        {/* <option value="price_upper">2ตัวบน</option>
        <option value="price_lower">2ตัวล่าง</option> */}
        <option selected value="data_date">
          วันที่
        </option>
        {/* <option value="data_time">เวลา</option>
        <option value="open_price">เปิดตลาด</option>
        <option value="opentime">เวลาเปิดตลาด</option> */}
      </select>
      {filter === "data_date" ? (
        <input
          type="date"
          className="form-control"
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"ข้อมูลที่ค้นหา"}
        />
      ) : (
        <input
          type="text"
          className="form-control"
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"ข้อมูลที่ค้นหา"}
        />
      )}

      <BTable
        striped
        bordered
        hover
        size="sm"
        className="table-secondary rounded"
        {...getTableProps()}
      >
        <thead style={{ textAlign: "center" }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={
          "pagination justify-content-center d-flex gap-3 align-items-center"
        }
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        disabledClassName={"page-item disabled"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        activeClassName={"active"}
      />
    </form>
  );
}
