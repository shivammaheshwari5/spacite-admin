const mongoose = require("mongoose");

const brandModel = mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: String,
    order: { type: Number, default: 0 },
    should_show_on_home: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["coworking", "virtual office", "officespace"],
      default: "coworking",
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    cities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
      },
    ],
    slug: String,
    seo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SEO",
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandModel);
module.exports = Brand;
