import { Shop } from "../models/shopModel.js";
import mongoose from "mongoose";

const getShopData = async (request, response) => {
  const data = await Shop.find({});
  response.status(200).json(data);
};

const updateShopData = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such data!" });
  }
  const data = await Shop.findOneAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  );
  if (!data) {
    return response.status(400).json({ error: "No such data!" });
  }
  response.status(200).json(data);
};

export { getShopData, updateShopData };
