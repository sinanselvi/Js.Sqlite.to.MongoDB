import sqlite3 from "sqlite3";


export let getAll = async function (db, query) {
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            // let tables = [];
            // rows.forEach((row) => {
            //     console.log(row.name);
            //     tables.push(row.name);
            // });
            // console.table(tables);
            // console.table(rows.map((x) => x.name));
            resolve(rows);
        });
    });
};

export let connectSqlite3 = async function () {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database("./chinook.db", (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            console.log("Connected to the database.");
        });
        resolve(db);
    });
};


export let disconnectSqlite3 = async function (db) {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            console.log("Closed the database connection.");
            resolve(true);
        });
    });
};