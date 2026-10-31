/**
 * MAWU CREATIVES — PRODUCTION WEB & API SERVER
 * Serves static pages and provides secure endpoint for enquiry submissions.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ENQUIRIES_FILE = path.join(__dirname, 'enquiries.json');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Mawu Creatives Web Server',
    timestamp: new Date().toISOString()
  });
});

// Enquiry Submission Endpoint
app.post('/api/enquiry', (req, res) => {
  const { name, business, phone, email, service, budget, description, contactMethod } = req.body;

  if (!name || !phone || !service || !description) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields (name, phone, service, or description).'
    });
  }

  const newEnquiry = {
    id: 'ENQ-' + Date.now(),
    name: String(name).slice(0, 100),
    business: String(business || 'N/A').slice(0, 100),
    phone: String(phone).slice(0, 30),
    email: String(email || 'N/A').slice(0, 100),
    service: String(service).slice(0, 100),
    budget: String(budget || 'Flexible').slice(0, 50),
    description: String(description).slice(0, 2000),
    contactMethod: String(contactMethod || 'WhatsApp').slice(0, 30),
    submittedAt: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress
  };

  try {
    let enquiries = [];
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const data = fs.readFileSync(ENQUIRIES_FILE, 'utf8');
      enquiries = JSON.parse(data || '[]');
    }
    enquiries.unshift(newEnquiry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2));

    console.log(`[ENQUIRY] Received new lead from ${newEnquiry.name} (${newEnquiry.service})`);

    return res.status(200).json({
      success: true,
      message: 'Enquiry successfully logged. Directing to WhatsApp...',
      enquiryId: newEnquiry.id
    });
  } catch (err) {
    console.error('Error saving enquiry:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to save enquiry at this time.'
    });
  }
});

// Fallback route for SPA or root
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`Mawu Creatives Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`=========================================`);
});

