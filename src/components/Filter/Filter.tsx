import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Select, Row, Col } from 'antd';
import React from 'react';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch = (value: string) => console.log(value);

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function Filter() { 


  return (
    <Row align="middle" justify="space-around">
      <Col span={9}>
        <Select
        defaultValue="Сначала новые"
        style={{ width: 200 }}
        onChange={handleChange}
        options={[
          { value: 'new', label: 'Сначала новые' },
          { value: 'old', label: 'Сначала старые' },
        ]}
      />
      </Col>
      <Col span={7} offset={5}>
        <Search style={{verticalAlign:'middle'}} placeholder="Искать по заголовку" onSearch={onSearch} enterButton />
      </Col> 

    </Row>

  )
 
}

export default Filter;