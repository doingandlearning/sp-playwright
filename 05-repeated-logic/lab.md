## 🧪 Lab: Refactor from Raw Test → Helper Functions → Page Object Model

---

### ✅ **Goal**

Start with a real test you write from scratch. Then:

1. Extract repeated or low-level logic into helper functions.
2. Refactor that logic into a full Page Object.

This mirrors how good test architecture grows over time.

---

### 🧩 Part 1: Write the Initial Test

1. Pick a **simple page or flow** to test — e.g.:

   - Login page
   - Contact form
   - Product search
   - Multi-step registration form

2. Record or manually write a working test, eg:

   ```ts
   test("fill out and submit form", async ({ page }) => {
     await page.goto("https://example.com/contact");
     await page.fill("#name", "Test User");
     await page.fill("#email", "test@example.com");
     await page.click('button[type="submit"]');
     await expect(page.locator(".success")).toBeVisible();
   });
   ```

3. Make sure it passes!

---

### 🧩 Part 2: Extract Helper Functions

1. Create a new file: `helpers/form.ts`
2. Move any **repeated or multi-step logic** into a named function, eg:

   ```ts
   export async function fillContactForm(page, name, email) {
     await page.fill("#name", name);
     await page.fill("#email", email);
   }
   ```

3. Update your test to use that helper:

   ```ts
   await fillContactForm(page, "Test User", "test@example.com");
   ```

✅ At this point:

- Your test is shorter
- The intent is clearer
- Logic is reusable

---

### 🧩 Part 3: Build a Page Object

1. Create a new file: `pages/ContactPage.ts`
2. Wrap the logic in a class, eg:

   ```ts
   export class ContactPage {
     constructor(private page: Page) {}

     async goto() {
       await this.page.goto("https://example.com/contact");
     }

     async fillForm(name: string, email: string) {
       await this.page.fill("#name", name);
       await this.page.fill("#email", email);
     }

     async submit() {
       await this.page.click('button[type="submit"]');
     }

     async successMessageVisible() {
       return this.page.locator(".success").isVisible();
     }
   }
   ```

3. Update your test:

   ```ts
   const contact = new ContactPage(page);
   await contact.goto();
   await contact.fillForm("Test User", "test@example.com");
   await contact.submit();
   expect(await contact.successMessageVisible()).toBeTruthy();
   ```

✅ Now your test uses a clear, reusable, structured abstraction.

---

### 🧠 Wrap-Up Discussion

Ask:

- What made the biggest difference to clarity?
- What do you gain from helpers? From POM?
- What would you do differently next time?

---

### 🚀 Stretch Goal

- Add a new method to your Page Object for an **edge case** (e.g., missing field, invalid email).
- Write a second test that reuses the page object.
- Add a reusable assertion helper (e.g. `assertSuccessBanner(page)`).
