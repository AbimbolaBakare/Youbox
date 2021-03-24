import { db } from "./firebase/firebase";

import firebase from "firebase/app";

async function addComment(videoId, data) {
    let myArray = [data]
    const dataRef = await db.collection("videos").where("id", "==", videoId)

    const promises = [];

    dataRef.get().then(snapshots => {
        snapshots.forEach(snapshot => {
            promises.push(snapshot.ref.update({
                comments: firebase.firestore.FieldValue.arrayUnion(...myArray)
            }))
        })
    }); 

}

async function incrementLikes(videoId, val) {
    const dataRef = await db.collection("videos").where("id", "==", videoId)

    const data = [];

    dataRef.get().then(snapshots => {
        snapshots.forEach(snapshot => {
            data.push(snapshot.ref.update({
                likes: firebase.firestore.FieldValue.increment(val)
            }))
        })
    }); 

}

export {
    addComment, 
    incrementLikes
};