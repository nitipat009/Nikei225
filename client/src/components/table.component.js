import React , {useMemo , useEffect , useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useFilters, useTable } from 'react-table';
import BTable from 'react-bootstrap/Table';

export default function Table({history}) {


    const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
        :last-child {
            td {
            border-bottom: 0;
            }
        }
        }

        th,
        td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
            border-right: 0;
        }
        }
    }`

    const [userdata, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data

  const load_data = async () => {
    const result = await axios(`${process.env.REACT_APP_API_URL}api`);
    setData(result.data);
  }

  useEffect(() => {
    load_data();
  },[userdata]);


  const [formData, setFormData] = useState({
    filter : 'data_date'
  });
  const { filter } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
    // Create a state
    const [filterInput, setFilterInput] = useState("");


  const columns = useMemo(
    () => [
      {
        
        Header: "ตารางหุ้น Nikkei225",
        // First group columns
        columns: [
          {
            Header: "2ตัวบน",
            accessor: "price_upper"
          },
          
          {
            Header: "2ตัวล่าง",
            accessor: "price_lower"
          },

          {
            Header: "วันที่",
            accessor: "data_date"
          },

          {
            Header: "เวลา",
            accessor: "data_time"
          },

          {
            Header: "เปิดตลาด",
            accessor: "open_price"
          },

          {
            Header: "เวลาเปิดตลาด",
            accessor: "opentime"
          }

        ]
      }
    ],
    []
  );


  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter
  } = useTable({
    columns : columns,
    data : userdata
  },useFilters);

  // Update the state when input changes
    const handleFilterChange = e => {
        const value = e.target.value;
        setFilter(filter, value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };
  return (
    <form>
        <select class="form-select" aria-label="Default select example"
                onChange = {handleChange('filter')}
                value = {filter}>
                  <option value="price_upper">2ตัวบน</option>
                  <option value="price_lower">2ตัวล่าง</option>
                  <option selected value="data_date">วันที่</option>
                  <option value="data_time">เวลา</option>
                  <option value="open_price">เปิดตลาด</option>
                  <option value="opentime">เวลาเปิดตลาด</option>
        </select>
        <input type="text" className="form-control"
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"ข้อมูลที่ค้นหา"}
        />
        <BTable striped bordered hover size="sm"{...getTableProps()}>
        <thead style = {{textAlign : "center"}}>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th  {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                </tr>
            )
            })}
        </tbody>
        </BTable>
    </form>
  );



}