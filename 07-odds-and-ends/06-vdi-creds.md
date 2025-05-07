## ✅ Scenario

You want to:

- Store secrets (e.g., auth tokens, API keys, credentials) in **HashiCorp Vault**
- Fetch them **securely** into your Playwright tests
- Avoid hardcoding or leaking secrets in VDI or CI environments

---

## 🔐 Step 1: Store Secret in Vault

Use Vault CLI or API to store a secret:

```bash
vault kv put secret/playwright/email password="testpass123" username="user@example.com"
```

---

## 📦 Step 2: Install Vault Client

```bash
npm install @hashicorp/vault-client dotenv
```

You’ll also need Vault running and a token/environment-based auth setup. For VDI, often these come from `.env` + secure key injection.

---

## 📁 Step 3: `vaultClient.ts`

```ts
import Vault from "@hashicorp/vault-client";
import dotenv from "dotenv";
dotenv.config();

const vault = new Vault({
  endpoint: process.env.VAULT_ADDR, // e.g. http://127.0.0.1:8200
  token: process.env.VAULT_TOKEN,
});

export async function getSecret(path: string) {
  const { data } = await vault.read(path);
  return data.data; // KV v2 returns data.data
}
```

---

## 🧪 Step 4: Use in a Playwright Test

```ts
import { test, expect } from "@playwright/test";
import { getSecret } from "../utils/vaultClient";

test("login with Vault secrets", async ({ page }) => {
  const secrets = await getSecret("secret/playwright/email");

  await page.goto("/login");
  await page.fill("#email", secrets.username);
  await page.fill("#password", secrets.password);
  await page.click('button[type="submit"]');

  await expect(page.locator(".dashboard")).toBeVisible();
});
```

---

## 🛡️ VDI & CI Best Practices

- Store only Vault token as a secure VDI-injected env var (e.g. `VAULT_TOKEN`)
- Restrict token scope to just the needed secrets
- Never log secrets (disable `console.log()` on retrieved data)
- Use `.env` only for non-secret configuration (e.g. base URLs, Vault address)

---

## Optional: Use Fixture to Inject Secrets

You can expose secrets via Playwright fixtures:

```ts
type Secrets = { email: string; password: string };

const test = base.extend<{ creds: Secrets }>({
  creds: async ({}, use) => {
    const creds = await getSecret("secret/playwright/email");
    await use(creds);
  },
});

test("login", async ({ page, creds }) => {
  await page.goto("/login");
  await page.fill("#email", creds.username);
  await page.fill("#password", creds.password);
  await page.click('button[type="submit"]');
});
```
