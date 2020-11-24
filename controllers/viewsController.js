const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {

  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build the template

  // 3) Render the template using tour data from 1)


    res.status(200).render('overview', {
      tours: tours
    });
  });

  exports.getTour = catchAsync(async (req, res, next) => {
    //  Get the data for the requested tour (including reviews & Guides)
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review raing user'
    });
    console.log(tour);

    res.status(200).render('tour', {
      title: tour.name,
      tour
    });
  });