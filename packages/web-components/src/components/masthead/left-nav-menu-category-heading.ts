/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement, property, state } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * MegaMenu Category Group Description.
 *
 * @element dds-megamenu-category-group-desc
 */
@customElement(`${ddsPrefix}-left-nav-menu-category-heading`)
class DDSLeftNavMenuCategoryHeading extends LitElement {
  @property({ attribute: 'title' })
  headingText?: string;

  @property({ attribute: 'url' })
  url?: string;

  @state()
  boostSize?: boolean;

  updated(changedProperties) {
    if (changedProperties.has('boostSize')) {
      this.classList.toggle(`${prefix}--left-nav-menu-category__heading-large`, this.boostSize);
    }
  }

  _renderHeading() {
    const { headingText, url } = this;

    const headingClasses = {
      [`${prefix}--side-nav__menu-section-title`]: this.boostSize || false,
      [`${prefix}--side-nav__heading-title`]: !url,
    };

    return url
      ? html`
          <h2 class="${classMap(headingClasses)}">
            <a
              href="${url}"
              class="${prefix}--side-nav__heading-title"
              data-attribute1="headerNav"
              data-attribute2="FlatHdline"
              data-attribute3="${headingText}"
            >
              ${headingText}${ArrowRight20()}
            </a>
          </h2>
        `
      : html`
          <h2 class="${classMap(headingClasses)}">${headingText}</h2>
        `;
  }

  render() {
    return html`
      <div class="${prefix}--side-nav__heading">
        ${this._renderHeading()}
        <div class="${prefix}--side-nav__heading-description">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNavMenuCategoryHeading;
