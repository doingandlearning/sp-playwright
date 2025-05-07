## 🧪 Teaching Notes: File Uploads & Downloads in Playwright

---

### ✅ **Goal**

Learn how to **upload** files, **download** files, and **verify** their presence, contents, and integrity in automated tests using Playwright.

---

## 🔹 Part 1: Uploading Files

### 🔧 Core Concepts

| What            | How it Works                                           |
| --------------- | ------------------------------------------------------ |
| Uploading files | Use `locator.setInputFiles()` on `<input type="file">` |
| Multiple files  | Pass an array of file paths                            |
| File types      | Test images, PDFs, zips, etc.                          |
| Validation      | Assert confirmation message, file name display, etc.   |

### ✅ Example: Upload a Single File

```ts
const input = page.locator('input[type="file"]');
await input.setInputFiles("sample-image.jpg"); // relative to package.json
await page.click('button[type="submit"]');
await expect(page.locator(".success-message")).toBeVisible();
```

---

## 🔹 Part 2: Downloading Files

### 🔧 Core Concepts

| What             | How it Works                                    |
| ---------------- | ----------------------------------------------- |
| Download trigger | Click the button that triggers a download       |
| Capture event    | Use `page.waitForEvent('download')`             |
| Access file path | Use `download.path()` to get the temporary path |
| Validate content | Read file contents with `fs.readFileSync()`     |

### ✅ Example: Verify Downloaded File

```ts
const downloadPromise = page.waitForEvent("download"); // pre-clicking/pre-triggering
await page.click(".download-button");
const download = await downloadPromise;
const filePath = await download.path(); // creates a local temporary file
const content = fs.readFileSync(filePath, "utf-8");
expect(content).toContain("expected content");
```

---

## 🔹 Part 3: Best Practices

| ✅ Do This                           | ⚠️ Avoid This                        |
| ------------------------------------ | ------------------------------------ |
| Use fixtures to generate temp files  | Relying on pre-existing manual files |
| Clean up downloaded files after test | Leaving files on disk across runs    |
| Assert file contents and types       | Only checking if download occurred   |
| Simulate upload validation           | Skipping client-side upload checks   |

---

## 🧪 Gotchas & Tips

- `setInputFiles()` only works on `<input type="file">`
- You can’t upload without a visible input unless it’s exposed via JS
- File names must be relative or absolute to the test’s cwd
- `download.path()` returns a **temporary file**, which you can copy/save

## 📊 Stretch Goals

| Feature             | Suggestion                                               |
| ------------------- | -------------------------------------------------------- |
| File validation     | Check file size, extension, checksum                     |
| Cleanup helper      | Create a function that deletes test artifacts            |
| Upload constraints  | Simulate rejection of large/invalid files                |
| Download automation | Move files to test-results folder and log their contents |

---

## 💬 Discussion Prompts

- What types of uploads does your app handle (images, docs, CSV)?
- How would you test invalid file uploads?
- What risks exist around test files accumulating on CI runners?
