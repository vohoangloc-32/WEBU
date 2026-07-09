import { test, expect } from '@playwright/test';

test.describe('Onboarding & Registration Flow E2E', () => {
  test('should register a new user, navigate through the survey, and land on the dashboard', async ({
    page,
  }) => {
    // Generate a unique email and username for each test run to avoid duplicates
    const uniqueId = Date.now();
    const email = `e2e_user_${uniqueId}@example.com`;
    const username = `e2e_${uniqueId}`;
    const password = 'Password@123';

    // Navigate to registration page
    await page.goto('/signup');

    // Verify registration fields are loaded
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Confirm Password').fill(password);

    // Submit registration form
    const signUpSubmitBtn = page.locator("button:has-text('Sign Up')").first();
    await expect(signUpSubmitBtn).toBeVisible();
    await signUpSubmitBtn.click();

    // The registration + auto-login should redirect us to the survey onboarding
    await expect(page).toHaveURL(/\/survey/, { timeout: 10000 });

    // Step 1 Survey: Bạn đã học lập trình được bao lâu?
    const q1Title = page.locator("p:has-text('Question 1')");
    await expect(q1Title).toBeVisible();
    await page.locator("label:has-text('Dưới 6 tháng')").click();
    await page.locator("button:has-text('Next')").click();

    // Step 2 Survey: Trình độ lập trình hiện tại của bạn?
    const q2Title = page.locator("p:has-text('Question 2')");
    await expect(q2Title).toBeVisible();
    await page.locator("label:has-text('Beginner')").click();
    await page.locator("button:has-text('Next')").click();

    // Step 3 Survey: Mục tiêu học lập trình của bạn là gì?
    const q3Title = page.locator("p:has-text('Question 3')");
    await expect(q3Title).toBeVisible();
    await page.locator("label:has-text('Tìm việc')").click();
    await page.locator("button:has-text('Next')").click();

    // Step 4 Survey: Bạn muốn tập trung vào lĩnh vực nào?
    const q4Title = page.locator("p:has-text('Question 4')");
    await expect(q4Title).toBeVisible();
    await page.locator("label:has-text('Web Frontend')").click();

    // Last step next button should say Finish
    const finishBtn = page.locator("button:has-text('Finish')");
    await expect(finishBtn).toBeVisible();
    await finishBtn.click();

    // Should navigate to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    // Confirm token exists in localStorage
    const authToken = await page.evaluate(() =>
      localStorage.getItem('auth_token'),
    );
    expect(authToken).toBeTruthy();
  });
});
