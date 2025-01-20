import { Client, Databases, Query } from "appwrite";

const clientMR = new Client();

clientMR
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_PROJECT_ID);

const databasesMR = new Databases(clientMR);

export { clientMR, databasesMR, Query };

// coll id : 677305df0009ed5a2613
// databaseid : 677305ac00095c78d53e