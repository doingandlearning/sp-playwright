## Teaching Notes

✅ **Goal**: Automate form filling, validation, and submission with comprehensive error handling.

### Talking Points

- Form Input Methods:
  - `page.fill()` for text inputs
  - `page.type()` for simulated typing
  - `page.press()` for keyboard events
  - `page.check()` for checkboxes and radio buttons
  - `page.selectOption()` for dropdowns
  - `page.setInputFiles()` for file uploads
- Form Submission:
  - Different submit methods (button click, form submit, Enter key)
  - Handling form validation
  - Managing form state
- Form Validation:
  - Required field validation
  - Format validation (email, phone, etc.)
  - Custom validation rules
  - Error message handling

### Gotchas / Tips

```js
// [name, setName]  -> useState()
<label htmlFor="name">Name:</label>
<input value={name} onChange={() => }  name="name" id="name" data-test-id="nameField" />
```

- Form Identification:
  - Use stable selectors (name, id, data-testid)
  - Handle dynamic form fields
  - Consider form field order
- Timing and State:
  - Wait for form to be ready
  - Handle loading states
  - Manage form reset
- Validation:
  - Test all validation rules
  - Check error message visibility
  - Verify field highlighting
- Cross-browser:
  - Handle browser-specific form behaviors
  - Test different input methods
  - Consider accessibility

### Example

```typescript
import { test, expect } from "@playwright/test";

test("fill and submit registration form", async ({ page }) => {
  await page.goto(
    "https://www.scottishpower-businesssales.co.uk/energy-search/electricity"
  );

  // Fill basic information
  await page.fill('[name="firstName"]', "John");
  await page.fill('[name="lastName"]', "Doe");
  await page.fill('[name="email"]', "john.doe@example.com");

  // Handle password with confirmation
  await page.fill('[name="password"]', "SecurePass123!");
  await page.fill('[name="confirmPassword"]', "SecurePass123!");

  // Select from dropdown
  await page.selectOption('[name="country"]', "US");

  // Handle checkboxes
  await page.check('[name="terms"]');
  await page.check('[name="newsletter"]');

  // Submit form
  await page.click('button[type="submit"]');

  // Verify success
  await expect(page).toHaveURL(/success/);
  await expect(page.locator(".success-message")).toBeVisible();
});

// Test form validation
test("validate registration form", async ({ page }) => {
  await page.goto("https://example.com/register");

  // Test required fields
  await page.click('button[type="submit"]');
  await expect(page.locator(".error-message")).toContainText(
    "First name is required"
  );

  // Test email format
  await page.fill('[name="email"]', "invalid-email");
  await page.click('button[type="submit"]');
  await expect(page.locator(".error-message")).toContainText(
    "Invalid email format"
  );

  // Test password match
  await page.fill('[name="password"]', "pass1");
  await page.fill('[name="confirmPassword"]', "pass2");
  await page.click('button[type="submit"]');
  await expect(page.locator(".error-message")).toContainText(
    "Passwords do not match"
  );
});

// Helper function for form filling
async function fillForm(page, data) {
  for (const [field, value] of Object.entries(data)) {
    const selector = `[name="${field}"]`;
    if ((await page.locator(selector).getAttribute("type")) === "checkbox") {
      if (value) await page.check(selector);
      else await page.uncheck(selector);
    } else if (await page.locator(selector).is("select")) {
      await page.selectOption(selector, value);
    } else {
      await page.fill(selector, value);
    }
  }
}

// Test with helper function
test("use form filling helper", async ({ page }) => {
  await page.goto("https://example.com/register");

  const formData = {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "SecurePass123!",
    confirmPassword: "SecurePass123!",
    country: "UK",
    terms: true,
    newsletter: false,
  };

  await fillForm(page, formData);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/success/);
});
```

### Stretch Goal

- Write a test covering invalid input and asserting error messages
- Implement form field validation helper functions
- Test form accessibility and keyboard navigation
- Add visual regression testing for form states
- Test form with different screen sizes
- Implement form data persistence
- Test form with different input methods (keyboard, mouse)
- Add performance testing for form interactions
- Test form with different languages
- Implement form state management
