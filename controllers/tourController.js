const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// GET ALL TOURS FUNCTION
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    reqestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// GET TOUR FUNCTION
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
