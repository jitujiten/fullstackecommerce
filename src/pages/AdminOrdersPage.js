import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminOrders from "../features/admin/components/AdminOrders";
import Footer from "../features/common/Footer";

const AdminOrdersPage = () => {
  return (
    <div>
      <Navbar>
        <AdminOrders />
      </Navbar>
      <Footer/>
    </div>
  );
};

export default AdminOrdersPage;
