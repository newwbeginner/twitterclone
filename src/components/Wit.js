import React, { useState } from "react";
import { dbService, storageService  } from "fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "firebase/storage"

const Wit = ({witObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newWit, setNewWit] = useState(witObj.text);
    const WitTextRef =doc(dbService, "wits", `${witObj.id}`);
    const urlRef = ref(storageService, witObj.attachmentUrl); 
    const onDeleteClick = async () =>{
        const ok = window.confirm("Are you sure you want delete this wit?");        
        if (ok){
            await deleteDoc(WitTextRef);
            await deleteObject(urlRef);
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(WitTextRef, {
            text: newWit,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            currentTarget : {value},
        }=event;
        setNewWit(value);
    };
    return (
    <div className="nweet">
        {editing ? (
        <>
            {isOwner && <><form onSubmit={onSubmit} className="container nweetEdit">
                <input type="text" value={newWit} required onChange={onChange}/>
                <input type="submit" value="Update" className="formBtn" />
            </form>
            <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button></>}
        </>
        ) : (
        <>
        <h4>{witObj.text}</h4>
        {witObj.attachmentUrl && <img src={witObj.attachmentUrl} width="200px" height="200px"/>}
        {isOwner && (
        <div className="nweet__actions">
            
        </div>
        )}
        </>
        )
        }
    </div>
    );
};
    


export default Wit;
