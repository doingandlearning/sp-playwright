## 🧪 Teaching Notes: Screenshots in Playwright

---

### ✅ **Learning Goal**

Enable learners to confidently **capture, configure, and compare screenshots** in Playwright for debugging and visual regression testing.

---

### 🎯 **Why Screenshots Matter**

- Catch visual bugs early — layout shifts, hidden elements, theme issues.
- Aid debugging — see what the page looked like when the test failed.
- Support CI feedback — visual diffs make regressions obvious to teams.

---

### 🗂️ **Topics to Cover**

#### 1. 📸 **Types of Screenshots**

| Type                   | Use Case Example                            |
| ---------------------- | ------------------------------------------- |
| `page.screenshot()`    | Full-page or viewport capture for reporting |
| `element.screenshot()` | Target a specific component or area         |
| `toHaveScreenshot()`   | For visual regression with auto-compare     |

---

#### 2. ⚙️ **Configuration Options**

Highlight config via `playwright.config.ts` or per-test:

- `fullPage: true | false`
- `path: 'screenshots/foo.png'`
- `quality: 0–100` (for JPEG)
- `animations: disabled` (remove flakiness)
- Best practice: store under `screenshots/` or `test-results/`

---

#### 3. 🧪 **Visual Regression Testing**

Using:

```ts
await expect(page).toHaveScreenshot("expected-name.png");
```

- Compares against a **baseline image**.
- Fails if images differ beyond threshold.
- You can customise diff settings in config.

---

### ⚠️ **Gotchas and Tips**

| Area       | Common Pitfalls / Advice                                                    |
| ---------- | --------------------------------------------------------------------------- |
| Capture    | Disable animations and transitions. Wait for stable state before capturing. |
| Elements   | Use `element.screenshot()` when targeting dynamic UI components.            |
| Flakiness  | Avoid capturing during loading spinners or popups.                          |
| Comparison | Tune `maxDiffPixelRatio` or `threshold`. Watch for false positives.         |
| Storage    | Clean up old screenshots. Version-control only baselines, not all diffs.    |

---

### 💡 **Live Code Examples**

```ts
await page.screenshot({ path: "full.png", fullPage: true });

const logo = page.locator(".site-logo");
await logo.screenshot({ path: "logo.png" });

await expect(page).toHaveScreenshot("home.png");
```

Show how these images appear in `test-results/` or CI artifacts.

---

### 🧪 **Practical Lab Ideas**

- Capture full-page and element screenshots.
- Trigger a failing `toHaveScreenshot()` on purpose to see a diff.
- Add a wait to capture a stable state (`await page.waitForLoadState()`).

---

### 🚀 **Stretch Goals (Optional)**

If time allows:

- Create a custom helper: `captureAndCompare(page, 'login')`
- Show archiving screenshots by date/test run
- Explore screenshot diffs in GitHub Actions or with custom tooling
