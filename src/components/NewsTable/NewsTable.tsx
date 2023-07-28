import React, { useContext, useState, SetStateAction } from 'react'
import { AppContext } from '../App/App';

import { Table } from 'antd';
import {Link} from 'react-router-dom';
import {ArticleData, NewsTableProps, ColumnsProps} from '../../types'

function NewsTable() {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null;
  }
  
  const { columns, setColumns, filteredData } = appContext;
  const dataSource = filteredData.map((el, ind) => {
    return {
      key: el.id,
      id: el.id,
      title: el.title,
      publishedAt: el.publishedAt,
      description: el.description,
      more: (<Link to={`/${el.id}`}>Читать далее</Link>)
    }
  });
  
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
    <Table dataSource={dataSource} columns={arr}/>
    :
    <Table  columns={arr}/>
  );
}

export default NewsTable;