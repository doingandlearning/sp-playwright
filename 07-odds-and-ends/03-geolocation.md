## 🧪 Teaching Notes: Geolocation in Playwright

---

### ✅ **Goal**

Teach learners how to simulate a user’s location in Playwright tests using browser context configuration.

---

### 🧠 Why Geolocation Matters

| Real-World Use Case                    | Testing Benefit                                |
| -------------------------------------- | ---------------------------------------------- |
| Localised content (e.g. weather, news) | Test correct region-specific rendering         |
| Store finders / maps                   | Verify map centring and location-based results |
| Access restrictions (by country)       | Simulate blocked or redirected content         |

---

### 🔧 Enabling Geolocation in Playwright

Geolocation is a **browser-level setting**. You configure it by:

1. Passing `geolocation` to `browser.newContext(...)`
2. Granting the `geolocation` **permission**

---

### ✅ Code Example: Basic Geolocation Test

```ts
import { test, expect } from "@playwright/test";

test("shows correct location-based content", async ({ browser }) => {
  const context = await browser.newContext({
    geolocation: { latitude: 51.5074, longitude: -0.1278 }, // London
    permissions: ["geolocation"],
  });
  const page = await context.newPage();
  await page.goto("https://your-app.com/nearby");

  await expect(page.locator(".location")).toContainText("London");
});
```

---

### ⚠️ Common Gotchas

| Problem                                                | Fix                                                                  |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| Location doesn't change or app says "location blocked" | Add `permissions: ['geolocation']` to context                        |
| App doesn’t use browser geolocation                    | Test is ineffective — mock the backend API or location manually      |
| Test fails intermittently                              | Page may load before geolocation is queried — wait or assert clearly |

---

### 📚 Stretch Goals

- Test what happens when geolocation permission is **denied**
- Mock multiple users in different locations simultaneously (multi-context)
- Integrate with map APIs (e.g. Leaflet, Google Maps) and test marker visibility
