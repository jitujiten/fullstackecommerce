import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/userProfile";

const UserProfilePage = () => {
  return (
    <Navbar>
      <h1 className=" ml-3 text-4xl font-bold tracking-tight text-gray-900">
        My Profile
      </h1>
      <UserProfile />
    </Navbar>
  );
};

export default UserProfilePage;
