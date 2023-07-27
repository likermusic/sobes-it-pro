import React, { createContext,useEffect, useState,SetStateAction } from 'react';
import NewsTable from '../NewsTable/NewsTable'
import {
  FontSizeOutlined,
  FieldTimeOutlined,
  EditOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Switch, Col, Row   } from 'antd';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Article from '../Article/Article';
import Filter from '../Filter/Filter';
interface ArticleData {
  title: string;
  publishedAt: string;
  description: string;
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
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    checked:true
  },
  {
    title: 'Published At',
    dataIndex: 'publishedAt',
    key: 'publishedAt',
    checked:true
  },
  {
    title: 'Description',
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
    // axios.get('https://newsapi.org/v2/everything?q=tesla&from=2023-06-26&sortBy=publishedAt&apiKey=3931aff55dc141dbb2c859626616e540')
    //   .then(({ data }) => setData(data.articles));

    setData( [
      {title: 'sd11', description: 'aaasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', publishedAt: '12-12-12'},
      {title: 'ds22', description: 'bb', publishedAt: '12-12-12'},
      {title: 'dss333', description: 'ccc', publishedAt: '12-12-11'},
      {title: 'sd11', description: 'aaa', publishedAt: '12-12-12'},
      {title: 'ds22', description: 'bb', publishedAt: '12-12-23'},
      {title: 'dss333', description: 'ccc', publishedAt: '12-12-12'},
      {title: 'sd11', description: 'aaa', publishedAt: '12-12-10'},
      {title: 'ds22', description: 'bb', publishedAt: '10-12-12'},
      {title: 'dss333', description: 'ccc', publishedAt: '19-12-12'},
      {title: 'sd11', description: 'aaa', publishedAt: '11-12-12'},
      {title: 'ds22', description: 'bb', publishedAt: '12-11-12'},
      {title: 'dss333', description: 'ccc', publishedAt: '12-05-12'},
      {title: 'sd11', description: 'aaa', publishedAt: '12-02-12'},
      {title: 'ds22', description: 'bb', publishedAt: '12-01-12'},
      {title: 'dss333', description: 'ccc', publishedAt: '12-12-12'},
    ])
  }, []); 


  

  
  



  

  // function changeColumns(columns: ColumnsProps[]):ColumnsProps[] {
  //   const copy = [...columns];
  //   copy 
  //   return 
  // }
  // const modifiedColumns = changeColumns(columns);
  function filterHandler(data: ArticleData[]) {
    return data.filter( el => {
      return el.title.toLowerCase().includes(filter.search.toLowerCase());
    })    
  }
  const filteredData = filterHandler(data);

  return (
    <AppContext.Provider value={{columns, setColumns, data, setData, filter, setFilter, filteredData}}>
      {/* Тут data передавать в контекст */}

      <BrowserRouter>
      <Routes>
                <Route path='/' element={
         <Layout hasSider>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" mode="inline" items={items}/>
            </Sider>
            <Layout >
              <Header style={{ padding: 0, background: colorBgContainer }} >
                  <Filter/>
              </Header>
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              
                  <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
                    
                    <NewsTable/>
                  </div>
            
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