import { newE2EPage } from '@stencil/core/testing';

describe('ui-text-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-text-input></ui-text-input>');

    const element = await page.find('ui-text-input');
    expect(element).toHaveClass('hydrated');
  });
});
