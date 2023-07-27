import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { Card } from 'antd';

function Article() {
  const {id} = useParams();
  
  return (
    <>
    <Link to="/">На главную</Link>
    <div>Article {id}</div>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    </>
  )
}

export default Article