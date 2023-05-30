const asyncHandler = require("express-async-handler");
const SEO = require("../models/seoModel");

const getSeo = asyncHandler(async (req, res) => {
  SEO.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
const postSeo = asyncHandler(async (req, res) => {
  const {
    title,
    page_title,
    script,
    description,
    robots,
    keywords,
    url,
    status,
    path,
    footer_title,
    footer_description,
    twitter,
    open_graph,
  } = req.body;
  try {
    const seoData = await SEO.create({
      title,
      page_title,
      script,
      description,
      robots,
      keywords,
      url,
      status,
      path,
      footer_title,
      footer_description,
      twitter,
      open_graph,
    });
    res.json(seoData);
  } catch (error) {
    console.log(error);
  }
});
const addOrEditSeo = asyncHandler(async (req, res) => {
  const {
    title,
    page_title,
    script,
    description,
    robots,
    keywords,
    url,
    status,
    path,
    footer_title,
    footer_description,
    twitter,
    open_graph,
  } = req.body;
  const { seoId } = req.params;
  SEO.findByIdAndUpdate(
    seoId,
    {
      title,
      page_title,
      script,
      description,
      robots,
      keywords,
      url,
      status,
      path,
      footer_title,
      footer_description,
      twitter,
      open_graph,
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
const deleteSeo = asyncHandler(async (req, res) => {
  const { seoId } = req.params;
  await SEO.findByIdAndDelete(seoId)
    .then(() => {
      res.send("delete successfully");
    })
    .catch((err) => {
      res.send({
        error: err,
      });
    });
});

module.exports = { getSeo, postSeo, addOrEditSeo, deleteSeo };
