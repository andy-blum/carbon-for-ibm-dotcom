/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, query, customElement, LitElement } from 'lit-element';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import settings from 'carbon-components/es/globals/js/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './pagination.scss';

const { prefix } = settings;

/**
 * The select box for page sizes.
 *
 * @element bx-page-sizes-select
 * @slot label-text - The label text.
 * @fires bx-page-sizes-select-changed - The custom event fired after the page size is changed.
 */
@customElement(`${prefix}-page-sizes-select`)
class BXPageSizesSelect extends FocusMixin(LitElement) {
  @query('select')
  private _selectNode!: HTMLSelectElement;

  /**
   * Handles `change` event on the `<select>` to select page size.
   */
  private _handleChange({ target }: Event) {
    const value = Number((target as HTMLSelectElement).value);
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof BXPageSizesSelect).eventChange,
        {
          bubbles: true,
          composed: true,
          detail: {
            value,
          },
        }
      )
    );
    this.value = value;
  }

  /**
   * Handles `slotchange` event for the `<slot>` for `<options>`.
   *
   * @param event The event.
   */
  private _handleSlotChange({ target }: Event) {
    const { _selectNode: selectNode } = this;
    while (selectNode.firstChild) {
      selectNode.removeChild(selectNode.firstChild);
    }
    (
      (target as HTMLSlotElement).assignedNodes() as HTMLOptionElement[]
    ).forEach((item) => {
      selectNode?.appendChild(item.cloneNode(true));
    });
  }

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = 'Items per page:';

  /**
   * The value, working as the current page size.
   */
  @property({ type: Number })
  value!: number;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  render() {
    const {
      labelText,
      value,
      _handleChange: handleChange,
      _handleSlotChange: handleSlotChange,
    } = this;
    return html`
      <label for="select" class="${prefix}--pagination__text"
        ><slot name="label-text">${labelText}</slot></label
      >
      <div class="${prefix}--select__item-count">
        <select
          id="select"
          class="${prefix}--select-input"
          .value="${value}"
          @change=${handleChange}></select>
        ${ChevronDown16({ class: `${prefix}--select__arrow` })}
      </div>
      <div hidden><slot @slotchange="${handleSlotChange}"></slot></div>
    `;
  }

  /**
   * The name of the custom event fired after the page size is changed.
   */
  static get eventChange() {
    return `${prefix}-page-sizes-select-changed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXPageSizesSelect;
