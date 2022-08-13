import React, { useEffect, useState } from "react";
import Profile from "../routes/Profile"
import { dbService, storageService } from "fbase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Wit from "../components/Wit"
import WitFactory from "components/WitFactory";


const Home = ({userObj}) => {
    
    const [wits, setWits] = useState([]); 
    
    useEffect(()=> {
        const querySelect = query(
            collection(dbService, "wits"),orderBy("createdAt", "desc")
        );
        onSnapshot(querySelect, (snapshot) => {
            const witArr = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
            }));
            setWits(witArr);
            });
            }, []);
    
    return (
    <div>
        <WitFactory userObj={userObj}></WitFactory>
        <div>
            {wits.map((wit) => (
                <Wit key={(wit.id)} witObj={wit} isOwner={wit.creatorId === userObj.uid}/>
            ))}
        </div>
        <Profile></Profile>
    </div>
    );
};

export default Home;