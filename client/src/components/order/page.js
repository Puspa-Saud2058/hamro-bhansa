// pages/order.js
import React from 'react';

const OrderPage = ({ orderData }) => {
  return (
    <div>
      <h1>Order Page</h1>
      </div>
  );
};

export async function getServerSideProps() {
  // Fetch order data from the backend API
  const res = await fetch('http://localhost:4000/order');
  const orderData = await res.json();

  return {
    props: {
      orderData,
    },
  };
}

export default OrderPage;
