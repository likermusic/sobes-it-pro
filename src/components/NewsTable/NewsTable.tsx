import React from 'react'

import { Table } from 'antd';
interface ArticleData {
  title: string;
  publishedAt: string;
  description: string;
  // Add additional properties if necessary
}
interface NewsTableProps {
  data: ArticleData[] | []; // Update the type here
}
function NewsTable( {data}:NewsTableProps ) {
  console.log(data);
  
  const dataSource = data.map( (el,ind) => {
    return {
      key: `${ind}`,
      title: el.title,
      publishedAt: el.publishedAt,
      decription: el.description
    }
  })

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Published At',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
    },
    {
      title: 'Decription',
      dataIndex: 'decription',
      key: 'decription',
    },
  ];

  return (
    <Table dataSource={dataSource} columns={columns} />
  )
}

export default NewsTable