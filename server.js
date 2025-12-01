require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mapRoutes = require('./src/routes/mapRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "https://marselinusnaisau.github.io/frontend-gis",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());

app.use('/api/locations', mapRoutes);

app.get('/', (req, res) => {  
    res.send('Server Backend Leaflet Jalan 🚀');
});

app.listen(PORT, () => {
    console.log(`Server Berjalan di http://localhost:${PORT}`);
});
