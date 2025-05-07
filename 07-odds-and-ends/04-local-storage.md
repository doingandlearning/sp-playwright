## 🧪 Teaching Notes: Local Storage in Playwright

---

### ✅ **Goal**

Show learners how to **read from** and **write to** `localStorage` in Playwright to simulate login, saved state, or preferences.

---

### 🎯 Why It Matters

| Use Case                           | Testing Benefit                               |
| ---------------------------------- | --------------------------------------------- |
| Simulate logged-in sessions        | Skip login steps for fast test paths          |
| Store feature flags or preferences | Test alternate UI states (dark mode, banners) |
| Restore saved filters/forms        | Ensure localStorage is read on load           |

---

### 🔧 What to Show

1. **Inject values** into localStorage _before_ the page loads
   (via `page.addInitScript`)
2. **Access or assert** values in localStorage _after_ login or user actions
3. Optionally clear storage in `afterEach` to avoid test pollution

---

### ✅ Key Example

```ts
test("load localStorage before page load", async ({ page }) => {
  // With use.baseUrl
  await page.addInitScript(() => {
    localStorage.setItem("authToken", "test-token");
  });
  // Without use.baseUrl
  await page.goto("https://scottishpower.co.uk");
  await page.evaluate(() => {
    localStorage.setItem("authToken", "test-token");
  });
  await page.refresh();
  //

  await page.goto("/dashboard");
  await expect(page.locator(".welcome")).toBeVisible();
});
```

---

### 🧪 Reading LocalStorage in a Test

```ts
const token = await page.evaluate(() => localStorage.getItem("authToken"));
expect(token).toBe("test-token");
```

---

### ⚠️ Gotchas

| Symptom                         | Cause                                                  |
| ------------------------------- | ------------------------------------------------------ |
| `localStorage` has no effect    | You set it _after_ `page.goto()` — too late            |
| Auth doesn't work despite token | App expects other setup (e.g. session cookie, headers) |
| State leaks across tests        | You didn’t clear localStorage in `afterEach()`         |

---

### 🧠 Teaching Questions

- _What’s the difference between localStorage and cookies in this app?_
- _Would mocking localStorage give us reliable results here?_
- _Where in your test suite would this approach be helpful?_

---

### 📚 Stretch Ideas

- Clear localStorage in `afterEach()`:

  ```ts
  await page.evaluate(() => localStorage.clear());
  ```

- Combine with `context.storageState()` if localStorage + cookies need to persist across sessions

- Use `addInitScript` to mock more complex state like feature flags or onboarding flows
