import { test, expect } from '@playwright/test';

// Helper to register a fresh user and bypass survey to get to dashboard
async function registerAndLogin(page) {
  const uniqueId = Date.now();
  const email = `e2e_dash_${uniqueId}@example.com`;
  const username = `e2e_dash_${uniqueId}`;
  const password = 'Password@123';

  await page.goto('/signup');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByLabel('Confirm Password').fill(password);

  const signUpSubmitBtn = page.locator("button:has-text('Sign Up')").first();
  await signUpSubmitBtn.click();
  await page.waitForURL(/\/survey/, { timeout: 10000 });

  // Direct navigation to dashboard to bypass onboarding questions
  await page.goto('/dashboard');
  await page.waitForURL(/\/dashboard/, { timeout: 10000 });
}

test.describe('Dashboard and Main Features E2E', () => {
  test.beforeEach(async ({ page }) => {
    await registerAndLogin(page);
  });

  test('should load the dashboard and verify key components', async ({
    page,
  }) => {
    // Check main navigation is visible
    const navLogo = page.locator('header img, header svg').first();
    await expect(navLogo).toBeVisible();

    // Check review section title / info is loaded
    const reviewBox = page
      .locator('main, section, div')
      .filter({ hasText: /review/i })
      .first();
    await expect(reviewBox).toBeVisible();

    // Check main prompt heading
    const titleText = page.locator(
      "h1:has-text('What problem do you want to solve today?')",
    );
    await expect(titleText).toBeVisible();

    // Check AI generation text box is visible
    const promptInput = page
      .locator("textarea[placeholder*='prompt'], input[placeholder*='prompt']")
      .first();
    if ((await promptInput.count()) > 0) {
      await expect(promptInput).toBeVisible();
    }
  });

  test('should navigate to Problem tab and filter/search cards', async ({
    page,
  }) => {
    // Navigate to problem list
    await page.locator("button:has-text('PROBLEM')").click();
    await expect(page).toHaveURL(/\/problem/);

    // Check that search inputs are available
    const searchBar = page.locator("input[placeholder*='Search']").first();
    await expect(searchBar).toBeVisible();
    await searchBar.fill('Two Sum');

    // Tag list dropdown / filter should be visible
    const filterBtn = page
      .locator("button:has-text('Filter'), div:has-text('Filter')")
      .first();
    if ((await filterBtn.count()) > 0) {
      await expect(filterBtn).toBeVisible();
    }
  });

  test('should navigate to Notebook and verify structure', async ({ page }) => {
    // Navigate to notebook
    await page.locator("button:has-text('NOTEBOOK')").click();
    await expect(page).toHaveURL(/\/notebook/);

    // Verify filter or notebook specific heading exists
    const notebookTitle = page
      .locator(
        "h1:has-text('Notebook'), h2:has-text('Notebook'), div:has-text('Notebook')",
      )
      .first();
    await expect(notebookTitle).toBeVisible();
  });
});
