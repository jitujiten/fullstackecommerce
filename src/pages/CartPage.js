import React from "react";
import Cart from "../features/cart/Cart";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import Protected from "../features/auth/components/Protected";

const CartPage = () => {
  return (
    <div>
      <Navbar>
        <Cart />
      </Navbar>
      <Footer />
    </div>
  );
};

export default CartPage;
