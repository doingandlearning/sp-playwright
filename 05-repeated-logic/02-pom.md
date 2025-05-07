## 🧪 Teaching Notes: Page Object Model (POM) in Playwright

---

### ✅ **Goal**

Understand the **what, why, and how** of POM — a design pattern that improves the maintainability and clarity of automated UI tests.

---

### 🎯 Why Page Object Model?

| Without POM                          | With POM                            |
| ------------------------------------ | ----------------------------------- |
| Tests are long, repetitive           | Tests are short, readable           |
| Changes require edits in many files  | Changes localised to page objects   |
| Selector logic mixed with assertions | Selectors encapsulated in one place |

Use this to motivate the pattern: _"If the login button changes, how many files do you have to update?"_

---

### 🧱 Core Concepts

| Concept             | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| **Page Objects**    | Classes that represent a UI page or component                   |
| **Locators**        | Centralised element selectors inside the class                  |
| **Methods**         | Abstract interactions like `login()` or `fillForm()`            |
| **State Awareness** | Optionally model page state or URLs (e.g. `isLoggedIn()` check) |

---

### 🏗️ Implementation Guide

1. **Create a `pages/` folder**

2. Define a class per logical screen (e.g., `LoginPage`, `DashboardPage`)

3. In each class:

   - Inject `Page` in the constructor
   - Store and initialise `Locator`s
   - Write atomic methods for actions

4. In your test files:

   - Create instances of page classes
   - Chain methods to express workflows cleanly

---

### 🧪 Example Walkthrough

```ts
await loginPage.navigate();
await loginPage.login("testuser", "password123");
expect(await loginPage.isLoggedIn()).toBeTruthy();
```

✅ Clear intent
✅ No selectors in the test
✅ Easy to update

---

### ⚠️ Gotchas & Tips

| Area          | Tip                                                                     |
| ------------- | ----------------------------------------------------------------------- |
| **Structure** | Keep POMs focused. One page = one class. Avoid test logic in the page.  |
| **Naming**    | Use clear method names like `submitLogin()` instead of `clickButton()`. |
| **Updates**   | Track locator changes and keep them isolated to the page object.        |
| **State**     | Don’t over-model — avoid turning POMs into business logic containers.   |

---

### ✅ Best Practices

- Keep page methods **atomic** (do one thing)
- Follow **DRY** — no repeating selectors in tests
- Keep tests declarative, **not procedural**
- Name methods based on **intent**, not mechanics

---

### 💡 Stretch Ideas (Optional)

- Add a **base `Page` class** for shared helpers (`waitForLoad()`, `getFlashMessage()`).
- Use **factories** to initialise POMs based on context (e.g. mobile vs desktop).
- Add **JSDoc/TSDoc** to document methods in each page object.
- Explore **automatic POM testing** via static assertions or smoke runs.
