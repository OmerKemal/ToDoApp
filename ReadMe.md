# React + Node Todo App (Login + CRUD) with Automated Tests & CI

This project is a product of an experimental work conducted to showcase the automation strategy to be used for frontend and backend testing for a ToDo Application. The app has been constructed with the help of AI and it is an effort to expand my personal experience on using AI for my automation and testing skills and comprehending the working principles of an application. A minimal full‑stack demo app to showcase automation:

- **Frontend:** React (Create React App)
- **Backend:** Node.js + Express (in‑memory auth & todos)
- **UI Tests:** Playwright
- **API Tests:** Postman collection run via Newman
- **CI:** GitHub Actions (starts both servers, runs API + UI tests on every push)

> **Demo credentials**  
> **Username:** `testuser`  
> **Password:** `test123`

---

## Prerequisites

- **Node.js 18+** and **npm**
- Windows/macOS/Linux terminal
- (Optional) Postman (if you want to run requests interactively)

---

## How to Run (Step‑by‑Step)
Backend (navigate from the terminal)

cd backend
npm install    # or npm ci
npm start      # http://localhost:5000
npm run test:api


Frontend (navigate to from another terminal)

cd frontend
npm install    # or npm ci
npm start      # http://localhost:3000

# UI tests (servers must be running --- run these commands from another terminal)
npx playwright install
npm run test:ui          # headless
npm run test:ui:headed   # headed (debug)
npm run test:ui:report   # open HTML report


CI (GitHub Actions)
Triggers on push/PR.


Notes for Reviewers
This app intentionally uses in‑memory storage for simplicity (suitable for demo automation tasks).

The UI and API are kept very small on purpose to highlight the automation strategy:

single‑spec E2E flow,

decoupled API suite in Postman, and

CI run on every push.