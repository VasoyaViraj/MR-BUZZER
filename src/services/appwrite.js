import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('677301de002106afb13b'); // Replace with your project ID

const databases = new Databases(client);

export { client, databases };

// coll id : 677305df0009ed5a2613
// databaseid : 677305ac00095c78d53e