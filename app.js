const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET ALL TOURS FUNCTION
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// GET TOUR FUNCTION
const getTour = (req, res) => {
  const id = req.params.id * 1; // Converts the numberlike string to number

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// CREATE TOUR FUNCTION
const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// UPDATE TOUR FUNCTION
const updateTour = (req, res) => {
  const id = req.params.id * 1; // Converts the numberlike string to number
  const tour = tours.find((el) => el.id === id);

  if (req.params.id > tours.length) {
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

// DELETE TOUR FUNCTION
const deleteTour = (req, res) => {
  const id = req.params.id * 1; // Converts the numberlike string to number
  const tour = tours.find((el) => el.id === id);

  if (req.params.id > tours.length) {
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
  }

  res.status(204).json({
    status: 'success',
    message: null,
  });
};

// GET ALL TOURS
app.get('/api/v1/tours', getAllTours);

// GET TOUR BY ID
app.get('/api/v1/tours/:id', getTour);

// CREATE NEW TOUR (POST)
app.post('/api/v1/tours', createTour);

// UPDATE POST (PATCH)
app.patch('/api/v1/tours/:id', updateTour);

// DELETE TOUR
app.delete('/api/v1/tours/:id', deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
