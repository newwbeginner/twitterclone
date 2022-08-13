import { authService, dbService  } from "fbase";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Profile =  ({ userObj })=> {
    const navigate = useNavigate();
    const auth = getAuth();
    const onLogOutClick = () => {
        signOut(auth);
        navigate("/", { replace: true });
    };
    
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;