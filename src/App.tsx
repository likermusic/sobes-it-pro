import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useTable, Column, TableInstance, TableOptions, Row } from 'react-table';
import { log } from 'console';

// Define the type for article data
interface ArticleData {
  title: string;
  publishedAt: string;
  description: string;
  // Add additional properties if necessary
}

function App() {
  const [data, setData] = useState<ArticleData[]>([]);

  
  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=tesla&from=2023-06-26&sortBy=publishedAt&apiKey=3931aff55dc141dbb2c859626616e540')
      .then(({ data }) => setData(data.articles));
  }, []); 
  // useEffect(() => {
  //   fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-06-26&sortBy=publishedAt&apiKey=3931aff55dc141dbb2c859626616e540').then(resp=>resp.json()).then(data=>setData(data.articles))
  // }, []); 

  const columns: Column<ArticleData>[] = useMemo(()=>
  
  [
    {
      Header: "Titile",
      accessor: 'title',
    },
    {
      Header: "Published At",
      accessor: 'publishedAt',
    },
    {
      Header: "Description",
      accessor: 'description',
    },
  ],[]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }: TableInstance<ArticleData> = useTable<ArticleData>({ columns, data });

  return (
    <div className="App">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
