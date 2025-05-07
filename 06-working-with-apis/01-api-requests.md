## 🧪 Teaching Notes: API Requests in Playwright

---

### ✅ **Goal**

Learn to **make, configure, and validate API requests** directly in Playwright tests using `APIRequestContext`.

---

### 🧠 Why Test APIs in Playwright?

- Faster than UI tests
- Works well for setup/teardown logic
- Validates the backend directly
- Great for hybrid tests (UI + API)

---

### 🧱 Topics to Cover

#### 1. 🚀 API Request Basics

| Concept       | Notes                                                              |
| ------------- | ------------------------------------------------------------------ |
| Request Types | Support for `GET`, `POST`, `PUT`, `DELETE`, etc.                   |
| Use Case      | Setup data before UI test, validate backend independently          |
| API Client    | Use `request` object injected into each test (`APIRequestContext`) |

---

#### 2. ⚙️ Request Configuration

| Feature          | How to Use It                                              |
| ---------------- | ---------------------------------------------------------- |
| **Headers**      | Add with `headers: { 'Authorization': '...' }`             |
| **Query Params** | Add to URL like `/api/items?limit=5`                       |
| **Body**         | Use `data` or `form` fields                                |
| **Auth**         | Add headers manually or use storage state where applicable |

---

#### 3. ✅ Response Handling

| Feature           | Best Practice                                              |
| ----------------- | ---------------------------------------------------------- |
| **Status codes**  | Assert explicitly (`expect(response.status()).toBe(201)`)  |
| **Response body** | Use `.json()` or `.text()`                                 |
| **Headers**       | Access with `response.headers()`                           |
| **Errors**        | Always check for non-2xx manually unless using UI fallback |

---

### 🧪 Example Pattern: API Client Class

Encourages reusability, grouping endpoints:

```ts
export class UserAPI {
  constructor(private request: APIRequestContext) {}

  async getUsers() {
    return (await this.request.get("/api/users")).json();
  }

  async createUser(data) {
    return (await this.request.post("/api/users", { data })).json();
  }
}
```

Used like:

```ts
const api = new UserAPI(request);
const users = await api.getUsers();
```

---

### ⚠️ Gotchas & Tips

| Problem                | Mitigation                                                                    |
| ---------------------- | ----------------------------------------------------------------------------- |
| Timeout or retries     | Set `timeout` and retry logic manually if needed                              |
| Sensitive tokens       | Load from env vars or fixtures — never hardcode                               |
| Base URL confusion     | Use `use.baseURL` in config or provide full URLs                              |
| Rate limiting or 429s  | Add retry + backoff logic if needed                                           |
| Mixing UI + API poorly | Keep roles clear: use API to **set up** or **verify**, not duplicate UI tests |

---

### ✅ Lab Suggestion

1. Write a test that creates a user via `request.post()`
2. Check that the response includes the correct fields
3. Assert that a `GET` returns the user
4. Clean up with `DELETE` at the end

---

### 💡 Stretch Goals

- Implement retry helper (e.g. retry on 429 or 500)
- Add a `BaseAPI` class with common methods like `checkStatus()`
- Add logging middleware (just wrap `request.get/post/etc.`)

---
