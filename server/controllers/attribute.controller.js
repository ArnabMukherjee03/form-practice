const { where } = require("sequelize");
const { attribute, data, dataattributes, Sequelize } = require("../models");
const error = require("../utils/customError");

const addAttribute = async (req, res) => {
  try {
    console.log(req.payload);
    const { options } = await req.payload;
    const data = await attribute.create({
      ...req.payload,
      options: options.toString(),
    });
    return res.response({ message: "Sucessfully Updated" }).code(201);
  } catch (err) {
    throw error(
      { message: err.message, status: 'failure' },
      err.message
    )
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


const update= async (req,res)=>{
  try {
    const {id,data} = req.payload;

    // console.log(data,id);

    await dataattributes.destroy({
      where: {
        id: { [Sequelize.Op.notIn]: data.map(item => item.id) } ,
        data_id: id
      }
    });

    const promises = [];
    for (const item of data) {
      const existingData = dataattributes.findOne({ where: { id: item.id } });
      promises.push(existingData.then(existing => {
        if (existing) {
          return dataattributes.update(item, { where: { id: item.id } });
        } else {
          const new_item = {
            attribute: item.attribute,
            choosed: item.choosed,
            options: item.options,
            data_id: id
          }
          console.log("new",new_item);
          return dataattributes.create(new_item);
        }
      }));
    }

    await Promise.all(promises);



 
   
      
     return res.response({ message: "Update SucessFully" }).code(200);
  } catch (err) {
    console.log(err);
    throw error(
      { message: err.message, status: 'failure' },
      err.message
    )
  }
}

module.exports = {
  addAttribute,
  getAttribute,
  addData,
  getData,
  deleteData,
  update
};
