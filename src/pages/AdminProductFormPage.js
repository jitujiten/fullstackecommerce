import React from "react";
import ProductForm from "../features/admin/components/ProductForm";
import Navbar from "../features/navbar/Navbar";

const AdminProductFormPage = () => {
  return (
    <div>
      <Navbar>
        <ProductForm />
      </Navbar>
    </div>
  );
};

export default AdminProductFormPage;
