/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement, html, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentGroup from '../content-group/content-group';
import styles from './content-block-segmented.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content block segmented item.
 *
 * @element dds-content-block-segmented-item
 */
@customElement(`${ddsPrefix}-content-block-segmented-item`)
class DDSContentBlockSegmentedItem extends StableSelectorMixin(DDSContentGroup) {
  protected _renderInnerBody(): TemplateResult | string | void {
    return html`
      ${this._renderContent()}${this._renderMedia()}
    `;
  }

  protected _renderMedia(): TemplateResult | string | void {
    const { _hasMedia: hasMedia, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasMedia}" class="${prefix}--content-block-segmented__media">
        <slot name="media" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-block-segmented-item`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSContentBlockSegmentedItem;
