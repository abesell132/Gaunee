const mongoose = require("mongoose");
const Lease = require("../../models/Lease");
const Tenant = require("../../models/Tenant");

module.exports = {
  deleteLeases: (leaseIDs) =>
    new Promise(async (resolve, reject) => {
      try {
        await Lease.deleteMany({
          _id: {
            $in: leaseIDs,
          },
        });

        await Tenant.updateMany({}, { $pull: { leases: { $in: leaseIDs } } }, { multi: true });

        await resolve();
      } catch (e) {
        await reject(e);
      }
    }),
};
