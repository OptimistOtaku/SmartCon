import os
import torch
from PIL import Image
import numpy as np
from transformers import AutoProcessor, AutoModelForVision2Seq
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Initialize models
def get_document_analysis_model():
    """Get the document analysis model"""
    processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
    model = AutoModelForVision2Seq.from_pretrained("Salesforce/blip-image-captioning-large")
    return processor, model

def get_identity_verification_model():
    """Get the identity verification model"""
    tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
    model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=2)
    return tokenizer, model

# Lazy loading of models
document_analysis_model = None
identity_verification_model = None

def analyze_document(document_file, document_type="lease"):
    """Analyze a document using AI"""
    global document_analysis_model
    
    # Lazy load the model
    if document_analysis_model is None:
        document_analysis_model = get_document_analysis_model()
    
    processor, model = document_analysis_model
    
    # Read the image
    image = Image.open(document_file).convert("RGB")
    
    # Process the image
    inputs = processor(images=image, return_tensors="pt")
    
    # Generate caption
    with torch.no_grad():
        outputs = model.generate(**inputs, max_length=100)
    
    # Decode the caption
    caption = processor.decode(outputs[0], skip_special_tokens=True)
    
    # Analyze based on document type
    if document_type == "lease":
        analysis = analyze_lease_document(caption)
    elif document_type == "id":
        analysis = analyze_id_document(caption)
    else:
        analysis = {"caption": caption, "type": "unknown"}
    
    return analysis

def analyze_lease_document(caption):
    """Analyze a lease document based on its caption"""
    # This is a simplified analysis - in a real application, you would use
    # more sophisticated NLP techniques to extract specific information
    
    analysis = {
        "caption": caption,
        "type": "lease",
        "extracted_info": {}
    }
    
    # Extract property address
    if "address" in caption.lower():
        # Simple extraction - in reality, you'd use NER or regex
        address_idx = caption.lower().find("address")
        if address_idx != -1:
            address_text = caption[address_idx:address_idx+100]
            analysis["extracted_info"]["property_address"] = address_text
    
    # Extract rent amount
    if "rent" in caption.lower():
        rent_idx = caption.lower().find("rent")
        if rent_idx != -1:
            rent_text = caption[rent_idx:rent_idx+50]
            analysis["extracted_info"]["rent_amount"] = rent_text
    
    # Extract lease term
    if "term" in caption.lower() or "duration" in caption.lower():
        term_idx = caption.lower().find("term") if "term" in caption.lower() else caption.lower().find("duration")
        if term_idx != -1:
            term_text = caption[term_idx:term_idx+50]
            analysis["extracted_info"]["lease_term"] = term_text
    
    return analysis

def analyze_id_document(caption):
    """Analyze an ID document based on its caption"""
    analysis = {
        "caption": caption,
        "type": "id",
        "extracted_info": {}
    }
    
    # Extract name
    if "name" in caption.lower():
        name_idx = caption.lower().find("name")
        if name_idx != -1:
            name_text = caption[name_idx:name_idx+50]
            analysis["extracted_info"]["name"] = name_text
    
    # Extract ID number
    if "number" in caption.lower() or "id" in caption.lower():
        id_idx = caption.lower().find("number") if "number" in caption.lower() else caption.lower().find("id")
        if id_idx != -1:
            id_text = caption[id_idx:id_idx+30]
            analysis["extracted_info"]["id_number"] = id_text
    
    # Extract date of birth
    if "birth" in caption.lower() or "dob" in caption.lower():
        dob_idx = caption.lower().find("birth") if "birth" in caption.lower() else caption.lower().find("dob")
        if dob_idx != -1:
            dob_text = caption[dob_idx:dob_idx+30]
            analysis["extracted_info"]["date_of_birth"] = dob_text
    
    return analysis

def verify_identity(id_document, id_type="passport"):
    """Verify an identity document using AI"""
    global identity_verification_model
    
    # Lazy load the model
    if identity_verification_model is None:
        identity_verification_model = get_identity_verification_model()
    
    tokenizer, model = identity_verification_model
    
    # First, analyze the document to extract text
    analysis = analyze_document(id_document, document_type="id")
    
    # In a real application, you would:
    # 1. Extract facial biometrics from the ID
    # 2. Compare with a selfie or live video
    # 3. Check for document tampering
    # 4. Verify with external databases
    
    # For this demo, we'll simulate verification with a simple check
    verification_result = {
        "verified": True,  # In a real app, this would be based on actual verification
        "confidence": 0.95,  # Simulated confidence score
        "extracted_info": analysis["extracted_info"],
        "id_type": id_type,
        "verification_method": "AI document analysis"
    }
    
    return verification_result 