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
  try {
    const coworkingSpace = await CoworkingSpace.find()
      .populate("location.country", "name")
      .populate("location.state", "name")
      .populate("location.city", "name")
      .populate("location.micro_location", "name")
      .populate("plans.category", "name")
      .populate("brand", "name")
      .populate("amenties", "name")
      .exec();

    if (!coworkingSpace) {
      return res.status(404).json({ message: "Coworking space not found" });
    }

    res.json(coworkingSpace);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
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
    plans,
    slug,
    seo,
    brand,
    is_popular,
  } = req.body;
  const { workSpaceId } = req.params;
  await CoworkingSpace.findByIdAndUpdate(
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

const getWorkSpacesById = asyncHandler(async (req, res) => {
  try {
    const workSpace = await CoworkingSpace.findById(req.params.workSpaceId)
      // .populate("location.country", "name")
      // .populate("location.state", "name")
      // .populate("location.city", "name")
      // .populate("location.micro_location", "name")
      // .populate("plans.category", "name")
      // .populate("brand", "name")
      // .populate("amenties", "name")
      .exec();
    res.status(200).json(workSpace);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  postWorkSpaces,
  editWorkSpaces,
  deleteWorkSpaces,
  getWorkSpaces,
  getWorkSpacesById,
};
