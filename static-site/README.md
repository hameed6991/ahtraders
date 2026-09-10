# AH Traders — Static Website

Fully static, high-performance website for AH Traders (Exquisite Rice Exporters), converted from Blazor Server for hosting on Vercel or any static host.

## Tech Stack
- **Build Tool**: Vite
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment Target**: Vercel Static Hosting

## Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)

### Installation
```bash
npm install
```

### Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
```
Generates production-ready static assets in `dist/`.

### Preview Build Locally
```bash
npm run preview
```

---

## Vercel Deployment Settings

When deploying to [Vercel](https://vercel.com):

- **Framework Preset**: `Vite`
- **Root Directory**: `static-site` (or leave default if deploying directly from repository root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
