/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { state, html, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import '../horizontal-rule/horizontal-rule';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './leadspace-block.scss';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  title: '_hasTitle',
};

/**
 * LeadSpace Block Component.
 *
 * @element dds-leadspace-block
 */
@carbonElement(`${ddsPrefix}-leadspace-block`)
class DDSLeadSpaceBlock extends StableSelectorMixin(LitElement) {
  /**
   * `true` if there is a title.
   */
  @state()
  protected _hasTitle = false;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasTitle = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this[slotExistencePropertyNames[name] || '_hasTitle'] = hasTitle;
  }

  /**
   * Render the Leadspace Block title
   */
  protected _renderHeading() {
    const { _hasTitle: hasTitle } = this;
    return html`
      <slot
        ?hidden="${!hasTitle}"
        name="heading"
        @slotchange="${this._handleSlotChange}"></slot>
    `;
  }

  render() {
    return html`
      <div class="${prefix}--content-layout">
        ${this._renderHeading()}
        <div class="${prefix}--content-layout__body">
          <slot></slot>
          <dds-hr></dds-hr>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--leadspace-block`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLeadSpaceBlock;
