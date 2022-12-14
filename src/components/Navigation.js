import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (<nav> 
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
            <Link to ="/" style={{ marginRight: 10 }}>HOME</Link>
        </li>
        <li>
            <Link to="/profile" 
            style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
            }}>
            <span style={{ marginTop: 10 }}>My Profile</span></Link>
        </li>
    </ul>
</nav>
);
export default Navigation;