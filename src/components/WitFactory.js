import React, {useState} from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";



const WitFactory = ({userObj}) => {
    const [wit, setWit] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
            const witObj = {                
                text: wit,
                createdAt: Date.now(),
                creatorId : userObj.uid,
                attachmentUrl,
            };
            await addDoc(collection(dbService, "wits"), witObj);
            setWit("");
            setAttachment("");        
        };    
    };
    const onChange = (event) =>{
        const { currentTarget: {value}}=event;
    setWit(value);
    };
    const onFileChange = (event) => {
        const {
            currentTarget: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result},}=finishedEvent
            setAttachment(result)
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachmentClick = () => {setAttachment("");};

    return (
        <form onSubmit={onSubmit}>
            <input value={wit} onChange={onChange} types="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="file" accpet="image/*" onChange={onFileChange} />
            {attachment && (
            <div>
                <img src={attachment} width="100px" height="100px" />
                <button onClick={onClearAttachmentClick}>Clear</button>
            </div>)}            
            <input type="submit" value="WIT" />
        </form>
    );
};
export default WitFactory;
