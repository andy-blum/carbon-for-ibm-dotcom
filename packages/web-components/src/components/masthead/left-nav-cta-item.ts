/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';

import ArrowRight16 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/16.js';
import BXSideNavMenuItem from '../../internal/vendor/@carbon/web-components/components/ui-shell/side-nav-menu-item.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead left nav CTA item.
 *
 * @element dds-left-nav-cta-item
 */
@customElement(`${ddsPrefix}-left-nav-cta-item`)
class DDSLeftNavCtaItem extends BXSideNavMenuItem {
  render() {
    const { href, title } = this;
    return html`
      <a part="link" class="${prefix}--side-nav__link" href="${href}">
        <div part="title" class="${prefix}--side-nav__link-text">
          <span><slot>${title}</slot></span>
          ${ArrowRight16()}
        </div>
      </a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNavCtaItem;
