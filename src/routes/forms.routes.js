const { Router } = require("express");
const { getServiceType, getBuissnes } = require("../controllers/formSelects.controller.js")

const router = Router();

router.get('/serviceType', getServiceType);

router.get('/buissnes', getBuissnes);

module.exports = router;