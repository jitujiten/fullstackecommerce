import UserOrders from "../features/auth/components/user/components/userOrders";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

export default function UserOrderPage() {
  

  return (
    <div>
      <Navbar>
        <h1 className=" text-4xl font-extrabold tracking-tight leading-none text-gray-800 font-serif">
          My Orders
        </h1>
        <UserOrders/>
      </Navbar>
      <Footer/>
    </div>
  );
}
