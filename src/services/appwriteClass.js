import { Client, Databases } from "appwrite";

class service {
    client = new Client();
    databases  

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('677301de002106afb13b');

        this.databases = new Databases(this.client)
    }

    async getData(databaseId, collectionId){
        try { 
            const response = await this.databases.listDocuments(databaseId, collectionId);
            return response.documents;
        } catch (error) {
            console.log(`Error while fetching data from database : ${databaseId} and collection id : ${collectionId} and error : ${error}`);
        }
    }

    async sendData(databaseId, collectionId, data){
        try{
            const response = await this.databases.createDocument(
                databaseId,
                collectionId,
                'unique()', // Generate a unique document ID
                data
            );
            console.log(`data sended successfully :: data :: ${response}`);
            return response
            
        }catch(error){
            console.log(`Error while sending data to database : ${databaseId} and collection id : ${collectionId} and error : ${error}`);
        }
    }


}

const DBService = new service()

export default DBService