# SmartCon Backend

This is the backend for the SmartCon application, an AI-powered blockchain-based web application for rent agreements using QR code scanning.

## Features

- Smart contract deployment and interaction
- QR code generation and scanning
- AI-powered document analysis
- Identity verification
- RESTful API for frontend integration

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# Copy the example .env file
cp .env.example .env
# Edit the .env file with your own values
```

5. Run the application:
```bash
flask run
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Deploy Contract
```
POST /api/deploy-contract
{
  "private_key": "your-private-key"
}
```

### Create Agreement
```
POST /api/create-agreement
{
  "contract_address": "0x...",
  "landlord_address": "0x...",
  "tenant_address": "0x...",
  "property_details": "123 Main St, Apt 4B, New York, NY 10001",
  "rent_amount": 1500,
  "duration": 12,
  "private_key": "your-private-key"
}
```

### Verify Agreement
```
POST /api/verify-agreement
Form data:
- qr_image: [File]
```

### Analyze Document
```
POST /api/analyze-document
Form data:
- document: [File]
- document_type: "lease" (default) or "id"
```

### Verify Identity
```
POST /api/verify-identity
Form data:
- id_document: [File]
- id_type: "passport" (default), "driver_license", etc.
```

## Smart Contract

The smart contract is a simple rent agreement contract that allows:
- Creating rent agreements
- Retrieving agreement details
- Updating agreement status

## Technologies Used

- Flask: Web framework
- Web3.py: Ethereum interaction
- PyZbar & OpenCV: QR code processing
- Transformers & PyTorch: AI document analysis
- Python-Jose: JWT authentication 