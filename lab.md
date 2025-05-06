# Lab 1: Setting Up and Running Your First Playwright Test

## **Objective**

By the end of this lab, you will:

- Set up a Playwright project.
- Write and run your first basic test.
- Understand Playwright's test runner output.

---

## **Lab Instructions**

### 1️⃣ Create a New Playwright Project

- In your terminal, navigate to your project directory.
- Run the following command:

```bash
npm init playwright@latest
```

Choose these options:

- **TypeScript** setup.
- Include **all browsers** (Chromium, Firefox, WebKit).
- Add a **GitHub Actions** workflow (optional for stretch goal).

### 2️⃣ Explore Project Files

- Open the project folder.
- Look at:

  - `tests/example.spec.ts` — the sample test provided.
  - `playwright.config.ts` — your configuration file.
  - `package.json` — project dependencies and scripts.

### 3️⃣ Run the Sample Test

- Execute:

```bash
npx playwright test
```

- Observe:

  - Which tests run?
  - Are they running headless?
  - How long do they take?

### 4️⃣ Modify the Sample Test

- Open `example.spec.ts`.
- Change the tested URL to:

```typescript
await page.goto("https://www.wikipedia.org");
```

- Update the assertion to check:

```typescript
await expect(page).toHaveTitle(/Wikipedia/);
```

### 5️⃣ Run the Test Again

- Re-run:

```bash
npx playwright test
```

- Confirm the test now checks Wikipedia’s homepage.

### ✅ **Checkpoint**

You should now have:

- A working Playwright project.
- A modified test targeting a real website.

---

## **Stretch Goals** 🚀

1. **Run Tests Headed**

   - Try:

```bash
npx playwright test --headed
```

- Watch the browser open and see the test steps.

2. **Generate a New Test Using Codegen**

   - Start codegen:

```bash
npx playwright codegen https://www.wikipedia.org
```

- Interact manually with the page and watch the script generate.
- Save and run the generated script as a new test file.

3. **Check Report Output**

   - Run:

```bash
npx playwright show-report
```

- Explore the detailed HTML report generated for your test run.
