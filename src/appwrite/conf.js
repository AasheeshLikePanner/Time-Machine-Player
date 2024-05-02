import conf from "../conf/conf";
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service{

    client = new Client();
    databases;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async addSong(name, year, url){
        try{
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                name,
                {
                    name,
                    year,
                    url
                }
            )
            return true;
        }catch(error){
            console.log("Appwrite serive :: addSong :: error", error);
            return false;
        }
    }

    async getSongs(queries){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite serive :: getSongs :: error", error);
            return false;
        }
    }
}

const service = new Service();

export default service;