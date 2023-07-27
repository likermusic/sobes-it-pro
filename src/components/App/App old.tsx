import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NewsTable from '../NewsTable/NewsTable'
import Dashboard from '../Dashboard/Dashboard';
import axios from 'axios';

import { Button,Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';



// Define the type for article data
interface ArticleData {
  title: string;
  publishedAt: string;
  description: string;
  // Add additional properties if necessary
}

function App() {
  const [data, setData] = useState<ArticleData[] | []>([]);
  // const [data, setData] = useState<ArticleData[]>([]);4
  const { Search } = Input;
  
  useEffect(() => {
    // axios.get('https://newsapi.org/v2/everything?q=tesla&from=2023-06-26&sortBy=publishedAt&apiKey=3931aff55dc141dbb2c859626616e540')
    //   .then(({ data }) => setData(data.articles));
    setData( [
      {title: 'sd11', description: 'aaa', publishedAt: '12-12-12'},
      {title: 'ds22', description: 'bb', publishedAt: '12-12-12'},
      {title: 'dss333', description: 'ccc', publishedAt: '12-12-12'}
    ])
  }, []); 

 

  
  const onSearch = (value: string) => console.log(value);

  return (
 
    <h1>App</h1>

    // <div className="App">
    //   <Search placeholder="input search text" onSearch={onSearch} enterButton />
    //   {/* <table {...getTableProps()}>
    //     <thead>
    //       {headerGroups.map((headerGroup) => (
    //         <tr {...headerGroup.getHeaderGroupProps()}>
    //           {headerGroup.headers.map((column) => (
    //             <th {...column.getHeaderProps()}>
    //               {column.render("Header")}
    //             </th>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //     <tbody {...getTableBodyProps()}>
    //       {rows.map((row) => {
    //         prepareRow(row);
    //         return (
    //           <tr {...row.getRowProps()}>
    //             {row.cells.map((cell) => (
    //               <td {...cell.getCellProps()}>
    //                 {cell.render("Cell")}
    //               </td>
    //             ))}
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table> */}
    //   <Button type="primary">Нажми меня!</Button>
    //   <NewsTable data={data}/>
    //  <Dashboard/>
      
    // </div>
  );
}

export default App;
