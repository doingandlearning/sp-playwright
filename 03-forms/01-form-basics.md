# Form Testing Basics

## Overview

Forms are a critical part of web applications, and testing them effectively requires understanding various input types, validation, and submission processes. This guide covers the fundamental aspects of form testing with Playwright.

## Common Form Elements

### Text Inputs

```typescript
// Basic text input
await page.getByLabel('Username').fill('testuser');
await page.getByPlaceholder('Enter email').fill('test@example.com');

// With validation
await page.getByRole('textbox', { name: 'Email' }).fill('invalid-email');
await expect(page.getByText('Please enter a valid email')).toBeVisible();
```

### Checkboxes and Radio Buttons

```typescript
// Checkboxes
await page.getByLabel('Remember me').check();
await page.getByLabel('Subscribe to newsletter').uncheck();

// Radio buttons
await page.getByLabel('Standard shipping').check();
await expect(page.getByLabel('Express shipping')).not.toBeChecked();
```

### Select Dropdowns

```typescript
// Single select
await page.getByLabel('Country').selectOption('US');

// Multiple select
await page.getByLabel('Interests').selectOption(['sports', 'music']);

// Select by value
await page.getByLabel('Payment method').selectOption({ value: 'credit-card' });
```

### File Uploads

```typescript
// Single file
await page.getByLabel('Upload photo').setInputFiles('path/to/photo.jpg');

// Multiple files
await page.getByLabel('Upload documents').setInputFiles([
  'path/to/doc1.pdf',
  'path/to/doc2.pdf'
]);
```

## Form Submission

### Basic Submission

```typescript
// Click submit button
await page.getByRole('button', { name: 'Submit' }).click();

// Press Enter
await page.getByRole('textbox', { name: 'Search' }).press('Enter');

// Submit form
await page.getByRole('form').evaluate(form => form.submit());
```

### Handling Submissions

```typescript
// Wait for navigation
await Promise.all([
  page.waitForNavigation(),
  page.getByRole('button', { name: 'Submit' }).click()
]);

// Wait for response
await Promise.all([
  page.waitForResponse(response => response.url().includes('/api/submit')),
  page.getByRole('button', { name: 'Submit' }).click()
]);
```

## Form Validation

### Client-Side Validation

```typescript
// Required fields
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByText('This field is required')).toBeVisible();

// Format validation
await page.getByLabel('Email').fill('invalid-email');
await expect(page.getByText('Please enter a valid email')).toBeVisible();

// Length validation
await page.getByLabel('Password').fill('short');
await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
```

### Server-Side Validation

```typescript
// Handle server errors
await page.getByLabel('Username').fill('existing-user');
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByText('Username already exists')).toBeVisible();

// Handle API errors
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByText('Server error. Please try again.')).toBeVisible();
```

## Best Practices

1. **Use Semantic Selectors**
   - Prefer `getByRole`, `getByLabel`, `getByPlaceholder`
   - Avoid CSS selectors when possible
   - Use test IDs for dynamic content

2. **Handle Async Operations**
   - Always await form submissions
   - Wait for navigation or responses
   - Handle loading states

3. **Validate Form State**
   - Check field values
   - Verify error messages
   - Test disabled states

4. **Test Edge Cases**
   - Empty submissions
   - Invalid inputs
   - Special characters
   - Long inputs

## Common Gotchas

1. **Timing Issues**
   - Form submission delays
   - Validation timing
   - Loading states

2. **Dynamic Content**
   - Changing error messages
   - Dynamic validation
   - Conditional fields

3. **Browser Differences**
   - Input behavior
   - Validation timing
   - Event handling

## Tips for Success

1. Start with basic form interactions
2. Add validation testing
3. Handle submission scenarios
4. Test error cases
5. Consider accessibility
6. Document form behavior

## Resources

- [Playwright Form Testing](https://playwright.dev/docs/input)
- [HTML Forms Guide](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [Form Validation Best Practices](https://www.w3.org/WAI/tutorials/forms/validation/) 