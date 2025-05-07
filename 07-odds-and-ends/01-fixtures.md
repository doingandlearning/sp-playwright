## 🧪 Teaching Notes: Fixtures in Playwright

---

### ✅ **Goal**

Understand how to use **fixtures** to manage setup and teardown logic, reduce duplication, and make tests modular and maintainable.

---

### 💡 What Are Fixtures?

> **Fixtures** are reusable building blocks for test context.

They:

- Wrap setup and teardown logic
- Provide values (like `page`, `browser`, `loggedInUser`)
- Can be scoped per-test or globally
- Are declared using `test.extend({ ... })`

Think of them as **named, structured `beforeEach` helpers** with cleanup support.

---

### 🧱 Example: Simple Fixture

```ts
type MyFixtures = { prefilledPage: Page };

const test = base.extend<MyFixtures>({
  prefilledPage: async ({ page }, use) => {
    await page.goto("/contact");
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await use(page); // expose to test
  },
});

test("submit form", async ({ prefilledPage }) => {
  await prefilledPage.click('button[type="submit"]');
});
```

---

### 🎯 When to Use Fixtures

| Use Case                           | Example                                    |
| ---------------------------------- | ------------------------------------------ |
| Setting up shared state            | Open page with pre-filled form             |
| Controlling test environments      | Launch with geolocation, context, viewport |
| Injecting reusable dependencies    | Authenticated context, DB seed, test user  |
| Abstracting repetitive setup logic | Anything you'd otherwise `beforeEach()`    |

---

## 🧭 Decision Matrix: Fixtures vs Helper Methods vs POMs

| Criteria                      | 🧪 **Fixtures**               | 🔧 **Helper Methods**        | 🧱 **Page Object Model (POM)**      |
| ----------------------------- | ----------------------------- | ---------------------------- | ----------------------------------- |
| **Primary use**               | Setup/teardown & dependencies | Reusable action logic        | Abstracting UI structure + behavior |
| **Abstraction level**         | Test-level context            | Mid-level (flows, utilities) | High-level (page/components)        |
| **Code structure**            | `test.extend()` wrappers      | Plain functions              | Classes with locators + methods     |
| **Reusability**               | Medium                        | High                         | Very high                           |
| **Beginner-friendly**         | ✅ Yes                        | ✅ Yes                       | ⚠️ Needs more scaffolding           |
| **Requires TypeScript types** | ✅ Often                      | ❌ Optional                  | ✅ Often                            |
| **When to prefer**            | Test setup dependencies       | Shared steps across tests    | Multiple tests against same UI page |
| **Example**                   | Inject `loggedInPage`         | `login(page)` helper         | `LoginPage.fillLogin()`             |

---
