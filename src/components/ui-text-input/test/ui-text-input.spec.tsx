import { newSpecPage } from '@stencil/core/testing';
import { UiTextInput } from '../ui-text-input';

describe('ui-text-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UiTextInput],
      html: `<ui-text-input></ui-text-input>`,
    });
    expect(page.root).toEqualHtml(`
      <ui-text-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ui-text-input>
    `);
  });
});
