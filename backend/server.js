const express = require('express');
const cors = require('cors');
const { create } = require('xmlbuilder2');
const { Parser } = require('json2csv');

const app = express();
const port = 8000;

// Middleware
app.use(cors());  // Allow all origins in development
app.use(express.json({ limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    headers: req.headers
  });
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      error: 'Invalid JSON format: ' + err.message
    });
  }
  res.status(500).json({
    status: 'error',
    error: 'Internal server error: ' + err.message
  });
});

// Utility functions
const validateJSON = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: e.message };
  }
};

// Routes
app.post('/api/beautify', (req, res) => {
  try {
    if (!req.body || !req.body.data) {
      return res.status(400).json({
        status: 'error',
        error: 'No data provided'
      });
    }

    const { data } = req.body;
    
    // Validate JSON
    try {
      const parsed = JSON.parse(data);
      const beautified = JSON.stringify(parsed, null, 2);
      return res.json({ 
        status: 'success', 
        data: beautified 
      });
    } catch (error) {
      return res.status(400).json({ 
        status: 'error', 
        error: 'Invalid JSON: ' + error.message 
      });
    }
  } catch (error) {
    return res.status(400).json({ 
      status: 'error', 
      error: error.message 
    });
  }
});

app.post('/api/convert/xml', (req, res) => {
  try {
    const { data } = req.body;
    const parsed = JSON.parse(data);
    const xml = create({ root: parsed }).end({ prettyPrint: true });
    res.json({ status: 'success', data: xml });
  } catch (error) {
    res.json({ status: 'error', error: error.message });
  }
});

app.post('/api/convert/csv', (req, res) => {
  try {
    const { data } = req.body;
    const parsed = JSON.parse(data);
    
    // Handle both array of objects and single object
    const jsonData = Array.isArray(parsed) ? parsed : [parsed];
    
    // Get fields from the first object
    const fields = Object.keys(jsonData[0]);
    const parser = new Parser({ fields });
    const csv = parser.parse(jsonData);
    
    res.json({ status: 'success', data: csv });
  } catch (error) {
    res.json({ status: 'error', error: error.message });
  }
});

app.post('/api/validate', (req, res) => {
  try {
    const { data } = req.body;
    const result = validateJSON(data);
    if (result.valid) {
      res.json({ status: 'success', data: 'JSON is valid' });
    } else {
      res.json({ status: 'error', error: result.error });
    }
  } catch (error) {
    res.json({ status: 'error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 