import UserOrders from "../features/auth/components/user/components/userOrders";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

export default function UserOrderPage() {
  

  return (
    <div>
      <Navbar>
        <h1 className=" ml-3 text-4xl font-bold tracking-tight text-gray-900">
          My Orders
        </h1>
        <UserOrders/>
      </Navbar>
      <Footer/>
    </div>
  );
}
