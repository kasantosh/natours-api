const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

/////////// BASICS ////////////
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server side',
//     app: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint...');
// });
/////////// BASICS END ////////////

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send('Done');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
