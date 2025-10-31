
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('SlideTest_2025-09-08', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide01-cover.html');

    // Take screenshot
    await page.screenshot({ path: 'slide01-cover.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide02-what-is-genai.html');

    // Take screenshot
    await page.screenshot({ path: 'slide02-what-is-genai.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide03-genai-development.html');

    // Take screenshot
    await page.screenshot({ path: 'slide03-genai-development.png', { fullPage: true } });

    // Take screenshot
    await page.screenshot({ path: 'slide04-after-navigation.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide07-transformer-architecture.html');

    // Take screenshot
    await page.screenshot({ path: 'slide07-transformer.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide11-fine-tuning.html');

    // Take screenshot
    await page.screenshot({ path: 'slide11-fine-tuning.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide31-tool-comparison.html');

    // Take screenshot
    await page.screenshot({ path: 'slide31-tool-comparison.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide20-github-copilot.html');

    // Take screenshot
    await page.screenshot({ path: 'slide20-github-copilot.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide22-cursor.html');

    // Take screenshot
    await page.screenshot({ path: 'slide22-cursor.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide27-claude-code.html');

    // Take screenshot
    await page.screenshot({ path: 'slide27-claude-code.png', { fullPage: true } });

    // Click element
    await page.click('.nav-btn[onclick*="next"]');

    // Take screenshot
    await page.screenshot({ path: 'slide28-after-button-click.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide05-foundation-genai.html');

    // Take screenshot
    await page.screenshot({ path: 'slide05-foundation.png', { fullPage: true } });

    // Navigate to URL
    await page.goto('file:///Users/tungdt/My%20Projects/Presentation%20template/lecture%2001/slide35-references.html');

    // Take screenshot
    await page.screenshot({ path: 'slide35-references.png', { fullPage: true } });

    // Take screenshot
    await page.screenshot({ path: 'slide01-home-navigation.png', { fullPage: true } });
});