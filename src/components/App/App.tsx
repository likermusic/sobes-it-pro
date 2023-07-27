import React, { useState } from 'react';
import {
  FontSizeOutlined,
  FieldTimeOutlined,
  EditOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Switch, Col, Row  } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const labels: String[] = ['Title','Published At','Description'];
const items: MenuProps['items'] = [
  FontSizeOutlined,
  FieldTimeOutlined,
  EditOutlined
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label:   (
          <Row justify="space-between" align="middle">
             <label>{labels[index]}</label>
            <Switch defaultChecked />   
           </Row>
         ),
}));



const App: React.FC = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  // const items: MenuProps['items'] = [
  //   {
  //     label: (
  //       <Row justify="space-between" align="middle">
  //         <label>Title</label>
  //         <Switch defaultChecked onChange={onChange} />   
  //       </Row>
  //     ),
  //     key: '0',
  //   },
  //   {
  //     label: (
  //       <Row justify="space-between" align="middle">
  //         <label>Description</label>
  //         <Switch defaultChecked onChange={onChange} />   
  //       </Row>
  //     ),
  //     key: '1',
  //   },
  //   {
  //     label: (
  //       <Row justify="space-between" align="middle">
  //         <label>Published At</label>
  //         <Switch defaultChecked onChange={onChange} />   
  //       </Row>
  //     ),
  //     key: '2',
  //   },
  // ];



  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

 

  return (
    <Layout hasSider>
      {/* <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider> */}

      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {/* <div className="demo-logo-vertical" /> */}
        <Menu theme="dark" mode="inline" items={items}/>
      </Sider>
      <Layout >
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;