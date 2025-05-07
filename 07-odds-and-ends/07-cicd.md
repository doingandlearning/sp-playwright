## ✅ CI/CD Playwright Testing Flow

### 🏗️ 1. **Install dependencies**

Clean install, used in automated environments

```bash
npm ci
```

### 🚀 2. **Start your app**

You want your frontend running — often on localhost (e.g., `http://localhost:3000`) or a Docker container.

Example in CI:

```bash
npm run build
npm run preview &  # Or: npm run dev &  npx serve  - 8080, 3000, 8000 5173
```

In Playwright config:

```ts
use: {
  baseURL: "http://localhost:3000";
}
```

Optionally wait with `npx wait-on http://localhost:3000`

---

### 🧪 3. **Run Playwright tests**

```bash
npx playwright test
```

Tests use `page.goto('/')` — Playwright prefixes with `baseURL`.

---

### 🧰 4. **Example: GitHub Actions CI**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install deps
        run: npm ci

      - name: Build app
        run: npm run build

      - name: Start server
        run: npm run preview &

      - name: Wait for app
        run: npx wait-on http://localhost:3000

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 🧱 Project Structure

- `playwright.config.ts`: sets `baseURL`, headless mode, retries, etc.
- `tests/`: Playwright tests
- `apps/frontend/`: Your actual app
- CI pipeline: spins up server and runs tests

---

## 🧠 CI Tips

| Practice                    | Why                                    |
| --------------------------- | -------------------------------------- |
| Use `wait-on` or `liveness` | Ensure app is ready before tests       |
| Set `baseURL` in config     | Avoid hardcoded URLs                   |
| Run tests headless          | Avoid CI display issues                |
| Capture trace/screenshots   | Debug failing CI runs                  |
| Use retries for flakes      | `retries: 2` in `playwright.config.ts` |

---

## Optional Enhancements

- Use `npx playwright install-deps` on Linux runners
- Parallelise test runs
- Report results to GitHub UI (via Playwright HTML report or Allure)
