import UserProfile from "../features/auth/components/user/components/userProfile";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <h1 className=" ml-3 text-4xl font-bold tracking-tight text-gray-900">
          My Profile
        </h1>
        <UserProfile />
      </Navbar>
      <Footer />
    </>
  );
};

export default UserProfilePage;
