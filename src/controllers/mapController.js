const prisma = require("../config/db.config");

exports.createLocation = async (req, res) => {
  const { name, description, latitude, longitude, category } = req.body;

  try {
    if (!name || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Nama, Latitude, dan Longitude wajib diisi!",
      });
    }

    const newLocation = await prisma.location.create({
      data: {
        name: name,
        description: description || "",

        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        category: category || "umum",
      },
    });

    res.status(201).json({
      success: true,
      message: "Lokasi berhasil ditambahkan",
      data: newLocation,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      total: locations.length,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getLocationById = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await prisma.location.findUnique({
      where: { id: parseInt(id) },
    });

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Lokasi tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, description, latitude, longitude, category } = req.body;

  try {
    const updatedLocation = await prisma.location.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,

        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        category,
      },
    });

    res.status(200).json({
      success: true,
      message: "Lokasi berhasil diupdate",
      data: updatedLocation,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, message: "ID tidak ditemukan" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.location.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: "Lokasi berhasil dihapus",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, message: "ID tidak ditemukan" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};
