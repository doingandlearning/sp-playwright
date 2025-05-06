# Playwright Basics Lab

## Lab Scenario

Participants will write a series of tests for a sample e-commerce website, focusing on core Playwright concepts learned in the basics section. This lab will help you practice writing your first tests, checking components, handling cookie banners and selecting elements like a user.

## Lab Exercises

### Exercise 1: Your First Test

**Objective**: Write your first Playwright test from scratch.

**Steps**:

1. Create a new test file
2. Navigate to the homepage
3. Verify the page title
4. Check the main heading

**Hints**:

- Use `test` and `expect` from `@playwright/test`
- Remember to `await` async operations
- Use proper error handling
- Check for both success and failure cases

**Stretch Goals**:

- Add timeout configurations
- Implement retry logic
- Add custom error messages
- Test multiple pages

### Exercise 2: Component Checking

**Objective**: Verify the presence and properties of key UI components.

**Steps**:

1. Check the navigation menu
2. Verify the search box
3. Test the shopping cart icon
4. Validate the footer links

**Hints**:

- Use different selector strategies
- Check element visibility
- Verify attributes and text content
- Handle dynamic content

**Stretch Goals**:

- Add accessibility checks
- Test responsive layouts
- Implement visual regression
- Check component states

### Exercise 3: Cookie Banner Handling

**Objective**: Test the cookie consent banner functionality.

**Steps**:

1. Verify banner appears on first visit
2. Test accept/reject buttons
3. Check banner disappears after action
4. Verify persistence of choice

**Hints**:

- Handle initial page load
- Check banner visibility
- Test button interactions

**Stretch Goals**:

- Test different banner states
- Verify cookie settings
- Check banner accessibility
- Test banner animations

## Tips for Success

1. Start with basic functionality
2. Use codegen to understand the page structure
3. Leverage TypeScript features
4. Write maintainable selectors
5. Consider edge cases
6. Document your approach

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [VSCode Playwright Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [ARIA Roles Reference](https://www.w3.org/TR/wai-aria/#role_definitions)

## Challenge Yourself

Try to implement at least one stretch goal from each exercise. Consider how you might:

- Make your tests more robust
- Improve type safety
- Enhance debugging capabilities
- Add better error handling
- Implement more comprehensive testing
