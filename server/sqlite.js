"use strict";

const fs = require("fs");
let sqlite3 = require("sqlite3").verbose();

let userSQL = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  gender TEXT,
  ip_addres TEXT,
)`;

let statisticSQL = `CREATE TABLE IF NOT EXISTS users_statistic ( 
  user_id INTEGER,
  date TEXT,
  page_views INTEGER,
  clicks INTEGER
)`;

const pathToDB = "./db/sqliteDB.db";

function createUsersTable() {
  let usersFile = fs.readFileSync("./data/users_old.json");
  let usersJSON = JSON.parse(usersFile);
  let statisticFile = fs.readFileSync("./data/users_statistic_old.json");
  let statisticJSON = JSON.parse(statisticFile);
  let usersDB = new sqlite3.Database(pathToDB);

  usersDB.serialize(() => {
    usersDB
      .run(userSQL)
      .run(statisticSQL)
      .run("delete from " + "users")
      .run("delete from " + "users_statistic");

    let insertUser = usersDB.prepare("insert into users values (?,?,?,?,?,?)");

    usersJSON.forEach((user) => {
      insertUser.run([
        user.id,
        user.first_name,
        user.last_name,
        user.email,
        user.gender,
        user.ip_address,
      ]);
    });

    insertUser.finalize();

    let insertStatistic = usersDB.prepare(
      "insert into users_statistic values (?,?,?,?)"
    );

    statisticJSON.forEach((item) => {
      insertStatistic.run([
        item.user_id,
        item.date,
        item.page_views,
        item.clicks,
      ]);
    });

    insertStatistic.finalize();
  });
  usersDB.close();
}

createUsersTable();
