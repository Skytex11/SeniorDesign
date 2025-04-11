const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; ///change when you want for local
const apiKey = process.env.VIRUSTOTAL_API_KEY;

if (!apiKey) {
  console.error('Missing VirusTotal API key! Check your .env file.');
  process.exit(1);
}

console.log('VirusTotal API Key loaded successfully');



app.use(cors());
app.use(express.json());
const pool = require('./db');


const storage = multer.memoryStorage(); 
const upload = multer({ storage });
app.use(express.static('public_html')); // Serves static files


// VirusTotal URLs
const FILE_SCAN_URL = 'https://www.virustotal.com/vtapi/v2/file/scan';
const URL_SCAN_URL = 'https://www.virustotal.com/vtapi/v2/url/scan';
const URL_REPORT_URL = 'https://www.virustotal.com/vtapi/v2/url/report';
const FILE_REPORT_URL = 'https://www.virustotal.com/vtapi/v2/file/report';





// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public_html/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public_html/about.html');
  });


app.get('/learn', (req, res) => {
res.sendFile(__dirname + '/public_html/learn.html');
});


app.get('/quiz', (req, res) => {
res.sendFile(__dirname + '/public_html/quiz.html');
});


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


// Handle multiple files
app.post('/scan-files', upload.single('file'), async (req, res) => {
    if (!req.files) {
        return res.status(400).json({ error: 'No files were uploaded' });
    }

    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname); 

    try {
        const response = await axios.post('https://www.virustotal.com/api/v3/files', formData, {
            headers: {
                'x-apikey': process.env.VIRUSTOTAL_API_KEY,
                ...formData.getHeaders(), 
            },
        });

        res.json(response.data); 
    } catch (error) {
        console.error('Error scanning file:', error);
        res.status(500).json({ error: 'Error scanning file' });
    }
});







app.get('/test-db', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.json({ message: 'Database connected!', time: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });



// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});