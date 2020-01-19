const Dev = require("../models/User");
const parceStringAsArray = require("../util/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    console.log(latitude + longitude);

    const techsArray = parceStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });
    console.log(devs);

    return res.json({ devs });
  }
};
