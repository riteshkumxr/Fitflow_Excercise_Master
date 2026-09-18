# ⚡ FitFlow AI — Intelligent Motion Tracker & SaaS Fitness Platform

<div align="center">

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Pose%20Detection-007ACC?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Edge Computer Vision • Real-Time Joint Kinematics • Macro Nutrition Engine • Token Economy & Multi-Method Checkout**

[Explore Live Demo](https://riteshkumxr.github.io/Fitflow_Excercise_Master/) • [Report Bug](https://github.com/riteshkumxr/Fitflow_Excercise_Master/issues) • [Request Feature](https://github.com/riteshkumxr/Fitflow_Excercise_Master/issues)

</div>

---

## 🌟 Overview

**FitFlow AI** is an advanced, client-side computer vision fitness coaching platform that turns any standard webcam or smartphone camera into an intelligent personal trainer. Running entirely in the browser using **MediaPipe Pose** and **TensorFlow.js**, it tracks 33 skeletal landmarks in real-time, validates biomechanical joint angles, counts exercise repetitions, and calculates form accuracy scores with **zero cloud inference cost or latency**.

Beyond motion tracking, FitFlow features an integrated **SaaS Token Economy**, dynamic **Multi-Tier Memberships** with individualized color palettes, simulated **Multi-Method Payment Gateway** (UPI QR, 3D Secure Cards, Net Banking) with automated GST invoicing, and an intelligent **NLP Nutrition Engine**.

---

## 🏗️ System Architecture Pipeline

```mermaid
flowchart TD
    subgraph Client["Client Browser (React 19 + Vite)"]
        UI["User Interface & Router"]
        Theme["Theme Context (Dark/Light + Membership Themes)"]
        Auth["Auth Context & Athlete Profile"]
        Tokens["Token Context & Wallet Engine"]
    end

    subgraph VisionPipeline["Edge Computer Vision Engine"]
        Video["Webcam / Mobile Camera Stream"]
        MediaPipe["MediaPipe Pose Pipeline (33 Keypoints)"]
        Angles["Vector Kinematics & Joint Angle Math"]
        Counter["Hysteresis State Machine (Rep Counting & Form Score)"]
    end

    subgraph AIEngine["FitFlow Nutrition & Assistant Engine"]
        NLP["Typo-Tolerant NLP Query Parser"]
        FoodDB["45+ Item Food & Micronutrient Database"]
        BurnCalc["MET Calorie Burn & Step Converter"]
    end

    subgraph SaaSMonetization["Token Economy & Checkout Gateway"]
        Trial["50 Free Trial Tokens + Daily +5 Streak Claim"]
        Modal["Interactive Multi-Method Payment Modal"]
        Methods["UPI QR | 3D Secure Card OTP | Net Banking | Wallets"]
        Ledger["Transaction Ledger & Tax Invoice (18% GST)"]
    end

    Video --> MediaPipe --> Angles --> Counter --> UI
    UI --> NLP --> FoodDB --> BurnCalc --> UI
    UI --> Tokens --> Modal --> Methods --> Ledger --> Tokens
    Theme --> UI
    Auth --> UI
```

---

## 🔬 Computer Vision Pose Tracking Pipeline

FitFlow runs real-time kinematic calculations directly on client hardware (WebGL accelerated) without transmitting video frames to a remote server, ensuring total user privacy.

```mermaid
sequenceDiagram
    autonumber
    actor Athlete as Athlete
    participant Camera as Camera Stream (HTML5 Video)
    participant Model as MediaPipe Pose (33 Landmarks)
    participant Math as Joint Angle Trigonometry
    participant Form as State Machine & Audio Engine
    participant UI as Dashboard View

    Athlete->>Camera: Performs Movement (e.g. Squat / Pushup)
    Camera->>Model: 30+ FPS Frame Capture
    Model->>Math: Extract Coordinates (Shoulder, Elbow, Hip, Knee, Ankle)
    Note over Math: Calculate theta = arccos((a^2 + b^2 - c^2)/(2ab))
    Math->>Form: Evaluate Flexion / Extension Thresholds
    alt Repetition Completed with Proper Depth
        Form->>UI: Increment Rep Counter, Play Beep, Award Form Score
    else Faulty Posture Detected
        Form->>UI: Display Live Visual Correction Cue (e.g. 'Keep Knees Behind Toes')
    end
    Form->>Athlete: Real-Time HUD Overlay & Feedback
```

---

## 💳 Token Economy & Payment Workflow

```mermaid
flowchart LR
    A[New User Registration] --> B[Receive 50 Free Trial Tokens]
    B --> C{Action Triggered}
    C -->|AI Coach Query| D[Deduct 1 Token]
    C -->|AI Pose Tracking| E[Deduct 2 Tokens]
    C -->|Daily Streak Active| F[Claim +5 Free Daily Tokens]
    
    C -->|Insufficient Balance| G[Trigger Payment Gateway Modal]
    G --> H{Select Bundle}
    H -->|Starter ₹99| I[100 Tokens • Emerald Theme]
    H -->|Pro Pack ₹299| J[600 Tokens • Royal Indigo Theme]
    H -->|VIP Elite ₹699| K[Unlimited 30 Days • 24K Gold Theme]
    
    I & J & K --> L[Simulated Multi-Method Checkout]
    L --> M[Instant Credit & Official Tax Invoice]
```

---

## 🎨 Unique Multi-Tier Membership Themes

Every membership tier in FitFlow features a distinct color theme that dynamically styles the entire application:

| Membership Tier | Pricing & Bundle | Unique Color Theme | Visual Palette & Experience |
| :--- | :--- | :--- | :--- |
| **Starter Booster** | **₹99** / 100 Tokens | **Electric Mint & Emerald** ⚡ | Fresh emerald borders, neon cyan highlights, mint badge, emerald checkout accents. |
| **Pro Athlete Pack** | **₹299** / 600 Tokens | **Royal Indigo & Electric Violet** 🔥 | Royal indigo borders, fiery gradient badge, +100 bonus token indicator, performance athlete styling. |
| **Unlimited VIP Elite** | **₹699** / Month | **Ultra-Luxury 24K Royal Gold & Obsidian** 👑 | 24K gold borders, liquid amber gradients, golden Crown badge (`👑 30-DAY VIP PASS`), gold price glow, and golden VIP Aura throughout the Navbar, Profile, and Checkout. |

---

## 🚀 Complete Feature Highlights

- **⚡ Real-Time Pose Tracking**: 12 dedicated computer vision modules (Squats, Pushups, Pullups, Shoulder Press, Bicep Curls, Lateral Raises, Lunges, Good Mornings, High Knees, and Seated Desk Mobility exercises).
- **🎬 13 Biomechanically Unique Demonstrations**: Replaced generic placeholders with dedicated, accurate exercise demonstration animations.
- **🤖 NLP Fitness & Nutrition Engine**: Typo-tolerant natural language search supporting 45+ Indian and global foods (samosa, roti, paneer, biryani, whey, creatine, etc.) with exact calorie-to-exercise burn equivalents.
- **💰 SaaS Token Economy**: 50 free starter tokens, daily streak refills, and dynamic feature paywalls.
- **💳 Multi-Method Payment Simulation**: Supports UPI Dynamic QR, Credit/Debit Cards with 3D Secure OTP verification, Net Banking (HDFC, SBI, ICICI, etc.), and Wallets, complete with printable 18% GST tax invoices.
- **🌓 Accessible Dark & Light Modes**: 
  - High-visibility pill toggle in the Navigation Bar.
  - Dedicated theme switch card in the mobile drawer.
  - Quick-access Hero button + **floating theme pill** on the Home page (`Dashboard.jsx`).
  - Preferences control card in the Athlete Profile.
- **📱 100% Responsive Architecture**: Optimized across mobile smartphones (360px–430px), tablets (768px–1024px), and ultra-wide desktops.
- **👤 Athlete Profile Hub**: Customizable user vitals, photo avatar upload with client-side canvas compression, global leaderboard, and consultation schedule.

---

## 🛠️ Technology Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite 6.2, React Router DOM 7 |
| **Styling & Design** | Tailwind CSS 3.4, Lucide React Icons |
| **AI & Computer Vision** | MediaPipe Pose, TensorFlow.js (WebGL backend) |
| **State Management** | Context API (`AuthContext`, `ThemeContext`, `TokenContext`) |
| **Storage & Security** | LocalStorage state persistence, Base64 compressed image storage |

---

## 🏃 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- Modern web browser with camera permissions enabled (Chrome, Firefox, Safari, Edge)

### Installation
```bash
# 1. Clone repository
git clone https://github.com/riteshkumxr/Fitflow_Excercise_Master.git

# 2. Enter project folder
cd Fitflow_Excercise_Master

# 3. Install dependencies
npm install

# 4. Launch local development server
npm run dev
```

Open [http://localhost:5173/Fitflow_Excercise_Master/](http://localhost:5173/Fitflow_Excercise_Master/) in your browser.

### Building for Production
```bash
npm run build
```

---

## 👨‍💻 Author & Connect

**Ritesh Kumar**  
- **GitHub**: [@riteshkumxr](https://github.com/riteshkumxr)  
- **LinkedIn**: [Connect on LinkedIn](https://linkedin.com/in/riteshkumar)  
- **Portfolio**: [FitFlow Live Deployment](https://riteshkumxr.github.io/Fitflow_Excercise_Master/)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
