import './profile.css';
import api from './api';

function Profile( { setAccessToken, user, setUser }) {
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            setAccessToken(null);
            setUser(null);
            window.location.href = "/";
        } catch (error) {
            console.error("Failed to Logout", error);
        }
    };

    return (
        <div>
            <title>Profile</title>
            <button id="Log Out" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Profile;