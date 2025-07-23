
// import { database } from "../appwriteConf/appwriteConfig";
export const baseUrl='https://cloud.appwrite.io/v1/'
export const petEnd=`databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_PET_COLLECTION_ID}/documents`