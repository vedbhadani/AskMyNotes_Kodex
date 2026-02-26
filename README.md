# 📚 AskMyNotes

> **AI-powered note assistant** — Upload your PDF or TXT notes, and ask questions, generate study dashboards, or transcribe voice queries — all grounded strictly in your own uploaded material.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 📂 **Subject Management** | Create up to 3 subjects, each with a name, icon, and colour theme |
| 📄 **File Upload** | Upload up to 20 PDF / TXT files per subject (max 50 MB each) |
| 🤖 **AI Chat (Groq)** | Ask questions answered *only* from your uploaded notes via Llama 3.3 70B |
| 📊 **Study Dashboard** | Auto-generates a Markdown summary, 5 MCQs, and 3 flashcard questions from your notes |
| 🎙️ **Voice Transcription** | Record audio questions — transcribed locally using OpenAI Whisper (Tiny EN, ONNX) |
| ☁️ **Cloudinary Storage** | Raw files are backed up to Cloudinary after text extraction |
| 🗄️ **MongoDB Persistence** | Subjects, files, and chat history are stored in MongoDB Atlas |
| 🔐 **Auth (localStorage)** | Client-side sign-up / sign-in with session persistence |
| 📤 **PDF Export** | Export study notes as a PDF via jsPDF |
| 🌓 **Cyber-Minimalist UI** | Dark-mode, neon-accent, glassmorphism design built in Vanilla CSS + React |

---

## 🏗️ Project Structure

```
AskMyNotes/
├── backend/                  # Node.js / Express API
│   ├── config/
│   │   ├── db.js             # MongoDB connection (Mongoose)
│   │   └── cloudinary.js     # Cloudinary SDK configuration
│   ├── models/
│   │   ├── Subject.js        # Subject schema (subjectId, name, icon, color)
│   │   ├── File.js           # File schema (fileName, extractedText, cloudinaryUrl)
│   │   └── ChatHistory.js    # Chat log schema (subjectId, question, response)
│   ├── routes/
│   │   ├── upload.js         # POST /api/upload, POST /api/clear-subject
│   │   ├── chat.js           # POST /api/chat
│   │   ├── study.js          # POST /api/study-mode
│   │   └── transcribe.js     # POST /api/transcribe
│   ├── utils/
│   │   └── getSubjectText.js # Aggregates extracted text for a subject from MongoDB
│   ├── uploads/              # Temp storage for incoming files (auto-cleaned)
│   ├── .cache/               # Whisper ONNX model cache (~150 MB, auto-downloaded)
│   ├── .env                  # Environment variables (see below)
│   ├── server.js             # App entry point
│   └── package.json
│
└── frontend/                 # React + Vite SPA
    ├── src/
    │   ├── context/
    │   │   ├── AppContext.jsx # Global subject/page state (up to 3 subjects)
    │   │   └── AuthContext.jsx # localStorage-based auth (sign-up / sign-in / sign-out)
    │   ├── pages/
    │   │   ├── SetupPage.jsx  # Subject creation & file upload UI
    │   │   ├── StudyPage.jsx  # Study dashboard (summary, MCQs, flashcards)
    │   │   ├── ChatPage.jsx   # AI chat with voice input + markdown rendering
    │   │   ├── SignInPage.jsx # Login form
    │   │   └── SignUpPage.jsx # Registration form
    │   ├── components/
    │   │   └── Sidebar.jsx   # Navigation sidebar with subject list
    │   ├── utils/            # Helper utilities (e.g. PDF export)
    │   ├── App.jsx           # Root component with AuthGate + routing
    │   └── main.jsx          # React DOM entry point
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ Tech Stack

### Backend
| Package | Version | Purpose |
|---|---|---|
| `express` | ^5.2 | HTTP server & routing |
| `mongoose` | ^8.13 | MongoDB ODM |
| `multer` | ^2.0 | Multipart file uploads |
| `pdf-parse` | ^2.4 | PDF text extraction |
| `groq-sdk` | ^0.37 | Groq AI (Llama 3.3 70B) |
| `@huggingface/transformers` | ^3.8 | Whisper ASR (local ONNX) |
| `cloudinary` | ^2.5 | File CDN storage |
| `cors` | ^2.8 | Cross-origin requests |
| `dotenv` | ^17.3 | Environment variable loader |

### Frontend
| Package | Version | Purpose |
|---|---|---|
| `react` + `react-dom` | ^19.2 | UI framework |
| `react-router-dom` | ^7.13 | Client-side routing |
| `vite` + `@vitejs/plugin-react` | ^7.3 / ^5.1 | Build tool & HMR |
| `lucide-react` | ^0.575 | Icon set |
| `marked` | ^17.0 | Markdown → HTML rendering |
| `jspdf` | ^4.2 | PDF export |

### External Services
| Service | Used For |
|---|---|
| **MongoDB Atlas** | Subjects, files, and chat history |
| **Cloudinary** | Raw file CDN backup |
| **Groq API** | AI completions (Llama 3.3 70B Versatile) |
| **Hugging Face (ONNX)** | `whisper-tiny.en` — local voice transcription |

> **Note:** `ffmpeg` must be installed on the system PATH for voice transcription to work.

---

## 🔧 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Groq AI
GROQ_API_KEY=your_groq_api_key_here

# Server
PORT=3001

# MongoDB Atlas
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Cluster0

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9
- **ffmpeg** (required for voice transcription)
  ```bash
  # macOS
  brew install ffmpeg

  # Ubuntu / Debian
  sudo apt install ffmpeg
  ```

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/AskMyNotes.git
cd AskMyNotes
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Configure Environment
Copy and fill in your credentials:
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your keys
```

---

## ▶️ Running the App

Open **two terminal windows**:

**Terminal 1 — Backend**
```bash
cd backend
npm run dev
# ✅  Server running at http://localhost:3001
# ✅  MongoDB connected
# ✅  Whisper model loaded and ready!
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev
# ➜  Local:   http://localhost:5173/
```

Then open **http://localhost:5173** in your browser.

> On first backend start, Whisper downloads the `whisper-tiny.en` ONNX model (~150 MB). This is cached in `backend/.cache/` for subsequent runs.

---

## 📡 API Reference

All routes are prefixed with `/api`.

### Health Check
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Returns server uptime, subject count, and file count |

### Upload
| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/upload` | `multipart/form-data` — `files[]`, `subjectId`, `subjectName` | Upload up to 20 PDF/TXT files. Extracts text, uploads to Cloudinary, saves to MongoDB |
| `POST` | `/api/clear-subject` | `{ subjectId }` | Deletes all files for a subject from MongoDB and Cloudinary |

### Chat
| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/chat` | `{ subjectId, question, subjectName? }` | Returns AI answer strictly grounded in the subject's notes |

**Response format:**
```json
{
  "notFound": false,
  "answer": "Markdown answer string",
  "confidence": "High | Medium | Low",
  "evidence": ["Direct quote from notes..."],
  "citations": ["filename.pdf"]
}
```

### Study Mode
| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/study-mode` | `{ subjectId, subjectName?, fileName? }` | Generates a full study dashboard |

**Response format:**
```json
{
  "notes": "# Markdown Summary\n...",
  "mcqs": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctKey": "A",
      "explanation": "...",
      "citation": "filename.pdf"
    }
  ],
  "shortAnswer": [
    {
      "question": "...",
      "answer": "...",
      "citation": "filename.pdf"
    }
  ]
}
```

### Transcription
| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/transcribe` | `multipart/form-data` — `audio` (webm/wav/mp3) | Converts audio to 16 kHz WAV via ffmpeg, runs Whisper ASR, returns transcript |

**Response format:**
```json
{ "text": "Transcribed speech text here" }
```

---

## 🗃️ Database Schema

### `Subject`
```
subjectId  String  (unique, indexed)
name       String
icon       String  (default: "📘")
color      String  (default: "s0")
createdAt  Date
```

### `File`
```
subjectId           String  (indexed)
fileName            String
cloudinaryUrl       String
cloudinaryPublicId  String
extractedText       String
uploadedAt          Date
```

### `ChatHistory`
```
subjectId   String  (indexed)
question    String
response    Mixed   (full Groq JSON response)
createdAt   Date
```

---

## 🖥️ Frontend Pages

| Page | Route (internal) | Description |
|---|---|---|
| **Sign In** | auth gate | Email + password login; session stored in `localStorage` |
| **Sign Up** | auth gate | Registration; user list stored in `localStorage` |
| **Setup** | `setup` | Create/edit subjects (name, icon, color), upload files, trigger backend upload |
| **Study** | `study` | View AI-generated Markdown summary, take MCQ quiz, review flashcards, export PDF |
| **Chat** | `chat` | Ask questions via text or 🎤 voice; answers rendered in Markdown with evidence citations |

---

## 🔐 Authentication

Authentication is handled entirely client-side using **localStorage**:
- User accounts are stored under the key `askmynotes_users`
- Active session is stored under `askmynotes_session`
- Passwords are stored as plain text in localStorage (suitable for hackathon / demo use)
- On refresh, the session is restored automatically

> ⚠️ **For production use**, replace this with a proper backend auth solution (JWT, OAuth, etc.)

---

## 🧠 How the AI Works

1. **Extraction** — When a file is uploaded, all text is extracted server-side (`pdf-parse` for PDFs, `fs.readFileSync` for TXT files) and stored in MongoDB.
2. **Context Assembly** — On every chat or study request, `getSubjectText.js` aggregates the `extractedText` of all files for the requested `subjectId` from MongoDB.
3. **Prompt Engineering** — The full text is injected into a structured prompt that instructs the Llama 3.3 70B model to answer **only** from the provided notes and respond in a strict JSON schema.
4. **Response Format** — All AI responses are requested in `json_object` mode via the Groq API and parsed server-side before being returned to the frontend.

---

## 🎙️ Voice Transcription Flow

```
Browser (getUserMedia) 
  → MediaRecorder (WebM blob)
    → POST /api/transcribe
      → ffmpeg converts → 16 kHz mono WAV
        → WAV parsed to Float32Array
          → Whisper ONNX pipeline
            → { text: "..." } returned to frontend
              → auto-populates chat input
```

The Whisper model (`onnx-community/whisper-tiny.en`) is downloaded once (~150 MB) into `backend/.cache/` and reused for all subsequent runs.

---

## 🚧 Known Limitations

- Auth uses localStorage — **not suitable for production** without a real backend auth layer.
- Maximum **3 subjects** per session (by design).
- Whisper `tiny.en` is fast but less accurate than larger models; English-only.
- Cloudinary upload failure is **non-fatal** — the app continues if Cloudinary is unavailable.
- No real-time streaming of AI responses (full response is returned at once).

---

## 🤝 Contributing

1. Fork the repo and create a feature branch.
2. Run both `backend` and `frontend` dev servers locally.
3. Make your changes and test thoroughly.
4. Open a pull request with a clear description of what you changed and why.

---
