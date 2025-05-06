# Playwright Testing Workshop

- Date: Tuesday 6th and Wednesday 7th May
- Instructor: Kevin Cunningham
  - Email: kevin@kevincunningham.co.uk
  - Website: https://kevincunningham.co.uk
- Repo link: [Repo Link](https://github.com/doingandlearning/sp-playwright)
- Feedback link: [Feedback]()
- Miro board: [Miro](https://miro.com/app/board/uXjVI52kWYA=/?share_link_id=349755520538)

## Timings:

- 9:30-11:00 Session 1
- 11:00-11:15 Coffee Break
- 11:15-12:45 Session 2
- 12:45-1:45 Lunch Break
- 1:45-3:15 Session 3
- 3:15-3:30 Tea Break
- 3:30-4:30 Session 4

## Aim

By the end of this two-day workshop, participants will have a strong understanding of Playwright’s capabilities and advanced testing patterns. They will also be comfortable applying Page Object Model and working with APIs, databases, and more complex testing scenarios.

---

### Introduction and Setup

- **Objectives**:

  - Introduce Playwright/TypeScript - why use a tool like Playwright?
  - Quick overview of Playwright’s key features.

- **Lab**:
  - Setting up the Playwright project.
  - Running the first basic test.

### Basics of Writing and Running Tests

- **Lab**:
  - Write a basic test.
  - Use `expect` assertions.
  - Use Playwright codegen to generate a test, and modify it to fit the real-world scenario.

---

### Test Organization and Reusability

1. **Test Organization**

   - Folder structures for maintainable projects.
   - Grouping related tests and using `describe` blocks.
   - Managing test data efficiently.

2. **Parameterization (Deeper)**
   - Discuss parameterized tests in depth, including edge cases.
   - Using different types of external data sources (CSV, JSON, databases).

- **Lab**:
  - Implement a parameterized test using external data sources.
  - Run tests with dynamic data and discuss test outcome interpretation.

---

### Hooks and Advanced Features

1. **Advanced Hooks**:

   - Going deeper into `beforeAll`, `beforeEach`, `afterEach`, and `afterAll`.
   - Use cases for each type of hook.

2. **Screenshots and Videos**:
   - Capturing screenshots and video of tests.
   - Configure for debugging and reporting.

- **Lab**:
  - Use hooks to set up test preconditions.
  - Capture screenshots and videos, and inspect results.

### Page Object Model

1. **Introduction to Page Object Model (POM)**

   - Why POM matters for scalable tests.
   - How to implement POM in Playwright.

2. **Advanced POM**
   - Managing complex UI flows and component abstractions.
   - Strategies for maintaining POMs in larger projects.

- **Lab**
  - Refactor an existing test suite into POM.
  - Implement a Page Object that represents a web page with multiple interactions.

### API Testing with Playwright

1. **API Requests in Playwright**

   - Testing APIs using Playwright's `request` feature.
   - Simulating user flows that interact with APIs.

2. **Mocking APIs**
   - Using Playwright to mock API responses.
   - Stubbing network requests for testing different scenarios.

- **Lab**:
  - Write tests that hit real APIs, and then refactor the tests to mock the API calls.

---

### Handling Complex Scenarios

1. **File Uploads and Downloads**

   - Testing file upload and download flows.
   - Validating file content post-download.

2. **Cross-browser and Mobile Testing**

   - Testing on multiple browsers: Chromium, WebKit, and Firefox.
   - Setting up mobile emulation and real-device testing with Playwright.

3. **Performance Testing**
   - Using Playwright to simulate high-load scenarios.
   - Identifying performance bottlenecks in your tests.

- **Lab**:
  - Test file uploads and downloads.
  - Set up and run tests on mobile devices and different browsers.
  - Simulate and test performance degradation.

---

### Wrap-Up and Q&A

## Additional Topics for Consideration (Optional for Q&A or Labs)

- **Playwright Tracing**: Capturing and replaying traces for deeper investigation.
- **Localisation Testing**: Running tests across multiple languages and regions.
- **Web Accessibility**: Testing for accessibility issues using Playwright and tools like Axe.
- **Advanced browser features**: Geolocation, permissions, and mobile testing.
- **Reporting and metrics**: how to collect, analyse, and act on test reports.
