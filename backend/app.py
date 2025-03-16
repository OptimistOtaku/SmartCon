from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
from web3 import Web3
from blockchain import deploy_contract, get_contract, create_agreement, verify_agreement
from ai_processor import analyze_document, verify_identity
from qr_handler import generate_qr_code, scan_qr_code

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Web3 connection
INFURA_URL = os.getenv("INFURA_URL", "https://sepolia.infura.io/v3/your-infura-key")
web3 = Web3(Web3.HTTPProvider(INFURA_URL))

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "blockchain_connected": web3.is_connected()})

@app.route('/api/deploy-contract', methods=['POST'])
def deploy_smart_contract():
    """Deploy a new smart contract for rent agreement"""
    try:
        data = request.json
        private_key = data.get('private_key')
        
        contract_address = deploy_contract(web3, private_key)
        return jsonify({"success": True, "contract_address": contract_address})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/create-agreement', methods=['POST'])
def create_rent_agreement():
    """Create a new rent agreement on the blockchain"""
    try:
        data = request.json
        contract_address = data.get('contract_address')
        landlord_address = data.get('landlord_address')
        tenant_address = data.get('tenant_address')
        property_details = data.get('property_details')
        rent_amount = data.get('rent_amount')
        duration = data.get('duration')
        private_key = data.get('private_key')
        
        # Create agreement on blockchain
        tx_hash = create_agreement(
            web3, 
            contract_address, 
            landlord_address, 
            tenant_address, 
            property_details, 
            rent_amount, 
            duration, 
            private_key
        )
        
        # Generate QR code for the agreement
        qr_data = {
            "contract_address": contract_address,
            "agreement_id": tx_hash,
            "landlord": landlord_address,
            "tenant": tenant_address
        }
        qr_code_path = generate_qr_code(json.dumps(qr_data))
        
        return jsonify({
            "success": True, 
            "transaction_hash": tx_hash,
            "qr_code_path": qr_code_path
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/verify-agreement', methods=['POST'])
def verify_rent_agreement():
    """Verify a rent agreement using QR code"""
    try:
        if 'qr_image' not in request.files:
            return jsonify({"success": False, "error": "No QR code image provided"}), 400
            
        qr_image = request.files['qr_image']
        qr_data = scan_qr_code(qr_image)
        
        if not qr_data:
            return jsonify({"success": False, "error": "Invalid QR code"}), 400
            
        qr_json = json.loads(qr_data)
        contract_address = qr_json.get('contract_address')
        agreement_id = qr_json.get('agreement_id')
        
        # Verify agreement on blockchain
        agreement_data = verify_agreement(web3, contract_address, agreement_id)
        
        return jsonify({
            "success": True,
            "agreement_data": agreement_data
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/analyze-document', methods=['POST'])
def analyze_document_endpoint():
    """Analyze a document using AI"""
    try:
        if 'document' not in request.files:
            return jsonify({"success": False, "error": "No document provided"}), 400
            
        document = request.files['document']
        document_type = request.form.get('document_type', 'lease')
        
        analysis_result = analyze_document(document, document_type)
        
        return jsonify({
            "success": True,
            "analysis": analysis_result
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/verify-identity', methods=['POST'])
def verify_identity_endpoint():
    """Verify identity document using AI"""
    try:
        if 'id_document' not in request.files:
            return jsonify({"success": False, "error": "No ID document provided"}), 400
            
        id_document = request.files['id_document']
        id_type = request.form.get('id_type', 'passport')
        
        verification_result = verify_identity(id_document, id_type)
        
        return jsonify({
            "success": True,
            "verification": verification_result
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.getenv('PORT', 5000))) 