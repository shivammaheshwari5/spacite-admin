const asyncHandler = require("express-async-handler");

const builderTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Please enter message!");
  }

  const user = await Message.create({
    title,
  });
});
