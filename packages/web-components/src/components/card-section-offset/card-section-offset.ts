/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentBlock from '../content-block/content-block';
import styles from './card-section-offset.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card section offset.
 *
 * @element dds-card-section-offset
 * @slot heading - The heading content.
 * @slot action - The text-cta content.
 * @slot card-group - The L shaped card group content.
 */
@customElement(`${ddsPrefix}-card-section-offset`)
class DDSCardSectionOffset extends StableSelectorMixin(DDSContentBlock) {
  protected _handleSlotChangeCardGroup(event: Event) {
    const childItems = (event.target as HTMLSlotElement).assignedNodes();

    childItems.filter((elem) => {
      if (
        (elem as HTMLElement).matches(
          (this.constructor as typeof DDSCardSectionOffset).cardGroupSelector
        ) &&
        (elem as HTMLElement).querySelectorAll(`${ddsPrefix}-card-group-item`)
          .length === 4 &&
        (elem as HTMLElement)
          .querySelector(`${ddsPrefix}-card-group-item`)
          ?.hasAttribute('empty')
      ) {
        return true;
      }
      this.querySelector('dds-card-group')!.innerHTML = '';
      return false;
    });
  }

  render() {
    return html`
      <div class="${prefix}--card-section-offset__content">
        ${this._renderHeading()}
        <slot name="action"></slot>
      </div>
      <slot
        name="card-group"
        @slotchange="${this._handleSlotChangeCardGroup}"></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-section-offset`;
  }

  static get cardGroupSelector() {
    return `${ddsPrefix}-card-group`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardSectionOffset;
