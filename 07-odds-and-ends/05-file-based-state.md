## 🧪 Teaching Notes: Save & Reuse State (`storageState`) in Playwright

---

### ✅ **Goal**

Learn how to **log in once**, save the session (cookies + localStorage), and **reuse it** across future tests using Playwright’s `storageState`.

---

### 🎯 Why Use This?

| Benefit                            | Impact                                                 |
| ---------------------------------- | ------------------------------------------------------ |
| Skip login in every test           | Huge speed boost + fewer flaky login steps             |
| Reduce test noise                  | Focus on what you're actually testing (e.g. dashboard) |
| Share logged-in state across tests | Run in parallel, keep things isolated                  |

---

### 🔧 What to Show

1. **Log in once**, programmatically
2. **Save session state** to `user.json`
3. **Reuse that file** in any test using `storageState`

---

### 🛠 Script to Save State (Run Once)

```ts
// utils/saveUserState.ts
import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/login");
  await page.fill("#email", "user@example.com");
  await page.fill("#password", "password");
  await page.click("text=Login");

  // Save cookies and localStorage
  await page.context().storageState({ path: "user.json" });
  await browser.close();
})();
```

💡 Run this script once manually or from a setup job:

```bash
npx ts-node utils/saveUserState.ts
```

---

### ✅ Use It in a Test

```ts
import { test, expect } from "@playwright/test";

test.use({
  storageState: "user.json",
});

test("loads dashboard for logged-in user", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.locator(".welcome")).toBeVisible();
});
```

---

### ⚠️ Gotchas

| Symptom                              | Fix                                                       |
| ------------------------------------ | --------------------------------------------------------- |
| Still redirected to login            | App requires both localStorage and cookies — log in again |
| File not found error                 | Ensure `user.json` exists and path is correct             |
| Storage shared across too many tests | Use separate files or `newContext()` for isolation        |

---

### 💬 Questions to Ask Students

- _What gets stored in `storageState`?_
  _(Cookies, localStorage, sessionStorage — all domain-scoped)_
- _Where might this break down?_
  _(Tokens expire, app changes, multi-user tests)_
- _How could this be paired with fixtures?_

---

### 🧱 Bonus: Use with Custom Fixture

```ts
const test = base.extend({
  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: "user.json" });
    const page = await context.newPage();
    await use(page); // Our tests run!
    // Anything after this is, is clean up!
    await context.close();
  },
});
```

---

### 🧪 Stretch Ideas

- Save **multiple user states** to different JSON files
- Auto-generate state in `globalSetup.ts` for CI/CD
- Validate what’s in the storage file (check token, expiry)
