import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Link from 'next/link';

const { Meta } = Card;

function Page(props) {
  return (
    <div>
    <Link href={`/products/${props.item._id}`}>
    <Card
      style={{
        width: 400,
        margin:10
      }}
      cover={
        
       
        <img
          alt="example"
          src={`http://localhost:4000/product-image?productId=${props.item._id}`}
        />
      }      
         >
      <Meta      
        title={props.item.productName}
        description={props.item.price}
      />
    </Card>
    </Link>
      <p> <button>Add</button></p>
    </div>

  );
}

export default Page;
