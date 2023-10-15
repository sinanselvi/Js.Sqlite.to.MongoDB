import { MongoClient } from "mongodb";
import sqlite3 from "sqlite3";
import { connectSqlite3, disconnectSqlite3, getAll } from "./sqlitemanager.js";

// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./chinook.db", (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log("Connected to the chinook database.");
// });

console.log("app started");

const dbsqlite3 = await connectSqlite3();

// let q1 =
//     "SELECT name FROM sqlite_master WHERE type='table' AND name NOT IN ('sqlite_sequence','sqlite_stat1') ORDER BY name;";

// let get111 = function (query, callback) {
//     db.all(query, [], (err, rows) => {
//         if (err) {
//             callback(null);
//         }
//         callback(rows);
//     });
// };

// let r1 = get111(q1, (data) => {
//     console.table(data);
//     return data;
// });
// console.log("111111111111111111");
// console.log(r1);

let result = await getAll(
    dbsqlite3,
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT IN ('sqlite_sequence','sqlite_stat1') ORDER BY name;"
);
console.table(result.map((x) => x.name));
for (let index = 0; index < result.length; index++) {
    const element = result[index];
    let columns = await getAll(
        dbsqlite3,
        `select * from pragma_table_info('${element.name}')`
    );
    console.log(`Table Name = ${element.name} =>`);
    console.table(columns);
}


//---------mongo
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


const uri = "mongodb://localhost:27017";       
const client = new MongoClient(uri);
await client.connect();
await client.db.listDatabases();
// await listDatabases(client);


// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log("Close the database connection.");
// });

await disconnectSqlite3(dbsqlite3);

console.log("app finished");
