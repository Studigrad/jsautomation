import express from "express";
import mysql from "mysql";
import { load } from "ts-dotenv";

const env = load({
  HOST: String,
  USERNAME: String,
  DATABASE: String,
  PASSWORD: String,
  PORT: Number,
});

let pool = mysql.createPool({
  host: "yh6.h.filess.io",
  user: "automation_heraction",
  password: "a15e5a47817c45a99ca9f32298e1cca90ea3c056",
  database: "automation_heraction",
  port: 3306,
});

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(`SELECT * from users`, function (error, results, fields) {
      connection.release();
      if (error) throw error;
      res.json(results);
    });
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT * from users WHERE id=${id}`,
      function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      }
    );
  });
});

app.post("/user", (req, res) => {
  const { username, email, password } = req.body;
  pool.getConnection(function (err, connection) {
    connection.query(
      `INSERT INTO users (username,email,password) VALUES ('${username}','${email}','${password}')`,
      function (error, results, fields) {
        if (error) throw error;
        console.log(results);
      }
    );
  });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    connection.query(
      `DELETE from users WHERE id=${id}`,
      function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      }
    );
  });
});

app.put("/user/:id", (req, res) => {});

app.listen(env.PORT, () => {
  console.log("Listening on port 3000");
});
