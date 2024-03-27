const {
  addAttribute,
  getAttribute,
  addData,
  getData,
  deleteData,
  deleteAttribute,
  addDataAttribute,
  updateAttribute,
} = require("../controllers/attribute.controller");
const Joi = require("joi");
const error = require("../utils/customError");

const schema = Joi.object({
  attribute: Joi.string().required().messages({
      'any.required': 'Attribute is required.'
  })
});

const router = [
  {
    method: "GET",
    path: "/",
    options: {
      handler: (req, res) => {
        return res.response({ name: "Hello" }).code(200);
      },
    },
  },
  {
    method: "POST",
    path: "/attrubutes/add",
    options: {
      handler: addAttribute,
      validate: {
        payload: Joi.object({
          attribute: Joi.string().required().messages({
            'any.required': 'Attribute is required.'
          }),
          options: Joi.allow(),
          type: Joi.allow()
        }),
        failAction: (request, h, err) => {
          const details = err.details
          console.log(details);
          throw error(
            { message: details[0].message, status: 'failure' },
            details[0].message
          )
        }
      }
    },
  },
  {
    method: "GET",
    path: "/attrubutes/get",
    options: {
      handler: getAttribute,
    },
  },
  {
    method: "POST",
    path: "/data/add",
    options: {
      handler: addData,
    },
  },
  {
    method: "GET",
    path: "/data/get",
    options: {
      handler: getData,
    }},
    {
      method: "DELETE",
      path: "/data/delete/{id}",
      options: {
        handler: deleteData,
      }
  },
  {
    method: "PUT",
    path: "/dataattribute/delete",
    options: {
      handler: deleteAttribute,
    }
},
,{
  method: "PUT",
  path: "/dataattribute/update",
  options: {
    handler: updateAttribute,
  }
}
];

module.exports = router;
