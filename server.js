const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(express.static('public'));

// app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('startseite');
});

app.get('/startseite', (req, res) => {
  res.render('startseite');
});

app.get('/loginformular', (req, res) => {
  res.render('loginformular');
});

app.get('/gallery', (req, res) => {
  res.render('gallery');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.listen(3000, () => {
  console.log('Application listening on port 3000!');
});

app.use(express.urlencoded({ extended: true })); // bodyParser deprecated
app.use(express.json());

app.post('/login', (req, res) => {
  const name = req.body['name'];
  const passwort = req.body['passwort'];

  db.all(`SELECT * FROM users`, (err, rows) => {
    if (
      users.some((user) => user.name === name && user.passwort === passwort)
    ) {
      res.render('loginauswertung', {
        loginergebnis: 'Login erfolgreich!',
        name: req.body['name'],
        passwort: req.body['passwort'],
      });
    } else {
      res.render('loginauswertung', {
        loginergebnis: 'Login fehlgeschlagen!',
      });
    }
  });
});

app.get('/loginauswertung', (req, res) => {
  res.render('loginauswertung.ejs');
});

// create database
let db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to users.db');
});

db.serialize(() => {
  // 1st operation (run create table statement)
  db.run(
    'CREATE TABLE IF NOT EXISTS users(name text, password text)',
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );

  // 2nd operation (insert into users table statement)
  db.run(
    `INSERT INTO users(name,password)
              VALUES('Alice','§$Y45/912v'),
                    ('Bob','secret'),
                    ('Carla','123'),
                    ('David','divaD'),
                    ('miri','123'),
                    ('enton','54')`,
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});

// Close connection with database
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close connection to database');
});
