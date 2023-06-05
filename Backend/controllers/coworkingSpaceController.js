const asyncHandler = require("express-async-handler");
const CoworkingSpace = require("../models/coworkingSpaceModel");

const postWorkSpaces = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    no_of_seats,
    website_Url,
    images,
    amenties,
    location,
    hours_of_operation,
    facilities,
    plans,
    slug,
    seo,
    brand,
    is_popular,
  } = req.body;

  try {
    const workSpaceData = await CoworkingSpace.create({
      name,
      description,
      no_of_seats,
      website_Url,
      images,
      amenties,
      location,
      hours_of_operation,
      facilities,
      plans,
      slug,
      seo,
      brand,
      is_popular,
    });
    res.json(workSpaceData);
  } catch (error) {
    console.log(error);
  }
});

const getWorkSpaces = asyncHandler(async (req, res) => {
  await CoworkingSpace.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
const editWorkSpaces = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    no_of_seats,
    website_Url,
    images,
    amenties,
    location,
    hours_of_operation,
    facilities,
    plans,
    slug,
    seo,
    brand,
    is_popular,
  } = req.body;
  const { workSpaceId } = req.params;
  CoworkingSpace.findByIdAndUpdate(
    workSpaceId,
    {
      name,
      description,
      no_of_seats,
      website_Url,
      images,
      amenties,
      location,
      hours_of_operation,
      facilities,
      plans,
      slug,
      seo,
      brand,
      is_popular,
    },
    { new: true }
  )
    .then(() => res.send("updated successfully"))
    .catch((err) => {
      console.log(err);
      res.send({
        error: err,
      });
    });
});
const deleteWorkSpaces = asyncHandler(async (req, res) => {
  const { workSpaceId } = req.params;
  await CoworkingSpace.findByIdAndDelete(workSpaceId)
    .then(() => {
      res.send("delete successfully");
    })
    .catch((err) => {
      res.send({
        error: err,
      });
    });
});

module.exports = {
  postWorkSpaces,
  editWorkSpaces,
  deleteWorkSpaces,
  getWorkSpaces,
};
