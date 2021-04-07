const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = {
  path: `${__dirname}/db.json`,
  check() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify({ users: [] }));
    }
  },
  read() {
    return JSON.parse(fs.readFileSync(this.path));
  },
  write({ users }) {
    fs.writeFileSync(this.path, JSON.stringify({ users: users }));
  },
};

db.check();

app.get('/', (req, res) => {
  console.log('Get request to main route ');
  res.status(200).send('Home Page');
});

app.get('/users', (req, res) => {
  let data = db.read();

  res.json(data);
});

app.post('/insert', (req, res) => {
  const user = req.body;
  const data = db.read();

  console.log(user);

  data.users.push(user);

  db.write(data);

  res.json({
    ok: true,
  });
});

app.listen(5000, () => {
  console.log('Server is listening port 5000');
});
