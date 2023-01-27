/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import { BXLinkBase } from '@carbon/web-components/es/components/link/link.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './footer.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Footer nav item base class.
 */
export class DDSFooterNavItemBase extends BXLinkBase {
  protected _renderInner() {
    const { titleText } = this;
    return html` <slot>${titleText}</slot> `;
  }

  /**
   * The title.
   */
  @property({ attribute: 'title-text' })
  titleText = '';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  updated() {
    const { _linkNode: linkNode } = this;
    if (linkNode) {
      linkNode.classList.add(`${prefix}--footer__link`);
    }
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/**
 * Footer nav item.
 *
 * @element dds-footer-nav-item
 */
@customElement(`${ddsPrefix}-footer-nav-item`)
class DDSFooterNavItem extends DDSFooterNavItemBase {}

export default DDSFooterNavItem;
