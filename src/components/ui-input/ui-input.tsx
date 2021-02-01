import { Component, h, Method, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { numberToString } from '../../utils/string-utils';
import { AutocompleteTypes, InputModeTypes, InputTypes } from '../../utils/type-utils';

@Component({
  tag: 'ui-input',
  styleUrl: 'ui-input.scss',
  shadow: true,
})
export class UiInput {
  inputRef!: HTMLInputElement;

  /**
   * The type of input
   */
  @Prop({ reflect: true }) type: InputTypes = 'text';

  /**
   * The value of the input.
   */
  @Prop({ mutable: true, reflect: true }) value?: string | number | null = '';

  /**
   * InstructalEvent text that shows before the input has a value.
   */
  @Prop({ reflect: true }) placeholder: '';

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true }) name?: string;

  /**
   * If `true`, the user cannot interact with the input
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop({ reflect: true }) readonly = false;

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop({ reflect: true }) required = false;

  /**
   * A regular express thatEvent the value is checked against.
   */
  @Prop({ reflect: true }) pattern?: string;

  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  @Prop({ reflect: true }) min?: string;

  /**
   * The maximum value, which must not be less than its minimum (min
   * attribute) value.
   */
  @Prop({ reflect: true }) max?: string;

  /**
   * Only valid for `"number"` input type.
   *
   * Works with the min and max attributes to limit the increments at which a value can be set.
   *
   * Possible values are: `"any"` or a positive floating point number.
   */
  @Prop({ reflect: true }) step?: string;

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`,
   * this attribute specifies the minimum number of characters that the user can enter.
   */
  @Prop({ reflect: true }) minlength?: number;

  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`,
   * this attribute specifies the maximum number of characters that the user can enter.
   */
  @Prop({ reflect: true }) maxlength?: number;

  /**
   * Id of the label element for this input
   * This is used in aria-labelledby attribute
   */
  @Prop({ reflect: true }) labelId?: number;

  /**
   * The initial size of the control.
   *
   * * This attribute applies only when the `type` attribute is set to
   * `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`,
   * otherwise it is ignored.
   *
   * If the value of the type attribute is `"text"` or `"password"`, then this is an integer number
   * of characters.
   *
   * Else the value is in pixels.
   *
   */
  @Prop({ reflect: true }) size?: number;

  /**
   * A hint to the browser for which keyboard to display.
   *
   * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"numeric"`, `"decimal"`, and
   * `"search"`.
   */
  @Prop({ reflect: true }) inputmode?: InputModeTypes;

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the
   * page loads.
   */
  @Prop({ reflect: true }) autofocus = false;

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop({ reflect: true }) autocomplete: AutocompleteTypes = 'off';

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() inputEvent!: EventEmitter<KeyboardEvent>;

  /**
   * Emitted when the value has changed.
   */
  @Event() changeEvent!: EventEmitter<{ value: string | undefined | null }>;

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  handleValueChange() {
    const newValue =
      this.value === undefined || this.value === null
        ? (this.value as string)
        : this.value.toString();

    console.log('val cahnged');

    this.changeEvent.emit({ value: newValue });
  }

  /**
   * Emitted when the input loses focus.
   */
  @Event() blurEvent!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input has focus.
   */
  @Event() focusEvent!: EventEmitter<FocusEvent>;

  /**
   * Emitted when a keyboard event occurs.
   */
  @Event() keydownEvent!: EventEmitter<KeyboardEvent>;

  /**
   * Checks for validity and shows the browser's validat messageEvent if the control is invalid.
   * */
  @Method()
  async reportValidity() {
    return this.inputRef.reportValidity();
  }

  private handleInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.inputEvent.emit(ev as KeyboardEvent);
  };

  private handleBlur = (ev: FocusEvent) => {
    this.blurEvent.emit(ev);
  };

  private handleFocus = (ev: FocusEvent) => {
    this.focusEvent.emit(ev);
  };

  private handleKeydown = (ev: KeyboardEvent) => {
    this.keydownEvent.emit(ev as KeyboardEvent);
  };

  render() {
    const value = this.value === 'number' ? numberToString(this.value) : this.value;

    return (
      <input
        class={'dom-input'}
        ref={el => (this.inputRef = el)}
        type={this.type}
        name={this.name}
        disabled={this.disabled}
        required={this.required}
        readOnly={this.readonly}
        placeholder={this.placeholder}
        pattern={this.pattern}
        min={this.min}
        max={this.max}
        value={value}
        onInput={this.handleInput}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeydown}
        aria-labelledby={this.labelId}
        autoComplete={this.autocomplete}
        autoFocus={this.autofocus}
        inputMode={this.inputmode}
        minLength={this.minlength}
        maxLength={this.maxlength}
        step={this.step}
        size={this.size}
      />
    );
  }
}
