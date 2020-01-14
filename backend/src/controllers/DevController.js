const Dev = require("../models/User");
const axios = require("axios");
const parceStringAsArray = require("../util/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parceStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  },
  async update(req, res) {
    const { github_username } = req.params;
    const { techs, bio } = req.body;
    const techsArray = parceStringAsArray(techs);

    let dev = await Dev.findByIdAndUpdate(
      { github_username },
      { $set: { bio, techs: techsArray } },
      { upsert: true }
    );

    if (!dev) return res.json({ message: "user not found" });
  },
  async destroy(req, res) {
    const { github_username } = req.params;

    const dev = await Dev.findOne({ github_username });

    if (!dev) return res.json({ message: "user not found" });

    await Dev.deleteOne({ _id: dev._id });

    return res.json({ message: "user deleted success" });
  }
};
