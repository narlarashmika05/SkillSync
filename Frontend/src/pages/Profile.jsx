import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import "../styles/Profile.css";
import Loader from "../components/Loader";
function Profile() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        college: "",
        branch: ""
    });

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {

        try {
            const userEmail = localStorage.getItem("userEmail");

            const response = await api.get(`/profile/${userEmail}`);

            setUser(response.data);

        } catch (error) {
            console.log(error);
        }finally {

        setLoading(false);

    }
    };

    useEffect(() => {
        // Initial data load on mount; state updates happen after the request resolves
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProfile();
    }, []);

    const updateProfile = async () => {

        try {

            const userEmail = localStorage.getItem("userEmail");

            const response = await api.put(`/profile/${userEmail}`, user);

            setUser(response.data);

            alert("Profile Updated Successfully");

            setEditing(false);

        } catch (error) {

            console.log(error);
            alert("Failed to update profile");

        }

    };
    if (loading) {
    return <Layout><Loader /></Layout>;
}

    return (

        <Layout>

            <div className="profile-container">

                <h1>My Profile</h1>

                <div className="profile-card">

                    <label>Name</label>

                    <input
                        type="text"
                        value={user.name || ""}
                        disabled={!editing}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                name: e.target.value
                            })
                        }
                    />

                    <label>Email</label>

                    {/* Email is the login identity, so it can't be changed here */}
                    <input
                        type="email"
                        value={user.email || ""}
                        disabled
                    />

                    <label>College</label>

                    <input
                        type="text"
                        value={user.college || ""}
                        disabled={!editing}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                college: e.target.value
                            })
                        }
                    />

                    <label>Branch</label>

                    <input
                        type="text"
                        value={user.branch || ""}
                        disabled={!editing}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                branch: e.target.value
                            })
                        }
                    />

                    {!editing ? (

                        <button
                            className="edit-btn"
                            onClick={() => setEditing(true)}
                        >
                            Edit Profile
                        </button>

                    ) : (

                        <button
                            className="save-btn"
                            onClick={updateProfile}
                        >
                            Save Changes
                        </button>

                    )}

                </div>

            </div>

        </Layout>

    );
}

export default Profile;
