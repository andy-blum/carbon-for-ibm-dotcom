/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map.js';
import { html, customElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import BXSideNavMenuItem from 'carbon-web-components/es/components/ui-shell/side-nav-menu-item.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead left nav submenu item.
 *
 * @element dds-left-nav-menu-item
 */
@customElement(`${ddsPrefix}-left-nav-menu-item`)
class DDSLeftNavMenuItem extends BXSideNavMenuItem {
  @property({ attribute: 'is-heading' })
  isHeading?: boolean;

  render() {
    const { active, href, title, isHeading } = this;

    const classes = classMap({
      [`${prefix}--side-nav__link`]: true,
      [`${prefix}--side-nav__link--current`]: active,
    });
    return html`
      <a
        tabindex="-1"
        part="link"
        class="${classes}"
        href="${href}"
        data-attribute1="headerNav"
        data-attribute2="FlatItem"
        data-attribute3="${title}"
      >
        <span part="title" class="${prefix}--side-nav__link-text" style="${isHeading ? 'font-weight:bold;' : ''}">
          <slot>${title}</slot>
        </span>
      </a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNavMenuItem;
