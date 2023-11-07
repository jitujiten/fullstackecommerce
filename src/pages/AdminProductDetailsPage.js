import AdminProductDetail from "../features/admin/components/AdminProductDetails";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

function AdminProductDetailsPage() {
  return (
    <div>
      <Navbar>
      <AdminProductDetail/>
      </Navbar>
      <Footer/>
    </div>
  );
}

export default AdminProductDetailsPage;
