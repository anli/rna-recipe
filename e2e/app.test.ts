import {by, device, element, expect, waitFor} from 'detox';

describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given any, When I open App, Then I should see recipes title "E2E_TITLE_A"', async () => {
    const title = element(by.text('E2E_TITLE_A'));
    await waitFor(title)
      .toHaveText('E2E_TITLE_A')
      .withTimeout(10000);
    await expect(title).toBeVisible();
  });
});
