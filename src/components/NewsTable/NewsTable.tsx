import React, { useContext, useState, SetStateAction } from 'react'
import { Table } from 'antd';
import { AppContext } from '../App/App';
import {Link} from 'react-router-dom';

interface ArticleData {
  title: string;
  publishedAt: string;
  description: string;
  // more: string;
  // Add additional properties if necessary
}

interface NewsTableProps {
  data: ArticleData[] | []; // Update the type here
}

interface ColumnsProps {
  title: string;
  dataIndex: string;
  key: string;
  checked?:boolean;
  // Add additional properties if necessary
}

interface AppContextProps {
  columns: ColumnsProps[];
  setColumns: React.Dispatch<SetStateAction<ColumnsProps[]>>;
  // Add additional properties if necessary
}

function NewsTable({ data }: NewsTableProps) {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null; // You can return an empty state or a loading spinner
  }
  
  const dataSource = data.map((el, ind) => {
    return {
      key: `${ind}`,
      title: el.title,
      publishedAt: el.publishedAt,
      description: el.description,
      more: (<Link to={`/${ind}`}>Читать далее</Link>)
    }
  });
  const { columns, setColumns } = appContext;
  
  const arr = columns.filter(col=>col.checked);

  if (arr.length > 0) {
    arr.push(
      {
        title: '',
        dataIndex: 'more',
        key: 'more',
      }
    )
  }
    
  return (
    arr.length > 0  ?
    // <Table dataSource={dataSource} columns={columns.filter(col=>col.checked)}/>
    <Table dataSource={dataSource} columns={arr}/>

    :
    <div style={{height:'100vh',fontSize:'26px'}}>Информация скрыта</div>
  );
}

export default NewsTable;