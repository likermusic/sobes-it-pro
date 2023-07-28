import React, { createContext,useEffect, useState,SetStateAction } from 'react';
import NewsTable from '../NewsTable/NewsTable'
import Article from '../Article/Article';
import Filter from '../Filter/Filter';

import {ColumnsProps, ArticleData, AppContextProps, ArticleApi} from '../../types'
import {
  FontSizeOutlined,
  FieldTimeOutlined,
  EditOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Switch, Col, Row,Spin,Alert   } from 'antd';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios'

const { Header, Content, Footer, Sider } = Layout;

let initColumns: ColumnsProps[] = [
  {
    title: 'Заголовок',
    dataIndex: 'title',
    key: 'title',
    checked:true
  },
  {
    title: 'Дата',
    dataIndex: 'publishedAt',
    key: 'publishedAt',
    checked:true
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
    checked:true,
    render: (text) => <span className='my-crop'>{text}</span>
  },
];

export const AppContext = createContext<AppContextProps | undefined>(undefined);

function App () {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [data, setData] = useState<ArticleData[] | []>([]);
  const [columns, setColumns] = useState(initColumns);
  const [filter, setFilter] = useState<Record<string,string>>({sort: 'new', search: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function switchColumn (checked: boolean, index: number) {    
    setColumns((prev)=> {
      let copy = [...prev];
      copy[index].checked = checked;
      return copy;
    })
  };

  const items: MenuProps['items'] = [
    FontSizeOutlined,
    FieldTimeOutlined,
    EditOutlined
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label:   (
            <Row justify="space-between" align="middle">
               <label>{columns[index].title}</label>
              <Switch onChange={(checked)=>switchColumn(checked,index)} checked={columns[index].checked}/>   
             </Row>
           ),
  }));

  useEffect(() => {
/*
    NEWSAPI
    https://github.com/SauravKanchan/NewsAPI
*/
setIsLoading(true);
axios.get('https://saurav.tech/NewsAPI/everything/cnn.json')
.then(   (response: AxiosResponse) => {
  const data = response.data.articles.map( (el:ArticleApi, ind: number) => {
    return {id:String(ind+1), title:el.title,description:el.description,publishedAt:new Date(el.publishedAt).toLocaleString()}
  })
  setData(data);
  }).then(() => {
    setIsLoading(false);  
  })
  .catch((e) => {
    setIsLoading(false);
    setIsError(true);
  });
}, []); 


function filterHandler(data: ArticleData[], filter: Record<string,string>) {
    data.sort((a:any, b: any) => {
      let aDate = new Date(a.publishedAt).getTime();
      let bDate = new Date(b.publishedAt).getTime();
      if (filter.sort == 'new') {
        return bDate - aDate;
      } else {
        return aDate - bDate;
      } 
    })

    return data.filter( el => {
      return el.title.toLowerCase().includes(filter.search.toLowerCase());
    })    
  }

  const filteredData = filterHandler(data, filter);

  if (isError) {
    return (
      <Alert
      message="Ошибка"
      description="Попробуйте позже!"
      type="error"
      showIcon
      style={{ width: 600, position:'absolute', left: '50%', top:'50%', transform: 'translate(-50%,-50%)', textAlign:'center'}}
    />
    )
  }

  return (
    <AppContext.Provider value={{columns, setColumns, data, setData, filter, setFilter, filteredData}}>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={    
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" mode="inline" items={items}/>
            </Sider>
            <Layout >
              <Header style={{ padding: 0, background: colorBgContainer }} >
                  <Filter/>
              </Header>
              <Content style={{margin: '24px 16px 0', overflow: 'initial' }}>
                {isLoading ? 
                (<Spin style={{marginTop:'40px'}} tip="Loading" size="large">
                  <div className="content" />
                </Spin>) :
                (<div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>   
                  <NewsTable/>
                </div>)
                }
              </Content>
            </Layout>
         </Layout> 
                }/>
          <Route path='/:id' element={
            <Article/>
          }/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;