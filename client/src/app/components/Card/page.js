import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Link from 'next/link';

const { Meta } = Card;

function Page(props) {
  console.log('price:',props.item.price);
  return (
    <Link href={`/product/${props.item._id}`}>
    <Card
      style={{
        width: 400,
        margin:10
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
         >
      <Meta
      
        title={props.item.productName}
        description={props.item.price}
      />
    </Card>
    </Link>

  );
}

export default Page;
