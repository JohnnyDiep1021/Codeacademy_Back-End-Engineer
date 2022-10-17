const sqlite3 = require("sqlite3");
const express = require("express");
const { check } = require("express-validator");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const db = new sqlite3.Database("./bank_sample.db");

const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const csrfMiddleware = csurf({
  cookie: {
    maxAge: 300000000,
    secure: true,
    sameSite: "none",
  },
});

// app.use(csrfMiddleware);

app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    res.status(403);
    res.send(err.message);
  } else {
    next();
  }
});

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/html/login.html"));
});

//LOGIN SQL
app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    db.get(
      `SELECT * FROM users WHERE username = $username AND password = $password`,
      { $username: username, $password: password },
      function (error, results) {
        console.log(error);
        console.log(results);
        if (results) {
          request.session.loggedin = true;
          request.session.username = results["username"];
          request.session.balance = results["balance"];
          request.session.file_history = results["file_history"];
          request.session.account_no = results["account_no"];
          response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

//Home Menu No Exploits Here.
app.get("/home", function (request, response) {
  if (request.session.loggedin) {
    const username = request.session.username;
    const balance = request.session.balance;
    response.render("home_page", { username, balance });
  } else {
    response.redirect("/");
  }
  response.end();
});

//CSRF CODE SECURED. SEE HEADERS SET ABOVE
app.get("/transfer", csrfMiddleware, function (request, response) {
  if (request.session.loggedin) {
    var sent = "";
    response.render("transfer", { sent, crsfToken: request.crsfToken });
  } else {
    response.redirect("/");
  }
});

//CSRF CODE
app.post("/transfer", csrfMiddleware, function (request, response) {
  if (request.session.loggedin) {
    console.log("Transfer in progress");
    var balance = request.session.balance;
    var account_to = parseInt(request.body.account_to);
    var amount = parseInt(request.body.amount);
    var account_from = request.session.account_no;
    let sent;
    if (account_to && amount) {
      if (balance > amount) {
        db.get(
          `UPDATE users SET balance = balance + $amount WHERE account_no = $account_to`,
          { $amount: amount, $account_to: account_to },
          function (error, results) {
            console.log(error);
            console.log(results);
          }
        );
        db.get(
          `UPDATE users SET balance = balance - $amount WHERE account_no = $account_from`,
          { $amount: amount, $account_from: account_from },
          function (error, results) {
            sent = "Money Transfered";
            response.render("transfer", {
              sent,
              crsfToken: request.crsfToken,
            });
          }
        );
      } else {
        sent = "You Don't Have Enough Funds.";
        response.render("transfer", { sent, crsfToken: request.crsfToken });
      }
    } else {
      sent = "";
      response.render("transfer", { sent, crsfToken: request.crsfToken });
    }
  } else {
    response.redirect("/");
  }
});

//PATH TRAVERSAL CODE
app.get("/download", function (request, response) {
  if (request.session.loggedin) {
    const file_name = request.session.file_history;
    response.render("download", { file_name });
  } else {
    response.redirect("/");
  }
  response.end();
});

app.post("/download", function (request, response) {
  if (request.session.loggedin) {
    var file_name = request.body.file;

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");

    // Change the filePath to current working directory using the "path" method
    const rootDir = "history_files\\";
    const filePath = path.join(process.cwd(), "/history_files/", file_name);
    const fileName = path.normalize(filePath);
    console.log(filePath);
    try {
      if (fileName.indexOf(rootDir) < 0) {
        response.end(`File not found!`);
      } else {
        const content = fs.readFileSync(filePath, "utf8");
        response.end(content);
      }
    } catch (err) {
      console.log(err);
      response.end("File not found");
    }
  } else {
    response.redirect("/");
  }
  response.end();
});

//XSS CODE
app.get(
  "/public_forum",
  [check("comment").escape()],
  function (request, response) {
    if (request.session.loggedin) {
      db.all(`SELECT username,message FROM public_forum`, (err, rows) => {
        console.log(rows);
        console.log(err);
        response.render("forum", { rows });
      });
    } else {
      response.redirect("/");
    }
    //response.end();
  }
);

app.post("/public_forum", function (request, response) {
  if (request.session.loggedin) {
    var comment = request.body.comment;
    var username = request.session.username;
    if (comment) {
      db.all(
        `INSERT INTO public_forum (username,message) VALUES ($username, $comment)`,
        { $username: username, $comment: comment },
        (err, rows) => {
          console.log(err);
        }
      );
      db.all(`SELECT username,message FROM public_forum`, (err, rows) => {
        console.log(rows);
        console.log(err);
        response.render("forum", { rows });
      });
    } else {
      db.all(`SELECT username,message FROM public_forum`, (err, rows) => {
        console.log(rows);
        console.log(err);
        response.render("forum", { rows });
      });
    }
    comment = "";
  } else {
    response.redirect("/");
  }
  comment = "";
  //response.end();
});

//SQL UNION INJECTION
app.get("/public_ledger", function (request, response) {
  if (request.session.loggedin) {
    var id = request.query.id;
    if (id) {
      db.all(
        `SELECT * FROM public_ledger WHERE from_account = $id`,
        { $id: id },
        (err, rows) => {
          console.log("PROCESSING INPU");
          console.log(err);
          if (rows) {
            response.render("ledger", { rows });
          } else {
            response.render("ledger", { rows });
          }
        }
      );
    } else {
      db.all(`SELECT * FROM public_ledger`, (err, rows) => {
        if (rows) {
          response.render("ledger", { rows });
        } else {
          response.render("ledger", { rows });
        }
      });
    }
  } else {
    response.redirect("/");
  }
  //response.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
