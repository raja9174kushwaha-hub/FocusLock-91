# FocusLock AI - System Requirements

This document outlines the necessary software, libraries, and services required to build and deploy the FocusLock AI application.

## 1. Deployment Environment

To run this application in a containerized environment, you will need the following software installed on your VM or local machine:

- **Docker**: A platform for developing, shipping, and running applications in containers. (Version 20.10.0 or newer recommended)
- **Docker Compose**: A tool for defining and running multi-container Docker applications. (Version 1.29.0 or newer recommended)

## 2. Frontend Libraries

The application is built using React and relies on several external libraries, which are loaded via CDN (`esm.sh`). These are defined in `package.json`:

- **react**: `^19.2.4`
- **react-dom**: `^19.2.4`
- **react-router-dom**: `^6.22.3`
- **recharts**: `^2.12.2`
- **@google/genai**: `^1.40.0`

## 3. AI/ML Models

The application's AI features are powered by the Google Gemini API. The specific model used is:

- **`gemini-3-pro-preview`**: This model is used for analyzing user app usage data and generating personalized focus strategies due to its superior reasoning capabilities.

## 4. API Keys & Environment Variables

To connect to the Google Gemini API, a valid API key is required. This key must be provided to the application container at runtime.

- **`API_KEY`**: Your secret key for the Google Gemini API. This is passed to the container using an environment variable (see `docker-compose.yml`).
