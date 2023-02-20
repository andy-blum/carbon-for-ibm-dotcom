/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import ArrowRight16 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/16.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME } from './defs';
import styles from './masthead.scss';
import './megamenu-link-with-icon';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

export { MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME };

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * MegaMenu right navigation section
 *
 * @element dds-megamenu-right-navigation
 */
@customElement(`${ddsPrefix}-megamenu-right-navigation`)
class DDSMegaMenuRightNavigation extends StableSelectorMixin(LitElement) {
  /**
   * `true` to render left (highlighted) section layout.
   */
  @property({ reflect: true, attribute: 'style-scheme' })
  styleScheme = MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.REGULAR;

  /**
   * view all link href.
   */
  @property({ attribute: 'view-all-href', reflect: true })
  viewAllHref = '';

  /**
   * view all link title.
   */
  @property({ attribute: 'view-all-title', reflect: true })
  viewAllTitle = 'View all';

  @property({ attribute: 'data-child-count', reflect: true })
  childCount: Number | undefined;

  /**
   * Returns a class-name(s) for megamenu container
   */
  protected _getClassNames() {
    return classMap({
      [`${prefix}--masthead__megamenu--has-sidebar`]: [
        MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.LEFT_SECTION,
        MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.TAB,
      ].includes(this.styleScheme),
      [`${prefix}--masthead__megamenu--has-view-all-link`]: this.viewAllHref,
    });
  }

  /**
   * Handles default slot content changes.
   *
   * @param event Event
   */
  protected _handleSlotChange(event: Event) {
    const children = (event.target as HTMLSlotElement).assignedElements();
    this.childCount = children.length;

    // Supports alternative layout for single items.
    if (children.length === 1) {
      children[0].classList.add('only-child');
    }
  }

  render() {
    const { viewAllHref, viewAllTitle } = this;
    return html`
      <div class="${prefix}--masthead__megamenu-container">
        <div class="${this._getClassNames()}">
          <div class="${prefix}--masthead__megamenu__heading">
            <slot name="heading"></slot>
          </div>
          <div class="${prefix}--masthead__megamenu__categories">
            <slot @slotchange="${this._handleSlotChange}"></slot>
          </div>
        </div>
        ${viewAllHref &&
        html`
          <div class="${prefix}--masthead__megamenu__view-all">
            <span
              class="${prefix}--masthead__megamenu__view-all__border"></span>
            <dds-megamenu-link-with-icon href="${viewAllHref}" part="view-all">
              <span>${viewAllTitle}</span>${ArrowRight16({ slot: 'icon' })}
            </dds-megamenu-link-with-icon>
          </div>
        `}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead__megamenu-right-navigation`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMegaMenuRightNavigation;
