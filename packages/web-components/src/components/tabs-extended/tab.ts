/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement, state } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './tabs-extended.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A tab within a tabbed layout.
 *
 * @element dds-tab
 */
@carbonElement(`${ddsPrefix}-tab`)
class DDSTab extends StableSelectorMixin(LitElement) {
  /**
   * Defines label of the tab.
   */
  @property({ reflect: true })
  label = '';

  /**
   * Defines the disabled state of the tab.
   */
  @property({ reflect: true, type: Boolean })
  disabled: boolean = false;

  /**
   * Defines the selected state of the tab.
   */
  @property({ reflect: true, type: Boolean })
  selected: boolean = false;

  /**
   * Defines the index of the tab relative to other tabs.
   */
  @state()
  private _index: Number = 0;

  /**
   * Sets the index of the tab.
   */
  setIndex(index: Number) {
    this._index = index;
  }

  protected updated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    if (_changedProperties.has('selected')) {
      const { eventTabSelected } = this.constructor as typeof DDSTab;
      this.dispatchEvent(
        new CustomEvent(eventTabSelected, {
          bubbles: true,
          composed: true,
          detail: {
            selected: this.selected,
          },
        })
      );
    }

    super.updated(_changedProperties);
  }

  render() {
    return html`
      <div
        id="tab-panel-${this._index}-default"
        tabindex="0"
        class="tab-${this._index}-container"
        role="tabpanel"
        aria-labelledby="tab-link-${this._index}-default"
        aria-hidden="${!this.selected}"
        ?hidden="${!this.selected}">
        <slot></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--tab`;
  }

  /**
   * An event that fires whenever the tab's selected state changes.
   */
  static get eventTabSelected() {
    return `${ddsPrefix}-tab-selected`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSTab;
