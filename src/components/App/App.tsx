import React, { createContext,useEffect, useState,SetStateAction } from 'react';
import NewsTable from '../NewsTable/NewsTable'
import {
  FontSizeOutlined,
  FieldTimeOutlined,
  EditOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Switch, Col, Row,Spin,Alert   } from 'antd';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Article from '../Article/Article';
import Filter from '../Filter/Filter';
import axios, {AxiosResponse} from 'axios'
import { setTimeout } from 'timers/promises';
interface ArticleData {
  title: string;
  publishedAt: string;
  description: string;
  id: string;
  // Add additional properties if necessary
}

interface ColumnsProps {
  title: string;
  dataIndex: string;
  key: string;
  checked?: boolean;
  render?: (data:string) => React.JSX.Element;
  // Add additional properties if necessary
}

interface AppContextProps {
  columns:ColumnsProps[];
  setColumns: React.Dispatch<SetStateAction<ColumnsProps[]>>;
  data: ArticleData[];
  setData: React.Dispatch<SetStateAction<ArticleData[]>>;
  filter: Record<string, string>;
  setFilter:React.Dispatch<SetStateAction<Record<string, string>>>;
  filteredData: ArticleData[];
  // Add additional properties if necessary
}

const { Header, Content, Footer, Sider } = Layout;
// const initLabels: {label:string,checked:boolean}[] = [
//   {label:'Title',checked: true},
//   {label:'Published At',checked: false},
//   {label:'Description',checked: true},
// ];

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

  interface Article {
    content: string;
    description: string;
    publishedAt: string;
    source: {
      id: string;
      name: string;
    };
    title: string;
    urlToImage: string;
    url: string;
  }


  useEffect(() => {
    // https://saurav.tech/NewsAPI/sources.json
    // axios.get<Article[]>('https://newsapi.org/v2/everything?q=tesla&from=2023-06-26&sortBy=publishedAt&apiKey=3931aff55dc141dbb2c859626616e540')
    //   .then(({ data }) => setData(data.articles));
    // <{sources:Article[]}>
    // <[articles:Article[]]>
  
    // axios.get<{ data: { status: string, totalResults: number, articles: Article[] } }>('https://saurav.tech/NewsAPI/everything/cnn.json')
    // .then(( resp:AxiosResponse<{ data: { status: string, totalResults: number, articles: Article[] } }> ) => console.log(resp.data.articles));

    // axios.get<{ data: { status: string, totalResults: number, articles: Article[] } }>('https://saurav.tech/NewsAPI/everything/cnn.json')
    // .then((response: AxiosResponse<{ data: { status: string, totalResults: number, articles: Article[] } }>) => {
      //   if (response.data && response.data.articles) {
        //   console.log(response.data.articles); // Объект с данными articles
        //   }
    // });
/*
    NEWSAPI
    https://github.com/SauravKanchan/NewsAPI
*/
setIsLoading(true);
axios.get('https://saurav.tech/NewsAPI/everything/cnn.json')
.then(   (response: AxiosResponse) => {
  const data = response.data.articles.map( (el:Article, ind: number) => {
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



  // function changeColumns(columns: ColumnsProps[]):ColumnsProps[] {
  //   const copy = [...columns];
  //   copy 
  //   return 
  // }
  // const modifiedColumns = changeColumns(columns);
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
    // console.log(arr);
    

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
      {/* Тут data передавать в контекст */}

      <BrowserRouter>
      <Routes>
                <Route path='/' element={
        //  <Layout hasSider>
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