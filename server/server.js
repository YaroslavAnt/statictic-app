"use strict";

const fs = require("fs");

let json = fs.readFileSync("./data/users.json");
let users = JSON.parse(json);
let userKeys = Object.keys(users[0]);

let sqlite3 = require("sqlite3").verbose();

let usersDB = new sqlite3.Database("./db/users.db");

usersDB.serialize(() => {
  usersDB.run(
    "create table if not exists " +
      "users" +
      " (id numeric primary key, " +
      userKeys.filter((key) => key !== "id").join() +
      " text)"
  );

  usersDB.run("delete from " + "users"); //or drop the table first..

  let placeholders = userKeys.map((user) => "?").join(",");

  let stmt = usersDB.prepare("insert into users values (" + placeholders + ")");

  users.forEach((user) => {
    stmt.run([
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.gender,
      user.ip_address,
    ]);
  });

  stmt.finalize();
});
usersDB.close();
