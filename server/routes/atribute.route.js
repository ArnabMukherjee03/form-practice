const {
  addAttribute,
  getAttribute,
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
  }
];

module.exports = router;
