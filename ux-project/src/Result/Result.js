import React, { Component } from "react";
import { Space, Table, Tag ,Input  } from "antd";
import "antd/dist/antd.css";
import {  InputGroup,  FormControl,  Navbar,  Nav, Button , Container} from "react-bootstrap";


const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Column, ColumnGroup } = Table;

  
 const data = [
  {
    key: '1',
    Name: 'kmutnb',
    winer: 3,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    Name: 'Sport',
    winer: 2,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    Name: 'Music',
    firstName: 'Joe',
    lastName: 'Black',
    winer: 1,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
 

class Result extends React.Component {
  render() {
    return (
      <div className="main">
        <div>
            <header style={{ padding: 20 }}>
                <h1>Election Results</h1>
            </header>
          
          <div>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              style={{
                width: 304,
                marginLeft: 1000,
              }}
              onSearch={onSearch}
            />
            
            <Container style={{ padding: 20 }}>
              <Table dataSource={data}>
                <Column title="Name" dataIndex="Name" key="Name" />
                <Column title="Age" dataIndex="winer" key="winer" />
                <Column
                  title="Action"
                  key="action"
                  render={(_, record) => (
                    <Space size="middle">
                      <a href="/Detail">Detail</a>
                    </Space>
                  )}
                />
              </Table>
              <div style={{ display: "flex" }}>
                <Button
                  href="/"
                  variant="primary"
                  type="submit"
                  style={{ width: 200, marginLeft: 200 }}
                >
                  Home
                </Button>
                <Button
                  href="/Statistics"
                  variant="primary"
                  type="submit"
                  style={{ width: 200, marginLeft: 500 }}
                >
                  Statistics
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
export default Result;
