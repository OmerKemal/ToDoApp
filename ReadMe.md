# React + Node Todo App (Login + CRUD) with Automated Tests & CI

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

Notes for Reviewers
This app intentionally uses in‑memory storage for simplicity (suitable for demo automation tasks).

The UI and API are kept very small on purpose to highlight the automation strategy:

single‑spec E2E flow,

decoupled API suite in Postman, and

CI run on every push.