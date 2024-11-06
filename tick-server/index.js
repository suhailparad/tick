const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/hello', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/greet', (req, res) => {
  res.send('Good evening...!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});