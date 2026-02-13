# FocusLock AI 🧠🛡️

FocusLock AI is a high-performance, cross-platform productivity suite designed to enforce "deep work" protocols using surgical application control and AI-driven habit analysis.

## 🚀 Overview

In an era of digital distraction, FocusLock AI acts as your neural firewall. It combines a strict enforcement engine (blocklists, whitelist windows, and lock-down timers) with Google Gemini's reasoning capabilities to analyze your digital behavior and synthesize optimal productivity strategies.

## ✨ Key Features

- **Surgical Rule Engine**: Create immutable block rules for distracting apps and websites.
- **Neural Strategy**: Powered by **Gemini 3 Pro**, the system analyzes your mock usage data to identify patterns of distraction and generate actionable focus protocols.
- **Strict Lockdown Mode**: A high-stakes focus timer that requires cognitive challenges (math, custom questions) to disengage.
- **Intelligent Timetables**: Schedule "Whitelist Windows" where your device only allows access to essential tools.
- **PWA Ready**: Install as a native app on Android, iOS, or Desktop directly from your browser.
- **Privacy First**: Localized storage for rules and usage data.

## 🛠️ Technical Stack

- **Frontend**: React 19 (ESM based), Tailwind CSS
- **AI Engine**: Google GenAI SDK (Gemini API)
- **Charts**: Recharts
- **Deployment**: Docker & Nginx
- **Architecture**: Progressive Web App (PWA)

## 🐳 Quick Start (Docker)

To deploy your own instance of FocusLock AI:

1. **Clone the project**:
   ```bash
   git clone <your-repo-url>
   cd focuslock-ai
   ```

2. **Set your API Key**:
   Open `docker-compose.yml` and replace `YOUR_GEMINI_API_KEY_HERE` with your actual key from [Google AI Studio](https://aistudio.google.com/).

3. **Launch the system**:
   ```bash
   docker-compose up -d
   ```
   The app will be available at `http://localhost:8080`.

## 📱 Mobile Installation

FocusLock AI is built as a **Progressive Web App**:

- **Android**: Open the URL in Chrome, tap the three dots (⋮), and select **"Install App"**.
- **iOS**: Open the URL in Safari, tap the **Share** button, and select **"Add to Home Screen"**.

## ⚖️ License

MIT License. See `LICENSE` for details (optional).

---
*Built for peak performance and zero distractions.*
