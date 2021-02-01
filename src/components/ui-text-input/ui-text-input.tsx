import { Component, h } from '@stencil/core';

@Component({
  tag: 'ui-text-input',
  styleUrl: 'ui-text-input.scss',
  shadow: true,
})
export class UiTextInput {
  render() {
    return <ui-input type={'text'} />;
  }
}
