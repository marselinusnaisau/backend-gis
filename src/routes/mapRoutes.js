const express = require("express");
const router = express.Router();
const mapController = require("../controllers/mapController");

router.post("/", mapController.createLocation);
router.get("/", mapController.getAllLocations);
router.get("/:id", mapController.getLocationById);
router.put("/:id", mapController.updateLocation);
router.delete("/:id", mapController.deleteLocation);

module.exports = router;
