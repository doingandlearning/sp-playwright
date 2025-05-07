## 🧪 Teaching Notes: API Integration Testing in Playwright

---

### ✅ **Goal**

Enable learners to implement **comprehensive integration tests** that simulate real-world API workflows using Playwright’s API testing capabilities.

---

### 🔍 What is API Integration Testing?

| Type             | Purpose                                                               |
| ---------------- | --------------------------------------------------------------------- |
| Unit test        | Tests a single API in isolation                                       |
| Integration test | Tests multiple APIs together in a flow (e.g., user → product → order) |
| End-to-end test  | Often UI + backend together — may or may not include API layers       |

👉 Integration tests validate **how services work together**, including **data flow, business rules, and dependencies**.

---

### 🔄 Common Test Scenarios

- Create → Update → Verify entity flow (e.g. create a user, create an order for that user, verify contents)
- Auth → Action → Refresh
- State-driven workflows (e.g. cart → checkout → payment → order history)

---

### 🧱 Structure of a Good Integration Test

| Section    | Example from Lab Code                          |
| ---------- | ---------------------------------------------- |
| Setup      | Create user/product/order via APIs             |
| Execution  | Perform actions like placing an order          |
| Validation | Assert that the state/output is correct        |
| Teardown   | Cleanup created data to keep the test isolated |

---

### ✅ Best Practices

| Practice                 | Why It Matters                                                     |
| ------------------------ | ------------------------------------------------------------------ |
| **Test Isolation**       | Avoid leaking state across tests — no leftover users/orders        |
| **Data Cleanup**         | Clean up in `afterEach()` or via teardown helpers                  |
| **Minimal Dependencies** | Only touch the APIs under test — mock where needed                 |
| **Clear Assertions**     | Don’t just test status codes — validate structure + business logic |
| **Fast Feedback**        | Avoid using UI — test directly via `request` where possible        |

---

### ⚠️ Gotchas

| Issue                  | Recommendation                                        |
| ---------------------- | ----------------------------------------------------- |
| Shared state           | Never rely on pre-existing data — create what you use |
| Async cleanup failures | Use `try/catch` or `Promise.allSettled()` in teardown |
| Flaky tests on CI      | Watch for real-world timeouts, race conditions        |
| Forgetting auth        | Token injection needed for protected routes           |

---

### 🚀 Stretch Goals

- Build a **test data factory** (e.g. `createRandomUser()`, `createFakeProduct()`)
- Centralise all APIs in a single `TestContext` to pass into each test
- Integrate with a lightweight test reporting tool for API status summaries
- Inject auth tokens via Playwright's context for combined UI + API tests
