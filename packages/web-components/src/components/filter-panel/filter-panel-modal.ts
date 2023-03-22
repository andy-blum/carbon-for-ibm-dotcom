/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import './filter-group';
import './filter-modal-button';
import './filter-modal-heading';
import BXModal from '../../internal/vendor/@carbon/web-components/components/modal/modal.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import './filter-modal-footer';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';
import '../../internal/vendor/@carbon/web-components/components/checkbox/checkbox.js';
import '../../internal/vendor/@carbon/web-components/components/modal/modal-close-button.js';
import '../../internal/vendor/@carbon/web-components/components/modal/modal-header.js';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Renders the filter panel modal
 *
 * @element dds-filter-panel-modal
 */
@carbonElement(`${ddsPrefix}-filter-panel-modal`)
class DDSFilterPanelModal extends HostListenerMixin(
  StableSelectorMixin(BXModal)
) {
  /**
   * Renders the selected values.
   */
  @property()
  selectedValues: any[] = [];

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected _handleContentStateChange(_: CustomEvent) {}

  /**
   * Handles `click` event on the `<input>` in the shadow DOM.
   */
  protected _handleClear() {
    const { eventSelectionClear } = this
      .constructor as typeof DDSFilterPanelModal;
    this.dispatchEvent(
      new CustomEvent(eventSelectionClear, {
        bubbles: true,
        composed: true,
        detail: {
          clear: true,
        },
      })
    );
  }

  /**
   * Handles items in the selected array
   */
  @property({ attribute: 'has-selections', type: Boolean })
  hasSelections = false;

  /**
   * Renders the filter heading
   */
  @property()
  heading!: string;

  /**
   * Handles user-initiated close request of this modal.
   *
   * @param triggeredBy The element that triggered this close request.
   */
  protected _handleUserClose(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      if (
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof BXModal).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent((this.constructor as typeof BXModal).eventClose, init)
        );
      }
    }
  }

  render() {
    return html`
      <a
        id="start-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
      <section class="${prefix}--filter-panel__section bx--modal-container">
        <bx-modal-header>
          <bx-modal-close-button
            @click=${this._handleUserClose}></bx-modal-close-button>
          <dds-filter-modal-heading>${this.heading}</dds-filter-modal-heading>
        </bx-modal-header>
        <div class="${prefix}--modal-body"><slot></slot></div>
        <dds-filter-modal-footer>
          <dds-filter-modal-footer-button
            ?disabled="${!this.hasSelections}"
            @click=${this._handleClear}
            kind="tertiary"
            >Clear</dds-filter-modal-footer-button
          >
          <dds-filter-modal-footer-button
            @click=${this._handleUserClose}
            kind="primary"
            >See Results</dds-filter-modal-footer-button
          >
        </dds-filter-modal-footer>
      </section>
      <a
        id="end-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
    `;
  }

  /**
   * The name of the custom event fired upon the modal being closed
   */
  static get eventBeforeClose() {
    return `${prefix}-modal-beingclosed`;
  }

  /**
   * The name of the custom event captured upon cleared selections
   */

  static get eventSelectionClear() {
    return `${ddsPrefix}-selection-clear`;
  }

  /**
   * The name of the heading selector
   */

  static get selectorHeading() {
    return `${ddsPrefix}-filter-panel-heading`;
  }

  static get stableSelector() {
    return `${ddsPrefix}-filter-panel-modal`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFilterPanelModal;
