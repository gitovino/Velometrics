# VeloMetrics

A lightweight, mobile-first web app to track bicycle maintenance, component wear, and Total Cost of Ownership (TCO).

Built as a single-page progressive web app (PWA) with zero build steps—running directly in the browser using Vanilla JavaScript, Tailwind CSS, Chart.js, and Firebase.

👉 **Live Demo:** [gitovino.github.io/velometrics](https://gitovino.github.io/velometrics/)

---

## Why VeloMetrics?

Most cycling apps focus entirely on fitness metrics (power, heart rate, segments). VeloMetrics focuses on the equipment:
- What does riding this bike actually cost per kilometer?
- When is the chain due for replacement before it wears down the cassette?
- How does initial purchase price plus recurring parts compare to estimated resale value?

---

## Features

- **TCO & Cost per Kilometer:** Combines bike purchase price, resale estimates, and maintenance logs into dynamic monthly expense and category charts.
- **Component Wear Tracking:** Monitor mileage on specific parts (chains, tires, cassettes, brake pads) with configurable lifespans and service alerts.
- **Local-First with Cloud Sync:** Works completely offline via `localStorage` with real-time sync to Firebase Firestore.
- **Google Auth & Guest Mode:** Sign in with Google to sync across desktop and mobile, or use the anonymous guest mode without an account.
- **PWA Ready:** Installable on iOS (Safari home screen) and Android for an app-like experience.
- **Data Ownership:** Full import/export via structured `.json` backups and `.csv` exports.

---

## Tech Stack

- **Frontend:** HTML5, Vanilla JavaScript (ES modules)
- **Styling:** Tailwind CSS (CDN)
- **Charts:** Chart.js
- **Icons:** Phosphor Icons
- **Backend / Database:** Firebase Authentication & Cloud Firestore
- **Hosting:** GitHub Pages

---

## Getting Started

Because there is no build pipeline or Node dependency chain, you can run the app with any static file server.

### 1. Clone the repository
```bash
git clone [https://github.com/gitovino/velometrics.git](https://github.com/gitovino/velometrics.git)
cd velometrics
