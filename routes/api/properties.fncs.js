const Property = require("../../models/Property");
const mongoose = require("mongoose");
const { deleteUnits } = require("./units.fncs");

module.exports = {
  deleteProperties: (propertyIDs) =>
    new Promise(async (resolve, reject) => {
      try {
        if (typeof propertyIDs === "string") propertyIDs = [propertyIDs];

        for (let propertyID of propertyIDs) {
          let property = await Property.findOne({ _id: mongoose.Types.ObjectId(propertyID) }).populate("units");

          for (let unit of property.units) {
            await deleteUnits(unit.id);
          }
        }

        await Property.deleteMany({ _id: { $in: propertyIDs } });

        resolve();
      } catch (e) {
        reject(e);
      }
    }),
};
