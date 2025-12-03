import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth()
    return (
        <div>
            <SectionTitle heading='User home'></SectionTitle>
<h2>
  Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!
</h2>

        </div>
    );
};

export default UserHome;