import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Select, Row, Col } from 'antd';
import React, { useContext } from 'react';
import {AppContext} from '../App/App';
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);



function Filter() { 
 const appContext = useContext(AppContext);
 if (!appContext) {
  return null;
 }
const {filter, setFilter} = appContext;

function sortChangeHandler(value: string) {
  setFilter( (prev) => ({
    sort: value,
    search: prev.search
  }))
};
function onSearch (value: string) {
  console.log(123);
  
  
  
}
function searchChangeHandler(value: string) {
  setFilter( (prev) => ({
    sort: prev.sort,
    search: value
  }));
  
}
  return (
    <Row align="middle" justify="space-around">
      <Col span={9}>
        <Select
        defaultValue="Сначала новые"
        value={filter.sort}
        style={{ width: 200 }}
        onChange={sortChangeHandler}
        options={[
          { value: 'new', label: 'Сначала новые' },
          { value: 'old', label: 'Сначала старые' },
        ]}
      />
      </Col>
      <Col span={7} offset={5}>
        <Search style={{verticalAlign:'middle'}} placeholder="Искать по заголовку" value={filter.search} onChange={(e:React.ChangeEvent<HTMLInputElement>) =>searchChangeHandler(e.target.value)} onSearch={onSearch} enterButton />
      </Col> 

    </Row>

  )
 
}

export default Filter;