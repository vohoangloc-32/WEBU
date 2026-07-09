import { test, expect } from '@playwright/test';

test.describe('Navigation & Landing Page E2E', () => {
  test('should load the home page and verify title and main elements', async ({
    page,
  }) => {
    // Navigate to the base URL
    await page.goto('/');

    // Check that the header with logo/BK title is visible
    const bkTitle = page.locator("header span:has-text('W.E.B.U')");
    await expect(bkTitle).toBeVisible();

    // Check the main heading text
    const heading = page.locator('h1');
    await expect(heading).toContainText('FSRS Code Learning Platform');

    // Check that the "Get Started →" button is visible and can be clicked
    const getStartedBtn = page.locator("button:has-text('Get Started')");
    await expect(getStartedBtn).toBeVisible();

    // Click "Get Started" and ensure it redirects to signup
    await getStartedBtn.click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test('should navigate between signup and signin tabs', async ({ page }) => {
    // Navigate to signup
    await page.goto('/signup');

    // Ensure signup elements are visible
    const signupBtn = page.locator('#btn-signup');
    const signinBtn = page.locator('#btn-signin');
    await expect(signupBtn).toBeVisible();
    await expect(signinBtn).toBeVisible();

    // Click on signin tab and verify active status (active state adds some styles or handles routing)
    await signinBtn.click();
    await expect(page).toHaveURL(/\/signin/);
  });
});
