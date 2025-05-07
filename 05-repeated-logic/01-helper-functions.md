## 🧪 Teaching Notes: Helper Functions in Playwright

---

### ✅ **Goal**

Learn how to extract reusable logic into **helper functions** to improve readability, reduce duplication, and prepare for more advanced abstractions like Page Object Models.

---

### 🎯 Why Use Helper Functions?

| Problem Without Helpers             | Solution with Helpers                     |
| ----------------------------------- | ----------------------------------------- |
| Repeating login steps in every test | Extract `login(page, user, pass)`         |
| Test files cluttered with details   | Extract named actions that express intent |
| Hard to update flows in many places | Update one function, reflect everywhere   |

---

### 🧱 Concepts

- **Helper functions** are regular JavaScript/TypeScript functions.
- They take a `page` object (and other arguments), perform steps, and return control.
- They **do not** hold state or wrap page objects like a POM.
- Ideal for **shared flows**, **data entry**, **repeated checks**, etc.

---

### 🧪 Example: `login.ts`

```ts
// helpers/login.ts
import { Page } from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.goto("/login");
  await page.fill("#username", username);
  await page.fill("#password", password);
  await page.click('button[type="submit"]');
}
```

---

### 🧪 Using It In a Test

```ts
import { test, expect } from "@playwright/test";
import { login } from "../helpers/login";

test("can access dashboard after login", async ({ page }) => {
  await login(page, "user@example.com", "password123");
  await expect(page.locator(".dashboard")).toBeVisible();
});
```

✅ Cleaner
✅ More readable
✅ Easy to reuse

---

### 🛠️ Suggested Helper Patterns

| Helper Name            | Use Case                                 |
| ---------------------- | ---------------------------------------- |
| `login()`              | Standard login flow                      |
| `fillAddressForm()`    | Filling repeated complex form            |
| `setupTestUser()`      | Backend setup via API before UI test     |
| `assertToastMessage()` | Consistent check for toast notifications |

---

### ⚠️ Gotchas

| Anti-Pattern                     | Better Practice                       |
| -------------------------------- | ------------------------------------- |
| Passing unrelated arguments      | Keep function scope focused           |
| Duplicating logic in helpers     | Reuse inside helpers too              |
| Adding assertions inside helpers | Keep them for the test unless generic |

---
