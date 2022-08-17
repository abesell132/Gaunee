const Tenant = require("../../models/Tenant");
const Unit = require("../../models/Unit");

module.exports = {
  deleteTenants: (tenantIDs) =>
    new Promise(async (resolve, reject) => {
      try {
        await Tenant.deleteMany({
          _id: {
            $in: tenantIDs,
          },
        });

        await Unit.updateMany({}, { $pull: { tenants: { $in: tenantIDs } } }, { multi: true });

        await resolve();
      } catch (e) {
        await reject(e);
      }
    }),
};
