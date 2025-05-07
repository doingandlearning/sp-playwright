## Teaching Notes

✅ **Goal**: Learn how to effectively manage viewports for responsive testing in Playwright.

### Talking Points

- Viewport Basics:
  - What is viewport testing
  - Why test different viewports
  - Common viewport sizes
  - Device emulation
- Configuration:
  - Viewport settings
  - Device profiles
  - Screen orientation
  - Pixel ratio
- Responsive Testing:
  - Breakpoint testing
  - Layout testing
  - Content adaptation
  - Touch targets
- Device Emulation:
  - Mobile devices
  - Tablets
  - Desktop
  - Custom devices

### Gotchas / Tips

- Viewport:
  - Handle dynamic content
  - Consider scrollbars
  - Manage popups
  - Handle fixed elements
- Device:
  - Emulate touch events
  - Handle device features
  - Consider performance
  - Manage memory
- Testing:
  - Test all breakpoints
  - Verify content flow
  - Check touch areas
  - Validate layout

### Example Structure

```typescript
// playwright.config.ts
export default {
  use: {
    viewport: { width: 1280, height: 720 },
  },
};

// tests/viewport.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Viewport Tests", () => {
  test("test mobile view", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("https://example.com");
    // Test mobile layout
  });

  test("test tablet view", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("https://example.com");
    // Test tablet layout
  });

  test("test responsive breakpoints", async ({ page }) => {
    const breakpoints = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 375, height: 667 }, // iPhone 8
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // iPad landscape
      { width: 1280, height: 720 }, // Desktop
    ];

    for (const size of breakpoints) {
      await page.setViewportSize(size);
      await page.goto("https://example.com");
      // Test layout at each breakpoint
    }
  });
});
```
