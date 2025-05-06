# Form Submission Testing

## Overview

Testing form submissions involves verifying the entire submission process, from user input to server response. This guide covers various aspects of form submission testing, including handling different submission methods, waiting for responses, and verifying success/failure scenarios.

## Basic Submission

### Button Click Submission

```typescript
test('submit form with button click', async ({ page }) => {
  await page.goto('/signup');
  
  // Fill form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('ValidPass123!');
  
  // Submit form
  await page.getByRole('button', { name: 'Sign up' }).click();
  
  // Verify success
  await expect(page.getByText('Welcome!')).toBeVisible();
  await expect(page).toHaveURL('/dashboard');
});
```

### Enter Key Submission

```typescript
test('submit form with enter key', async ({ page }) => {
  await page.goto('/login');
  
  // Fill form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('ValidPass123!');
  
  // Submit with enter key
  await page.getByLabel('Password').press('Enter');
  
  // Verify success
  await expect(page.getByText('Welcome back!')).toBeVisible();
});
```

## Handling Responses

### Wait for Navigation

```typescript
test('wait for navigation after submission', async ({ page }) => {
  await page.goto('/signup');
  
  // Fill form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('ValidPass123!');
  
  // Submit and wait for navigation
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('button', { name: 'Sign up' }).click()
  ]);
  
  // Verify new page
  await expect(page).toHaveURL('/dashboard');
});
```

### Wait for API Response

```typescript
test('wait for API response', async ({ page }) => {
  await page.goto('/signup');
  
  // Fill form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('ValidPass123!');
  
  // Submit and wait for API response
  const responsePromise = page.waitForResponse(
    response => response.url().includes('/api/signup')
  );
  await page.getByRole('button', { name: 'Sign up' }).click();
  const response = await responsePromise;
  
  // Verify response
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.success).toBe(true);
});
```

## Error Handling

### Network Errors

```typescript
test('handle network errors', async ({ page }) => {
  await page.goto('/signup');
  
  // Fill form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('ValidPass123!');
  
  // Simulate network error
  await page.route('**/api/signup', route => route.abort());
  
  // Submit form
  await page.getByRole('button', { name: 'Sign up' }).click();
  
  // Verify error handling
  await expect(page.getByText('Network error. Please try again.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeEnabled();
});
```

### Server Errors

```typescript
test('handle server errors', async ({ page }) => {
  await page.goto('/signup');
  
  // Fill form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('ValidPass123!');
  
  // Simulate server error
  await page.route('**/api/signup', async route => {
    await route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    });
  });
  
  // Submit form
  await page.getByRole('button', { name: 'Sign up' }).click();
  
  // Verify error handling
  await expect(page.getByText('Server error. Please try again later.')).toBeVisible();
});
```

## Complex Submissions

### Multi-step Forms

```typescript
test('multi-step form submission', async ({ page }) => {
  await page.goto('/checkout');
  
  // Step 1: Shipping
  await page.getByLabel('Address').fill('123 Main St');
  await page.getByLabel('City').fill('New York');
  await page.getByRole('button', { name: 'Next' }).click();
  
  // Step 2: Payment
  await page.getByLabel('Card number').fill('4111111111111111');
  await page.getByLabel('Expiry date').fill('12/25');
  await page.getByRole('button', { name: 'Next' }).click();
  
  // Step 3: Review
  await page.getByRole('button', { name: 'Place order' }).click();
  
  // Verify success
  await expect(page.getByText('Order placed successfully!')).toBeVisible();
});
```

### File Upload Submission

```typescript
test('submit form with file upload', async ({ page }) => {
  await page.goto('/profile');
  
  // Fill form
  await page.getByLabel('Name').fill('John Doe');
  
  // Upload file
  await page.getByLabel('Profile picture').setInputFiles('path/to/photo.jpg');
  
  // Submit form
  await page.getByRole('button', { name: 'Save' }).click();
  
  // Verify success
  await expect(page.getByText('Profile updated successfully')).toBeVisible();
});
```

## Best Practices

1. **Handle All States**
   - Loading states
   - Success states
   - Error states
   - Disabled states

2. **Verify Responses**
   - Check status codes
   - Validate response data
   - Handle error cases
   - Verify UI updates

3. **Test Edge Cases**
   - Network timeouts
   - Server errors
   - Invalid responses
   - Partial submissions

4. **Consider UX**
   - Loading indicators
   - Error messages
   - Success feedback
   - Form reset

## Common Gotchas

1. **Timing Issues**
   - Race conditions
   - Response delays
   - Navigation timing
   - State updates

2. **Error Handling**
   - Network errors
   - Server errors
   - Validation errors
   - Timeout errors

3. **State Management**
   - Form reset
   - Error clearing
   - Loading states
   - Success states

## Tips for Success

1. Test all submission methods
2. Verify response handling
3. Check error scenarios
4. Test loading states
5. Verify success cases
6. Document submission flow

## Resources

- [Playwright Network](https://playwright.dev/docs/network)
- [Form Submission Best Practices](https://www.w3.org/WAI/tutorials/forms/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 