import { test, expect } from "@playwright/test";

test("the response is correctly formed", async ({
  page,
  request,
}, testInfo) => {
  if (testInfo.project.name !== "chromium") {
    test.skip();
  }
  // page.request() -> makes an API request from the context of the page
  // request
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBe(10);
});

test("create user, product, and order", async ({ request }) => {
  const user = await (
    await request.post("/api/users", {
      data: { name: "Alice", email: "alice@example.com" },
    })
  ).json();

  const product = await (
    await request.post("/api/products?maxPrice=100", {
      data: { name: "Widget", price: 19.99 },
      headers: { Authorization: "", "x-api-key": "" },
    })
  ).json();

  const order = await (
    await request.post("/api/orders", {
      data: {
        userId: user.id,
        products: [{ productId: product.id, quantity: 2 }],
      },
    })
  ).json();

  expect(order).toHaveProperty("id");
  expect(order.products[0].productId).toBe(product.id);
});
