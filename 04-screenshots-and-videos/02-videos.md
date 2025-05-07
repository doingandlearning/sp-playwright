## 🧪 Teaching Notes: Video Recording in Playwright

---

### ✅ **Goal**

Equip learners to **record, configure, store, and analyse test execution videos** for debugging and collaboration.

---

### 🎯 **Why Record Videos?**

- See what went wrong without rerunning the test
- Share failures with teammates or stakeholders
- Diagnose flaky or timing-sensitive issues
- Support visual documentation or demo purposes

---

### 📂 **Topics to Cover**

#### 1. 🎥 **Video Recording Basics**

| **Concept** | **Description**                                   |
| ----------- | ------------------------------------------------- |
| What?       | Browser session recording (like screen capture)   |
| Why?        | Debugging, reproducibility, CI traceability       |
| When?       | On failure, always, or custom conditions          |
| How?        | Automatically via Playwright config or test hooks |

---

#### 2. ⚙️ **Configuration in `playwright.config.ts`**

```ts
export default {
  use: {
    video: "on", // or 'retain-on-failure' or 'off'
  },
  projects: [
    {
      name: "chromium",
      use: { video: "retain-on-failure" },
    },
  ],
};
```

| Option                | Meaning                           |
| --------------------- | --------------------------------- |
| `'on'`                | Always record every test          |
| `'retain-on-failure'` | Only keep video if the test fails |
| `'off'`               | No video recording                |

Optional settings:

- `size`: resolution (`{ width: 1280, height: 720 }`)
- `outputDir`: where videos are saved (`test-results/`, `videos/`)

---

#### 3. 🧠 **Optimisation & Management Tips**

| **Area**    | **Tips**                                                               |
| ----------- | ---------------------------------------------------------------------- |
| File size   | Use `'retain-on-failure'` to avoid bloating storage                    |
| Duration    | Avoid long tests or loops that bloat recordings                        |
| Disk space  | Auto-clean videos on success; archive selectively                      |
| Performance | Headless browsers + video recording add CPU cost — watch test duration |

---

#### 4. 📦 **Video Storage & Retention**

| **Practice**       | **Why It Matters**                                   |
| ------------------ | ---------------------------------------------------- |
| Organised folders  | Easier CI artefact traceability                      |
| Cleanup scripts    | Avoid long-term disk bloat in CI                     |
| Sharing strategies | Post to Slack, attach to bug reports, link from CI   |
| Security concerns  | Videos may contain sensitive user flows or test data |

---

### ✅ **Live Code Examples**

```ts
test("record video of full flow", async ({ page }) => {
  await page.goto("https://example.com");
  await page.click("text=Login");
  await expect(page).toHaveURL(/dashboard/);
});
```

🎯 Point out: No extra code is needed — video is handled by config.

---

### ⚠️ **Gotchas & Edge Cases**

| Issue                     | Workaround or Fix                                                  |
| ------------------------- | ------------------------------------------------------------------ |
| Huge videos in CI         | Use `'retain-on-failure'` or clean up in `afterAll`                |
| No useful output on crash | Pair videos with traces/screenshots for full context               |
| Sensitive data in video   | Blur/redact elements if necessary                                  |
| Slowdowns                 | Run video capture only on debug/CI builds if performance-sensitive |

---

### 💡 **Stretch Ideas**

If time allows, show:

- Extracting and archiving videos from `test-results/`
- Naming files dynamically (`path: \`videos/\${testInfo.title}.mp4\`\`)
- Hooking into `onTestEnd` for custom retention logic

```js
    video: "retain-on-failure",
    viewport: {
      width: 1920, height: 1080
    },
    launchOptions: {
      slowMo: 50
    }
```
