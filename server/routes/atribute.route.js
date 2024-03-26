const {
  addAttribute,
  getAttribute,
  addData,
  getData,
  deleteData,
} = require("../controllers/attribute.controller");


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
  }
];

module.exports = router;
