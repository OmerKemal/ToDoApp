# React + Node Todo App (Login + CRUD) with Automated Tests & CI

This project is a product of an experimental work conducted to showcase the automation strategy to be used for frontend and backend testing for a ToDo Application. The app has been constructed with the help of AI and it is an effort to expand my personal experience on using AI for my automation and testing skills and comprehending the working principles of an application. 


The frontend automation framework is based on Page-Object-Model (POM) and it employs re-usable and re-scalable methods developed to handle any dynamic test. As a modern automation tool Playwright is chosen to benefit from the advantages like in-built auto-waits.

The backend automation covers all the CRUD operations employed in this app to test reliable functioning of the endpoints.

As the final step CI integration to Github Actions is completed to run the tests on each push to the main branch.

A minimal full‑stack demo app to showcase automation:

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
Clone the repository to your local
Backend (navigate from the terminal to the backend directory and run the following commands)

npm install    # or npm ci


npm start      # http://localhost:5000


npm run test:api


Frontend (navigate to from another terminal to the frontend directory and run the following commands)

npm install    # or npm ci


npm start      # http://localhost:3000


npx playwright install


npx playwright test ./tests/E2E.spec.js

# To get reports

npm run test --ui --report   # open HTML report


# CI (GitHub Actions)
Triggers on every push to main branch.


Notes for Reviewers
This app intentionally uses in‑memory storage for simplicity (suitable for demo automation tasks).

The UI and API are kept very small on purpose to highlight the automation strategy:

single‑spec E2E flow,

decoupled API suite in Postman, and

CI run on every push.