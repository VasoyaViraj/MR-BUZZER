import { Client, Databases, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('677301de002106afb13b');

const databases = new Databases(client);

export { client, databases, Query };