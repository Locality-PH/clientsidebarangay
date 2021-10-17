import React from 'react'
import {Card, List} from 'antd';
// import from '@ant-design/icons';

const News = () => {
    return (
        <div>
            <List bordered={true} grid={{gutter: 16, column: 4}}>
              <h3>Title</h3>
              <h3>Rojhon</h3>
            </List>
        </div>
    )
}

export default News;
