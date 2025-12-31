# 🚀 YouTube Intelligence RAG Vault

A high-performance, manual-first **RAG (Retrieval-Augmented Generation)** system designed to transform your static documents and transcripts into an interactive, searchable knowledge base.

[![Status](https://img.shields.io/badge/Status-Stable-success?style=for-the-badge)](https://github.com/emilioxd14/youtube-rag)
[![Built with](https://img.shields.io/badge/Built%20with-FastAPI%20%26%20Vanilla%20JS-blue?style=for-the-badge)](https://github.com/emilioxd14/youtube-rag)

---

## 🌟 Overview

The **YouTube Intelligence RAG Vault** is built for users who need a clean, local, and powerful way to interact with information. Originally conceived for YouTube content, it has evolved into a versatile intelligence vault that prioritizes manual content curation over automated harvesting, ensuring your knowledge base only contains what matters to you.

---

## 💎 Key Advantages

- **🧠 Google Gemini Integration**: Leverages `gemini-1.5-pro` for advanced reasoning and high-fidelity embeddings, ensuring your questions get accurate, context-aware answers.
- **📁 Multi-Format Support**: Seamlessly ingest `.pdf`, `.md`, and `.txt` files. Perfect for research papers, technical documentation, or AI-generated summaries.
- **🛡️ Local & Private**: Your vector database (ChromaDB) lives on your machine. You maintain full control over your indexed data.
- **⚡ High Performance**: Utilizing FastAPI for a lightning-fast backend and a lightweight Vanilla JS frontend for zero-latency interactions.
- **🎨 Premium User Experience**: A modern, glassmorphism-inspired UI with drag-and-drop uploads and real-time chat updates.

---

## 🎯 Use Cases

| Case | Description |
| :--- | :--- |
| **Academic Research** | Upload multiple PDF research papers and ask the AI to synthesize findings or find specific citations. |
| **Content Creation** | Paste transcripts from your favorite YouTube videos or AI summaries to build a searchable "brain" of your inspirations. |
| **Internal Documentation** | Sync your project's `.md` documentation to create an instant support bot for your team. |
| **Learning Assistant** | Upload lecture notes and textbooks to quiz yourself or clarify complex concepts in seconds. |

---

## 🛠️ Project Structure

```text
├── backend/            # FastAPI Server
│   ├── main.py         # API Endpoints
│   └── services/       # RAG Logic & ChromaDB Integration
├── frontend/           # Modern Web Interface
│   ├── css/           # Custom Design System
│   └── js/            # Client-side Logic
├── data/               # Persistent Vector Storage (ChromaDB)
└── .env               # API Configuration
```

---

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/emilioxd14/youtube-rag.git
   ```

2. **Configure Environment**:
   Create a `.env` file in the root and add your Gemini API Key:
   ```env
   GOOGLE_API_KEY=your_api_key_here
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Launch Application**:
   - Start the Backend: `python backend/main.py`
   - Open `frontend/index.html` in your browser.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed with ❤️ for high-performance knowledge management.
