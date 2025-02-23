import { Client, Account, Databases, Storage ,ID,Query } from 'appwrite'

const client = new Client()
client.setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT).setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID)

export const account=new Account(client)

//database and storage

export const database=new Databases(client,"process.env.REACT_APP_APPWRITE_DATABASE_ID")
export const storage=new Storage(client,process.env.REACT_APP_APPWRITE_STORAGE_ID)