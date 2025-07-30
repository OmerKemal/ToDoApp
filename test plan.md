# Test Plan for Webshop Software

## 1. Overview
The objective of this test plan is to prove that the critical user journey (Login → Create → Edit → Delete → Logout) works end‑to‑end. It is also to provide fast, reliable feedback on the highest‑risk and most‑used flows. 

---

## 2. Design the Test Strategy

### 2.1 Scope of Testing

#### Functionalities to Test:
- The most basic functionalities of Login, Create, Edit, Get and Delete todos on the UI.
- API: /api/login, /api/todos (GET/POST/PUT/DELETE) — positive and selected negative cases.

- Due to time limitations, edge cases and cross-browser testing, performance testing are beyond the scope of this work.


### 2.2 Testing Approach


#### 4.1 UI E2E (Playwright)
- **State Transitions tests starting with login followed by generation of a todo and update and delete of the same todo is committed.

#### 4.2 API (Postman/Newman)
Collection covers:

POST /api/login → 200 (valid), 401 (invalid creds)

GET /api/todos → 200 with token, 401 without

POST /api/todos → 201/200 valid; 401 without token; 400 invalid payload (if enforced)

PUT /api/todos/:id → 200 valid; 401 missing token; 404 invalid id

#### 4.3 CI Integration

Each new push committed to the branch generates a new run to get the tests completed in the repo.

---

## 3. Define Test Criteria

### 3.1 Entry Criteria
- Completion of feature development and unit testing.
- Test environment is set up and accessible.
- Test data is available.

### 3.2 Exit Criteria
- All high-priority test cases executed with a pass rate ≥ 95%.
- No critical or major defects remain unresolved.
---
## 4. Resource Planning**

- **Human Resources:** QA team, development team, end users for UAT
- **Hardware:** PCs, laptops, smartphones, tablets
- **Software:** Browsers (Chrome, Firefox, Safari, Edge), operating systems (Windows, macOS, Android, iOS)
- **Testing Tools:** Performance testing tools

---

## 5. Test Environment
- **Operating Systems**: Windows 10, macOS, Android, iOS.
- **Browsers**: Chrome, Firefox, Safari, Edge.
- **Devices**: Desktop, tablet, mobile.
- **Test Data**: dummy user for practical use.
 
