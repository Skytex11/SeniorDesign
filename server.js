const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

// VirusTotal URLs
const FILE_SCAN_URL = 'https://www.virustotal.com/vtapi/v2/file/scan';
const URL_SCAN_URL = 'https://www.virustotal.com/vtapi/v2/url/scan';
const URL_REPORT_URL = 'https://www.virustotal.com/vtapi/v2/url/report';
const FILE_REPORT_URL = 'https://www.virustotal.com/vtapi/v2/file/report';

// Scan URL
app.post('/scan-url', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        const response = await axios.post(URL_SCAN_URL, null, {
            params: {
                apikey: process.env.VIRUSTOTAL_API_KEY,
                url: url,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error scanning URL:', error);
        res.status(500).json({ error: 'Error scanning URL' });
    }
});

// Route: Scan File
app.post('/scan-file', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'File is required' });

    try {
        const response = await axios.post(FILE_SCAN_URL, req.file.buffer, {
            params: {
                apikey: process.env.VIRUSTOTAL_API_KEY,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error scanning file:', error);
        res.status(500).json({ error: 'Error scanning file' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});