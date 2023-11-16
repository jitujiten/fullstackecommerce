import UserProfile from "../features/auth/components/user/components/userProfile";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <h1 className=" text-4xl font-extrabold tracking-tight leading-none text-gray-800 font-serif">
          My Profile
        </h1>
        <UserProfile />
      </Navbar>
      <Footer />
    </>
  );
};

export default UserProfilePage;
