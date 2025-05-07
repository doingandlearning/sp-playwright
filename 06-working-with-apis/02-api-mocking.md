## 🧪 Teaching Notes: Mocking API Responses in Playwright

---

### ✅ **Goal**

Learn to intercept and mock API requests in Playwright to:

- Test frontend behaviour independently of real APIs
- Simulate error conditions and edge cases
- Improve test reliability and speed

---

### 🎯 Why Use Mocking?

| Situation                         | Benefit                  |
| --------------------------------- | ------------------------ |
| Backend not ready                 | Unblock frontend testing |
| API occasionally down             | Ensure test reliability  |
| Hard to trigger an error response | Simulate it with mocks   |
| Control data tightly in tests     | Isolate test scenarios   |

---

### 🧱 Core Mocking Techniques

#### 1. **Route Fulfilment**

Intercept the request and supply a mock response:

```ts
await page.route("/api/users/1", (route) => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ id: "1", name: "Mock User" }),
  });
});
```

#### 2. **Wildcard Matching**

Use `*` or regex to match dynamic URLs:

```ts
await page.route(/\/api\/users\/.*/, route => { ... });
```

#### 3. **Dynamic Responses**

Extract data from request to generate mock response:

```ts
const id = route.request().url().split("/").pop();
```

---

### 📦 Mock Data Structure (Optional)

Encourage placing mock data in a dedicated file:

```ts
// mocks/userMocks.ts
export const userMocks = {
  success: { status: 200, body: { id: "1", name: "Mock User" } },
  error: { status: 404, body: { error: "Not found" } },
};
```

---

### ✅ Good Practices

| Do This                           | Avoid This                              |
| --------------------------------- | --------------------------------------- |
| Keep mock logic simple            | Complex logic that mimics real services |
| Use realistic-looking data        | Empty strings or irrelevant fields      |
| Simulate both success and failure | Only testing happy paths                |
| Clean up unused mocks             | Leaving stale or unused interceptors    |

---

### ⚠️ Gotchas

- Don’t forget to `await route.fulfill()`
- If a `page.request.get()` goes to a real API, it won't be mocked (mock `page.route()`, not `request.route()`)
- Only intercepts **browser-triggered requests** — use `request.newContext()` to mock API-only flows
- Wildcards don’t work in `route.fulfill()` URLs — use regex or manual parsing

---

### 🚀 Stretch Ideas

- Build a `mockServer.ts` that centralises common routes
- Use Faker.js or a custom generator to produce mock data
- Add logging to your `route` functions for debugging
- Add support for conditional mocks (e.g. different behaviour based on headers)

---
