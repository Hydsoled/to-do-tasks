const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const Task = require('./models/task')

mongoose.connect('mongodb+srv://hydsoled:App123@cluster0.pfyqe.mongodb.net/crocobet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(express.static('dist/to-do-project'))
app.use(bodyParser.json())

app.post('/api/saveTask', async (req, res) => {
  const task = req.body
  const body = await new Promise((resolve, reject) => {
    new Task(
      {user: task.user, status: task.status, dueDate: task.date}
    ).save((error,body) => {
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

app.post("/api/updateTask", (req, res) => {
  res.send('ok');
})

app.get('/api/getTasks', async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
})

app.listen(4200, () => {
  console.log('listening to http://localhost:4200');
});
