const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./db/usersDB.db");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("simple request");
});

app.get("/users", (req, res) => {
  const { page = 1, amount = 10 } = req.query;
  const startIndex = (page - 1) * amount;
  let sql = `
    SELECT *
    FROM users
    INNER JOIN statistic ON statistic.id = users.id
    GROUP BY users.id
    LIMIT ? , ?

    `;
  db.all(sql, [startIndex, amount], (err, rows) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send({ data: rows });
    }
  });
});

app.get("/statistic/:userId", (req, res) => {
  const [today] = new Date().toISOString().split("T");
  const { from = "0000-00-00", to = today } = req.query;
  const { userId } = req.params;
  let sql = `
    SELECT *
    FROM statistic
    WHERE id = ? AND date >= ? AND date <= ?
  `;
  db.all(sql, [userId, from, to], (err, row) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send({ data: row });
    }
  });
});

//------------------------------------------------------
app.get("/users/:id", (req, res) => {
  const reqID = req.params.id;
  let sql = `
    SELECT * 
    FROM users
    WHERE id = ?
  `;

  db.get(sql, [reqID], (err, row) => {
    if (err) {
      res.send(err.message);
    } else {
      const { first_name, last_name } = row;
      res.send({ row });
    }
  });
});

app.get("/statistic", (req, res) => {
  const { firstId, lastId } = req.query;
  let sql = `
    SELECT sum(clicks), id
    FROM statistic
    GROUP BY id
  `;
  db.all(sql, (err, rows) => {
    if (err) {
      res.send(err.message);
    } else {
      res.status(200).send({ data: rows });
    }
  });
});
app.listen(4000, () => console.log("run server on port 4000"));
