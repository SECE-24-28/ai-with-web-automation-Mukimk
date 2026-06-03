# 🌿 Plant Leaf Disease Detection & Recommendation System

## 📖 Project Overview

This is a production-ready full-stack web application designed to detect plant leaf diseases using a pre-trained TensorFlow/Keras `.h5` model. It provides disease-specific recommendations without relying on external APIs. 

The system allows users to upload an image of a plant leaf, predicts the disease using the trained machine learning model, and displays comprehensive information including the disease description, causes, symptoms, prevention methods, and treatment recommendations. The recommendation engine is completely local and file-driven.

---

## ✨ Features

- **Upload & Analyze**: Users can upload a leaf image via drag-and-drop or file selection.
- **Disease Prediction**: Utilizes a deep learning model to classify the disease into one of 38 categories.
- **Confidence Scoring**: Displays the model's confidence level for the prediction.
- **Local Recommendation Engine**: Provides detailed disease information (description, causes, symptoms, treatments, prevention, and severity) entirely offline using local data.
- **Modern UI/UX**: Clean, responsive, and agriculture-focused design with an intuitive user interface.
- **Robust Error Handling**: Gracefully handles invalid images, corrupted files, and missing information.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management / Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **Machine Learning**: TensorFlow / Keras
- **Image Processing**: Pillow (PIL), NumPy
- **Data Validation**: Pydantic
- **Server**: Uvicorn

---

## 🏗️ Application Architecture

The application follows a clean Service Layer Architecture to ensure scalability and separation of concerns.

```text
Frontend (React)
        │
        ▼
FastAPI API Layer
        │
 ┌──────┼──────────┐
 │      │          │
 ▼      ▼          ▼

Prediction Service
Recommendation Service
Image Processing Service

        │
        ▼

TensorFlow .h5 Model
```

### Architecture Layers
- **Route Layer**: Handles HTTP requests, validation, and response generation.
- **Service Layer**: Manages core business logic (prediction, image processing, recommendation retrieval).
- **Data Layer**: Responsible for loading local disease information (`disease_info.json`).

---

## 📂 Project Structure

```text
plant-disease-detection/
│
├── frontend/                   # React Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── api/                # API communication (Axios)
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Application pages (Home, About)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # Frontend services
│   │   ├── App.jsx             # Root component
│   │   └── main.jsx            # Entry point
│
├── backend/                    # FastAPI Backend Application
│   ├── app/
│   │   ├── api/v1/             # API Route Handlers
│   │   ├── core/               # Configuration & Constants
│   │   ├── services/           # Business Logic (Model, Image, Recommendations)
│   │   ├── schemas/            # Pydantic Models for Validation
│   │   ├── models/             # TensorFlow Model (.h5)
│   │   ├── data/               # Local JSON database (disease_info.json)
│   │   └── main.py             # FastAPI Entry Point
│
├── requirements.txt            # Python Dependencies
└── .env                        # Environment Variables
```

---

## 🧠 Model Information

The core of the detection system is a trained TensorFlow/Keras model (`best_model.h5`). 

- **Input**: Preprocessed RGB images resized to the model's required dimensions.
- **Output**: Predicts among **38 distinct classes** of plant leaves (healthy and diseased).

<details>
<summary><b>View Supported Plant & Disease Classes (38 Classes)</b></summary>

1. Apple: Apple scab, Black rot, Cedar apple rust, Healthy
2. Blueberry: Healthy
3. Cherry: Powdery mildew, Healthy
4. Corn: Cercospora leaf spot, Common rust, Northern Leaf Blight, Healthy
5. Grape: Black rot, Esca (Black Measles), Leaf blight, Healthy
6. Orange: Haunglongbing (Citrus greening)
7. Peach: Bacterial spot, Healthy
8. Pepper (bell): Bacterial spot, Healthy
9. Potato: Early blight, Late blight, Healthy
10. Raspberry: Healthy
11. Soybean: Healthy
12. Squash: Powdery mildew
13. Strawberry: Leaf scorch, Healthy
14. Tomato: Bacterial spot, Early blight, Late blight, Leaf Mold, Septoria leaf spot, Spider mites, Target Spot, Tomato Yellow Leaf Curl Virus, Tomato mosaic virus, Healthy

</details>

### Image Processing Pipeline
Before inference, the image goes through:
1. File type & size validation.
2. Conversion to RGB & Resizing.
3. Pixel value normalization.
4. Conversion to NumPy array & dimension expansion.

---

## 🔌 Backend API Documentation

### 1. Health Check
```http
GET /api/v1/health
```
**Response**: `{"status": "healthy"}`

### 2. Predict Disease
```http
POST /api/v1/predict
```
**Input**: `multipart/form-data` containing the `image` file.
**Response**:
```json
{
  "predicted_class": "Tomato___Late_blight",
  "confidence": 98.45
}
```

### 3. Get Disease Information
```http
GET /api/v1/recommendation/{disease_name}
```
**Response**: Detailed JSON object containing description, symptoms, treatments, etc.

### 4. Complete Analysis (Combined Endpoint)
```http
POST /api/v1/analyze
```
**Workflow**: Uploads image -> Predicts -> Retrieves Info -> Returns Combined Data.

---

## 🎨 UI & Design

The frontend is built with a focus on an agriculture-friendly theme:
- **Primary Color**: `#2E7D32` (Forest Green)
- **Secondary Color**: `#4CAF50` (Leaf Green)
- **Background**: `#F8FFF8` (Mint White)
- **Text**: `#1B1B1B` (Dark Gray)

### Key UI Components
- **Upload Component**: Supports drag-and-drop and click-to-upload with image preview and loading states.
- **Prediction Result Card**: Highlights the predicted disease, confidence score, and plant type.
- **Recommendation Section**: Structured layout for detailed symptoms, causes, treatments, and preventative measures.



