import React, { useContext } from 'react'
import {Link, useParams} from 'react-router-dom'
import { Card,Row } from 'antd';
import { AppContext } from '../App/App';

function Article() {
  const {id} = useParams();
  const appContext = useContext(AppContext);
  if (!appContext) {
    return null;
  }

 const { data } = appContext;

 const item = data.find( (col,ind) => ind == Number(id));

  
  return (
    <>
    <Link to="/">На главную</Link>
    {/* <div>Article {id}</div> */}
    <Card  style={{ width: 600, position:'absolute', left: '50%', top:'50%', transform: 'translate(-50%,-50%)', background:'#40a9ff', color:'#fff', textAlign:'center'}}>
      <h1>{item?.title}</h1>
      <hr />
      <p>{item?.publishedAt}</p>
      <p>{item?.description}</p>
    </Card>
    </>
  )
}

export default Article