import { test, expect } from '@playwright/test';

test.describe('Authentication E2E', () => {
  test('should show error message for invalid login credentials', async ({
    page,
  }) => {
    // Navigate to Sign In
    await page.goto('/signin');

    // Fill in credentials that don't exist
    await page.getByLabel('Email').fill('nonexistent_user_e2e@example.com');
    await page.getByLabel('Password', { exact: true }).fill('WrongPassword123');

    // Click Sign In button inside Sign component
    const signInBtn = page.locator("button:has-text('Sign In')").first();
    await expect(signInBtn).toBeVisible();
    await signInBtn.click();

    // Confirm that the alert / error text is shown
    const errorText = page.locator("p[role='alert']");
    await expect(errorText).toBeVisible();
    await expect(errorText).toContainText(/401|không chính xác/i);
  });

  test('should show validation error for empty fields', async ({ page }) => {
    // Navigate to Sign In
    await page.goto('/signin');

    // Click Sign In with empty fields
    const signInBtn = page.locator("button:has-text('Sign In')").first();
    await signInBtn.click();

    // Verify validation message
    const errorText = page.locator("p[role='alert']");
    await expect(errorText).toBeVisible();
    await expect(errorText).toContainText(
      /Vui lòng nhập đầy đủ Email và Mật khẩu!/i,
    );
  });
});
