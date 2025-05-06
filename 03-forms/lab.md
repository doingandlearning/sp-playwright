# Forms Testing Lab

## Lab Scenario

Participants will write a series of tests for a sample e-commerce checkout form, focusing on form interactions, validation, and submission. This lab will help you practice the concepts learned in the forms section.

## Lab Exercises

### Exercise 1: Basic Form Interaction

**Objective**: Test basic form field interactions and input.

**Steps**:
1. Navigate to the checkout page
2. Fill in shipping information
3. Test different input types
4. Verify field values

**Hints**:
- Use appropriate selectors
- Test different input methods
- Verify field values
- Handle special characters

**Stretch Goals**:
- Test keyboard navigation
- Add input masking
- Test copy/paste
- Implement field clearing

### Exercise 2: Form Validation

**Objective**: Test form validation rules and error messages.

**Steps**:
1. Test required fields
2. Verify format validation
3. Check length restrictions
4. Test error messages

**Hints**:
- Submit empty form
- Use invalid formats
- Test field limits
- Check error visibility

**Stretch Goals**:
- Test real-time validation
- Add custom validation
- Test field dependencies
- Implement error recovery

### Exercise 3: Form Submission

**Objective**: Test form submission and response handling.

**Steps**:
1. Fill valid form data
2. Submit the form
3. Handle the response
4. Verify success/failure

**Hints**:
- Wait for responses
- Check status codes
- Verify success messages
- Handle errors

**Stretch Goals**:
- Test network errors
- Add retry logic
- Implement timeout handling
- Test concurrent submissions

### Exercise 4: Complex Form Scenarios

**Objective**: Test complex form interactions and edge cases.

**Steps**:
1. Test multi-step forms
2. Handle conditional fields
3. Test file uploads
4. Verify form state

**Hints**:
- Handle step navigation
- Test field dependencies
- Manage file uploads
- Track form progress

**Stretch Goals**:
- Add form persistence
- Test form recovery
- Implement auto-save
- Add progress tracking

### Exercise 5: Form Accessibility

**Objective**: Ensure form is accessible and usable.

**Steps**:
1. Test keyboard navigation
2. Verify ARIA attributes
3. Check error announcements
4. Test focus management

**Hints**:
- Use keyboard shortcuts
- Check screen reader
- Verify focus order
- Test error handling

**Stretch Goals**:
- Add voice input
- Test with screen readers
- Implement keyboard shortcuts
- Add accessibility documentation

## Tips for Success

1. Start with basic interactions
2. Add validation testing
3. Handle form submission
4. Test edge cases
5. Consider accessibility
6. Document your approach

## Resources

- [Playwright Form Testing](https://playwright.dev/docs/input)
- [HTML Forms Guide](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [Form Validation Best Practices](https://www.w3.org/WAI/tutorials/forms/validation/)
- [Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

## Challenge Yourself

Try to implement at least one stretch goal from each exercise. Consider how you might:
- Make your tests more robust
- Improve error handling
- Enhance accessibility
- Add better validation
- Implement more comprehensive testing

## Sample Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Checkout Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkout');
  });

  test('basic form interaction', async ({ page }) => {
    // Fill shipping information
    await page.getByLabel('Full name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Address').fill('123 Main St');
    
    // Verify field values
    await expect(page.getByLabel('Full name')).toHaveValue('John Doe');
    await expect(page.getByLabel('Email')).toHaveValue('john@example.com');
  });

  test('form validation', async ({ page }) => {
    // Submit empty form
    await page.getByRole('button', { name: 'Continue to payment' }).click();
    
    // Verify error messages
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('form submission', async ({ page }) => {
    // Fill form
    await page.getByLabel('Full name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Address').fill('123 Main St');
    
    // Submit form
    await Promise.all([
      page.waitForNavigation(),
      page.getByRole('button', { name: 'Continue to payment' }).click()
    ]);
    
    // Verify success
    await expect(page).toHaveURL('/payment');
  });
});
``` 