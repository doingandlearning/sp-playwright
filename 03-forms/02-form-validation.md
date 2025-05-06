# Form Validation Testing

## Overview

Form validation is crucial for ensuring data integrity and user experience. This guide covers how to test various types of form validation using Playwright, including client-side validation, server-side validation, and complex validation scenarios.

## Client-Side Validation

### Required Fields

```typescript
test('required field validation', async ({ page }) => {
  await page.goto('/signup');
  
  // Submit form without filling required fields
  await page.getByRole('button', { name: 'Sign up' }).click();
  
  // Check error messages
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
  
  // Fill one field and check other remains invalid
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByText('Password is required')).toBeVisible();
  await expect(page.getByText('Email is required')).not.toBeVisible();
});
```

### Format Validation

```typescript
test('email format validation', async ({ page }) => {
  await page.goto('/signup');
  
  // Test invalid email formats
  const invalidEmails = [
    'plainaddress',
    '@domain.com',
    'name@',
    'name@domain',
    'name@.com'
  ];
  
  for (const email of invalidEmails) {
    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  }
  
  // Test valid email
  await page.getByLabel('Email').fill('valid@example.com');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByText('Please enter a valid email')).not.toBeVisible();
});
```

### Length and Pattern Validation

```typescript
test('password validation', async ({ page }) => {
  await page.goto('/signup');
  
  // Test password length
  await page.getByLabel('Password').fill('short');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  
  // Test password pattern
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByText('Password must contain at least one uppercase letter')).toBeVisible();
  
  // Test valid password
  await page.getByLabel('Password').fill('ValidPass123!');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByText('Password must contain')).not.toBeVisible();
});
```

## Server-Side Validation

### API Validation

```typescript
test('server-side validation', async ({ page }) => {
  await page.goto('/signup');
  
  // Test duplicate email
  await page.getByLabel('Email').fill('existing@example.com');
  await page.getByLabel('Password').fill('ValidPass123!');
  
  // Intercept API response
  await page.route('**/api/signup', async route => {
    await route.fulfill({
      status: 400,
      body: JSON.stringify({ error: 'Email already exists' })
    });
  });
  
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByText('Email already exists')).toBeVisible();
});
```

### Complex Validation

```typescript
test('complex form validation', async ({ page }) => {
  await page.goto('/profile');
  
  // Test interdependent fields
  await page.getByLabel('Country').selectOption('US');
  await page.getByLabel('State').selectOption('CA');
  await page.getByLabel('Zip code').fill('12345');
  
  // Test conditional validation
  await page.getByLabel('Subscribe to newsletter').check();
  await expect(page.getByLabel('Newsletter preferences')).toBeVisible();
  
  // Test field dependencies
  await page.getByLabel('Payment method').selectOption('credit-card');
  await expect(page.getByLabel('Card number')).toBeVisible();
  await expect(page.getByLabel('Expiry date')).toBeVisible();
});
```

## Real-Time Validation

```typescript
test('real-time validation', async ({ page }) => {
  await page.goto('/signup');
  
  // Test validation on input
  await page.getByLabel('Username').fill('a');
  await expect(page.getByText('Username must be at least 3 characters')).toBeVisible();
  
  // Test validation on blur
  await page.getByLabel('Email').fill('invalid');
  await page.getByLabel('Email').blur();
  await expect(page.getByText('Please enter a valid email')).toBeVisible();
  
  // Test validation on change
  await page.getByLabel('Password').fill('weak');
  await expect(page.getByText('Password is too weak')).toBeVisible();
});
```

## Best Practices

1. **Test Validation Timing**
   - Immediate validation
   - On-blur validation
   - On-submit validation

2. **Test Error Messages**
   - Message content
   - Message visibility
   - Message clearing

3. **Test Field Interactions**
   - Field dependencies
   - Conditional fields
   - Field clearing

4. **Test Edge Cases**
   - Special characters
   - Long inputs
   - Empty inputs
   - Whitespace

## Common Gotchas

1. **Validation Timing**
   - Race conditions
   - Debounced validation
   - Async validation

2. **Error Message Handling**
   - Message persistence
   - Message updates
   - Message clearing

3. **Browser Differences**
   - Validation timing
   - Input events
   - Error handling

## Tips for Success

1. Test all validation rules
2. Verify error messages
3. Check validation timing
4. Test field interactions
5. Consider edge cases
6. Document validation rules

## Resources

- [HTML5 Validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)
- [Form Validation Patterns](https://www.w3.org/WAI/tutorials/forms/validation/)
- [Playwright Form Testing](https://playwright.dev/docs/input) 