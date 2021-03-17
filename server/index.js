const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Task = require('./models/task');

mongoose.connect('mongodb+srv://hydsoled:App123@cluster0.pfyqe.mongodb.net/crocobet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(express.static('dist/to-do-project'))
app.use(bodyParser.json());
// app.use(cors());

app.post('/api/saveTask', async (req, res) => {
  const task = req.body
  const body = await new Promise((resolve, reject) => {
    new Task(
      {user: task.user, status: task.status, dueDate: task.date}
    ).save((error, body) => {
      if (error) {
        console.log('error in insert data', error)
        reject(error);
      }
      resolve(body);
    });
  })
  console.log(body);
  res.json(body);
});

app.post("/api/updateTask", async (req, res) => {
  const task = req.body;
  const query = {_id: task._id};
  const update = {
    $set: {
      _id: task._id,
      user: task.user,
      status: task.status,
      date: task.date
    }
  };
  await Task.updateOne(query, update)
  res.status(200).send(true);
});

app.post('/api/deleteTask', async (req, res) => {
  const query = {_id: req.body._id};
  Task.deleteOne(query).then((val) => {
    res.status(200).send(true);
  }).catch(err => {
    res.status(200).send(false);
  });
})

app.get('/api/getTasks', async (req, res) => {
  console.log('hey');
  const tasks = await Task.find({});
  res.json(tasks);
})

app.listen(4200, () => {
  console.log('listening to http://localhost:4200');
});
