import React from "react";
import ProductForm from "../features/admin/components/ProductForm";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

const AdminProductFormPage = () => {
  return (
    <div>
      <Navbar>
        <ProductForm />
      </Navbar>
      <Footer/>
    </div>
  );
};

export default AdminProductFormPage;
