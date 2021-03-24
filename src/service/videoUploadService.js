import { db } from "./firebase/firebase";

export const uploadVideo = (form) => db.collection('videos').add(form)

export const getAllVideos = () => db.collection('videos').get()

export const getUserVideos = (user) => db.collection('videos').where("user_id", "==", user.uid).get()

export const getOneVideo = (videoId) => db.collection('videos').where("id", "==", videoId).get()