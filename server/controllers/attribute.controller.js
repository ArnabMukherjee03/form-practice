const { where } = require("sequelize");
const { attribute, data, dataattributes } = require("../models");

const addAttribute = async (req, res) => {
  try {
    console.log(req.payload);
    const { options } = await req.payload;
    const data = await attribute.create({
      ...req.payload,
      options: options.toString(),
    });
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

const addData = async (req, res) => {
  try {
    const { model, attributes } = req.payload;
    const user = await data.create({ model: model });
    const Updated = attributes.map((attribute) => ({
      ...attribute,
      data_id: user.dataValues.id,
    }));

    await dataattributes.bulkCreate(Updated);
    return res.response({ message: "Sucessfully Updated" }).code(201);
  } catch (error) {
    console.log(error);
  }
};

const getData = async (req, res) => {
  try {
    const datas = await data.findAll({
      include: [
        {
          model: dataattributes,
        },
      ],
    });
    return res.response(datas).code(200);
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, res) => {
  try {
    await data.destroy({ where: {
      id: req.params.id
    } });
    return res.response({ message: "Deleted SucessFully" }).code(200);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addAttribute,
  getAttribute,
  addData,
  getData,
  deleteData
};
