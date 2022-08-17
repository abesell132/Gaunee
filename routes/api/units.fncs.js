const mongoose = require("mongoose");
const Unit = require("../../models/Unit");
const Property = require("../../models/Property");

const { deleteLeases } = require("./leases.fncs");

module.exports = {
  deleteUnits: (unitIDs) =>
    new Promise(async (resolve, reject) => {
      try {
        if (typeof unitIDs === "string") unitIDs = [unitIDs];

        for (let unitID of unitIDs) {
          let unit = await Unit.findOne({ _id: mongoose.Types.ObjectId(unitID) })
            .populate("tenants")
            .populate({
              path: "tenants",
              populate: {
                path: "leases",
                model: "leases",
              },
            });

          for (let tenant of unit.tenants) {
            let leases = tenant.leases;
            await deleteLeases(leases);
          }
        }

        await Unit.deleteMany({
          _id: {
            $in: unitIDs,
          },
        });

        await Property.updateMany({}, { $pull: { units: { $in: unitIDs } } }, { multi: true });

        await resolve();
      } catch (e) {
        await reject(e);
      }
    }),
};
