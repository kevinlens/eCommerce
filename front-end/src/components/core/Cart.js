import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from '../../actions/core/cartHelpers';
import Card from './Card';

const Cart = () => {
  //
  const [items, setItem] = useState([]);

  useEffect(() => {
    setItem(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {/*Loop through the 'items' array, and assign the 'i'(index) uniquely for 
        each and everysingle one of the products and pass in the product as a prop for the component */}
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty.
      <br />
      <Link to='/shop'> Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout or continue shopping'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-6'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className='col-6'>
          <p>Show checkout options/shipping address/total/update quantity</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
