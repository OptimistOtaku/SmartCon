# SmartCon - AI-Powered Blockchain Rent Agreements

SmartCon is a web application that uses blockchain technology and artificial intelligence to create, manage, and verify rental agreements between landlords and tenants. The application leverages QR codes for easy verification and document exchange.

## Features

- **Blockchain-Based Agreements**: Create and manage rental agreements on the blockchain for immutability and transparency
- **QR Code Verification**: Generate and scan QR codes to quickly verify agreements and identities
- **AI Document Analysis**: Automatically extract key information from lease agreements and identity documents
- **Identity Verification**: Secure verification of landlord and tenant identities
- **Beautiful UI**: Modern, responsive user interface built with the T3 stack

## Tech Stack

### Frontend
- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **tRPC**: End-to-end typesafe APIs
- **NextAuth.js**: Authentication for Next.js

### Backend
- **Python**: Backend language
- **Flask**: Web framework
- **Web3.py**: Ethereum interaction
- **PyZbar & OpenCV**: QR code processing
- **Transformers & PyTorch**: AI document analysis

### Blockchain
- **Ethereum**: Smart contract platform
- **Solidity**: Smart contract language

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- Ethereum wallet (MetaMask recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smartcon.git
cd smartcon
```

2. Install frontend dependencies:
```bash
npm install
```

3. Set up the Python backend:
```bash
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# In the root directory
cp .env.example .env
# In the backend directory
cp .env.example .env
```

5. Start the development servers:
```bash
# Start the frontend (from the root directory)
npm run dev

# Start the backend (from the backend directory)
flask run
```

## Usage

1. **Create an Account**: Sign up as a landlord or tenant
2. **Connect Wallet**: Connect your Ethereum wallet
3. **Create Agreement**: Landlords can create new rental agreements
4. **Upload Documents**: Upload identity documents for verification
5. **Generate QR Code**: Share the QR code with the tenant
6. **Scan QR Code**: Tenants can scan the QR code to join the agreement
7. **Sign Agreement**: Both parties sign the agreement digitally
8. **Manage Agreements**: View and manage all your agreements

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [T3 Stack](https://create.t3.gg/)
- [Ethereum](https://ethereum.org/)
- [Hugging Face Transformers](https://huggingface.co/transformers/)
- [OpenZeppelin](https://openzeppelin.com/)
