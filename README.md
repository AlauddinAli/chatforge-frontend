# 🔥 ChatForge - Enterprise-Grade Real-Time Chat Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-ChatForge-blue?style=for-the-badge&logo=vercel)](https://chatforge-frontend-fxkd.vercel.app/)
[![Version](https://img.shields.io/badge/version-2.0-green?style=for-the-badge)](https://github.com/AlauddinAli/chatforge-frontend)
[![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)](LICENSE)

**A production-ready, feature-rich real-time messaging platform built with React, Socket.IO, and modern web technologies.**

*Slack-like functionality with Discord-inspired features and a beautiful, themeable UI.*

[🌐 Live Demo](https://chatforge-frontend-fxkd.vercel.app/) • [📖 Documentation](#-features) • [🚀 Quick Start](#-getting-started) • [💻 Backend Repo](https://github.com/AlauddinAli/chatforge-backend)

</div>

---

## ✨ What Makes ChatForge Special?

ChatForge isn't just another chat app—it's a **fully-featured messaging platform** with enterprise-level capabilities:

- 🎨 **7 Professional Themes** - Switch between beautiful color schemes instantly
- ❤️ **Message Reactions** - Express yourself with emoji reactions (like Slack!)
- 💬 **Threaded Replies** - Organize conversations with nested replies (like Discord!)
- 📁 **File Sharing** - Upload images, PDFs, and documents seamlessly
- ⚡ **Real-time Everything** - Typing indicators, online status, instant messaging
- 🔐 **Secure Authentication** - JWT-based login with protected routes
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🎭 **Glassmorphism UI** - Modern, elegant design with smooth animations

---

## 🎨 7 Beautiful Themes

Switch between themes on the fly! Each theme transforms the entire app:

| Theme | Description | Best For |
|-------|-------------|----------|
| 🔥 **Default** | Cyberpunk purple/blue gradient | Night owls |
| ☀️ **Light Mode** | Clean white with soft accents | Daytime work |
| 🌙 **Dark Mode** | Minimal black (GitHub-style) | Focus mode |
| 🌊 **Ocean** | Deep blue/cyan underwater vibes | Calm environments |
| 🔮 **Sunset** | Warm orange/pink golden hour | Creative sessions |
| 💎 **Midnight** | Elegant navy/indigo luxury | Premium feel |
| 🌸 **Sakura** | Soft pink cherry blossom | Aesthetic lovers |

**Theme persistence:** Your choice is saved across sessions!

---

## 🚀 Core Features

### 💬 **Real-Time Messaging**
- Instant message delivery via Socket.IO
- Message persistence in MongoDB
- Infinite scroll for message history
- Edit and delete your messages
- Text wrapping and emoji support

### 🎭 **Social Features**
- **Reactions:** Click 😀 on any message to add ❤️😂👍🔥🎉😮😢👏
- **Threaded Replies:** Reply to specific messages to create conversation threads
- **Typing Indicators:** See who's typing in real-time
- **Online Users:** Live sidebar showing active participants
- **User Profiles:** View and edit your profile

### 📁 **File Sharing**
- Upload **images** (JPG, PNG, GIF) with inline preview
- Share **PDFs** and **documents** (DOC, DOCX, TXT)
- Upload **archives** (ZIP) for file bundles
- **10MB file size limit** with progress indicators
- Files stored securely on Cloudinary CDN

### 🏠 **Multi-Room Support**
- **General** - Main discussion room
- **Coding** - Tech talk and programming
- **Random** - Casual conversations
- Switch rooms instantly with full message history

### 🔐 **Security & Auth**
- JWT-based authentication
- Protected routes with auth guards
- Secure password handling
- Session persistence

### 🎨 **UI/UX Excellence**
- **Glassmorphism** design with backdrop blur effects
- **Smooth animations** for all interactions
- **Context menus** for quick actions
- **Mobile-first** responsive design
- **Dark/Light** theme support
- **Customizable** color schemes

---
## 🌟 Key Features Deep Dive

### 🎨 **Theme System**
- **7 pre-built themes** with instant switching
- **LocalStorage persistence** - your choice is saved
- **Context-based** - all components update simultaneously
- **CSS-in-JS approach** with Tailwind utilities
- **No page reload** required for theme changes

### ❤️ **Message Reactions**
- Click **😀** button on any message
- Choose from **8 emojis**: ❤️😂👍🔥🎉😮😢👏
- **Toggle reactions** - click again to remove
- See **reaction counts** and who reacted
- **Real-time sync** across all users

### 💬 **Threaded Replies**
- Click **💬** on any message to reply
- Creates **conversation threads**
- Shows **reply count** on parent messages
- **↩️ Indicator** shows it's a reply
- Keeps conversations **organized**

### 📁 **File Upload System**
- **Drag & drop** or click to upload
- **Image preview** for photos
- **Download links** for documents
- **Progress indicators** during upload
- **10MB size limit** with validation
- Files stored on **Cloudinary CDN**
---

## 🖼️ Preview

### 🔥 Themes 
https://github.com/user-attachments/assets/5bf10387-5bee-4219-8370-1ed4b0fc077b

### ☀️ Light Mode
*Clean professional look for daytime productivity*

### 💬 Message Reactions
*Slack-like emoji reactions on any message*

### 🧵 Threaded Replies
*Discord-style conversation threading*

### 📱 Mobile Responsive
*Perfect experience on all devices*

---

## ⚙️ Tech Stack

### **Frontend**
| Technology | Purpose | Why? |
|------------|---------|------|
| ⚛️ **React 18** | UI Framework | Fast, component-based architecture |
| ⚡ **Vite** | Build Tool | Lightning-fast HMR and builds |
| 🎨 **Tailwind CSS** | Styling | Utility-first, highly customizable |
| 🔌 **Socket.IO Client** | Real-time | WebSocket communication |
| 🎭 **React Context** | State Management | Theme system and global state |
| 🔐 **JWT Decode** | Authentication | Token-based auth |
| 🚀 **React Router** | Navigation | SPA routing with protected routes |

### **Backend Stack**
- 🟢 **Node.js + Express**
- ⚡ **Socket.IO Server**
- 🗄️ **MongoDB Atlas**
- ☁️ **Cloudinary CDN**
- 🔒 **JWT & Bcrypt**

### **Deployment**
- ▲ **Vercel** (Frontend) - Auto-deploy from GitHub
- 🎨 **Render** (Backend) - Container-based hosting
- 🌍 **MongoDB Atlas** - Cloud database
- ☁️ **Cloudinary** - File storage CDN

---

## 📦 Getting Started

### Prerequisites
Node.js 18+ and npm installed
Git for version control

### Installation

1️⃣ **Clone the repository**
git clone https://github.com/AlauddinAli/chatforge-frontend.git
cd chatforge-frontend

2️⃣ **Install dependencies**
npm install

3️⃣ **Set up environment variables**

Create a `.env` file:
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000

4️⃣ **Start development server**
npm run dev

Open [http://localhost:5173](http://localhost:5173) in your browser! 🎉

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🖥️ Start development server with HMR |
| `npm run build` | 📦 Build optimized production bundle |
| `npm run preview` | 🌍 Preview production build locally |
| `npm run lint` | 🔍 Check code quality with ESLint |

---







## 🔌 Backend Integration

ChatForge frontend connects to a **Node.js + Socket.IO backend**.

**Backend Repository:** [chatforge-backend](https://github.com/AlauddinAli/chatforge-backend)

**API Endpoints:**
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `PUT /api/users/profile` - Update profile
- `POST /api/upload` - File upload
- `GET /api/messages/:room` - Load message history

**Socket.IO Events:**
- `joinRoom` - Enter a chat room
- `sendMessage` - Send a message
- `sendReply` - Reply to a message
- `addReaction` - Add emoji reaction
- `editMessage` - Edit your message
- `deleteMessage` - Remove a message
- `typing` - Typing indicator

---

## 🚀 Deployment

### **Frontend (Vercel)**

1. Push to GitHub
2. Import repo in Vercel
3. Add environment variables:
   - `VITE_API_URL` = Your backend URL
   - `VITE_SOCKET_URL` = Your backend URL
4. Deploy! ▲

**Features:**
- ✅ Automatic builds on push
- ✅ Free HTTPS/SSL
- ✅ Global CDN
- ✅ Zero config deployment

### **Backend (Render)**

See [backend repo](https://github.com/AlauddinAli/chatforge-backend) for deployment guide.

---

## 🎯 Roadmap & Future Features

- [ ] 🤖 AI Chatbot integration (OpenAI GPT)
- [ ] 🎤 Voice messages with audio recording
- [ ] 📹 Video calls with WebRTC
- [ ] 🔍 Message search functionality
- [ ] 📊 User analytics dashboard
- [ ] 🎨 Custom theme builder
- [ ] 📱 React Native mobile app
- [ ] 🌐 Internationalization (i18n)
- [ ] 🔔 Push notifications
- [ ] 👥 Direct messages (DMs)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Coding Standards:**
- Use functional React components
- Follow Tailwind CSS conventions
- Write clean, readable code
- Comment complex logic
- Test thoroughly before PR

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

### **Alauddin Ali**


[![GitHub](https://img.shields.io/badge/GitHub-AlauddinAli-black?style=for-the-badge&logo=github)](https://github.com/AlauddinAli)

**Built with ❤️**

*"Always learning. Always building. Always shipping."* 🚀

</div>

---

## 🙏 Acknowledgments

- **Socket.IO** - For real-time magic
- **Tailwind CSS** - For beautiful styling
- **Vercel** - For seamless deployment
- **Cloudinary** - For file storage
- **MongoDB** - For data persistence
- **React Community** - For amazing tools

---


<div align="center">

**🔥 ChatForge v2.0 - Built to Impress, Designed to Scale 🔥**

Made with 💜 by Alauddin Ali • October 2025

[⬆ Back to Top](#-chatforge---enterprise-grade-real-time-chat-platform)

</div>


