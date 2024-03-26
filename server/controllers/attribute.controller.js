const { attribute } = require("../models");

const addAttribute = async (req, res) => {
  try {
    console.log(req.payload);
    const {options} = await req.payload;
    const data = await attribute.create({...req.payload,options:options.toString()});
    return res.response({ message: "Sucessfully Updated" }).code(201);
  } catch (error) {
    console.log(error);
  }
};

const getAttribute = async (req, res) => {
  try {
    const data = await attribute.findAll({});
    return res.response(data).code(200);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addAttribute,
  getAttribute,
};
