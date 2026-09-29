import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import "../../css/Profile.css";
function Profile(){
    const [user] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/'); // if not logged in
        }
    }, [navigate, user]);
    return (
        <div className="profile-page" >
            <h2>My Profile</h2>

            <div className="profile-card">
                {user ? (
                        <>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    )
}
export default Profile;