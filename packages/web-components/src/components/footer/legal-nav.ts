/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { FOOTER_SIZE } from './footer';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Legal nav.
 *
 * @element c4d-legal-nav
 */
@customElement(`${c4dPrefix}-legal-nav`)
class C4DLegalNav extends StableSelectorMixin(LitElement) {
  /**
   * Size property used for applying classes
   */
  @property()
  size = FOOTER_SIZE.REGULAR;
  /**
   * Navigation label for accessibility.
   */
  @property()
  navLabel = 'Legal Navigation';
  /**
   * The adjunct links container
   */
  @query(`.${c4dPrefix}--adjunct-links__container`)
  private _adjunctLinksContainer?: HTMLDivElement;

  /**
   * The adjunct links slot
   */
  @query('[name="adjunct-links"]')
  private _adjunctLinksSlot?: HTMLSlotElement;

  /**
   * Returns a class-name based on the type parameter type
   */
  protected _getTypeClass() {
    return classMap({
      [`${c4dPrefix}--legal-nav__list`]: true,
      [`${c4dPrefix}--legal-nav__micro`]: this.size === FOOTER_SIZE.MICRO,
    });
  }

  /**
   * The shadow slot this legal nav should be in.
   */
  @property({ reflect: true })
  slot = 'legal-nav';

  connectedCallback() {
    if (this.hasAttribute('role')) {
      this.removeAttribute('role');
    }
    super.connectedCallback();
  }

  render() {
    const { navLabel } = this;
    return this.size !== FOOTER_SIZE.MICRO
      ? html`
          <nav
            class="${c4dPrefix}--legal-nav"
            aria-label="${ifDefined(navLabel)}">
            <div class="${this._getTypeClass()}">
              <ul>
                <slot></slot>
              </ul>
              <slot name="locale"></slot>
            </div>
            <div class="${c4dPrefix}--adjunct-links__container">
              <ul>
                <slot name="adjunct-links"></slot>
              </ul>
            </div>
          </nav>
        `
      : html`
          <nav class="${c4dPrefix}--legal-nav">
            <div class="${this._getTypeClass()}">
              <div>
                <slot name="brand"></slot>
                <ul>
                  <slot></slot>
                </ul>
              </div>
              <slot name="locale"></slot>
            </div>
          </nav>
        `;
  }

  firstUpdated() {
    const {
      _adjunctLinksContainer: adjunctLinksContainer,
      _adjunctLinksSlot: adjunctLinksSlot,
    } = this;
    const hideAdjunctLinksContainer =
      adjunctLinksSlot?.assignedNodes().length === 0
        ? adjunctLinksContainer?.classList.add(
            `${prefix}--adjunct-links__container--hidden`
          )
        : '';
    return hideAdjunctLinksContainer;
  }

  static get stableSelector() {
    return `${c4dPrefix}--footer-legal-nav`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DLegalNav;
