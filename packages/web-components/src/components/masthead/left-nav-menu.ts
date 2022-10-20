/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map.js';
import { html, property, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ChevronDown20 from '../../internal/vendor/@carbon/web-components/icons/chevron--down/20.js';
import FocusMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/focus.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead left nav submenu.
 *
 * @element dds-left-nav-menu
 * @fires dds-left-nav-menu-beingtoggled
 *   The custom event fired before this side nav menu is being toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of toggling this side nav menu.
 * @fires dds-left-nav-menu-toggled The custom event fired after this side nav menu is toggled upon a user gesture.
 */
@customElement(`${ddsPrefix}-left-nav-menu`)
class DDSLeftNavMenu extends FocusMixin(LitElement) {
  /**
   * Handles user-initiated toggle request of this side nav menu.
   *
   * @param expanded The new expanded state.
   */
  private _handleUserInitiatedToggle(
    expanded = !this.expanded,
    panelId = this.panelId
  ) {
    const { eventBeforeToggle, eventToggle } = this
      .constructor as typeof DDSLeftNavMenu;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        expanded,
        panelId,
      },
    };
    if (this.dispatchEvent(new CustomEvent(eventBeforeToggle, init))) {
      this.expanded = expanded;
      this.dispatchEvent(new CustomEvent(eventToggle, init));
    }
  }

  /**
   * Handler for the `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggle();
  }

  /**
   * `true` if the menu should be in its active state.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * `true` if the menu should be open.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * `true` if the menu should be open.
   */
  @property({ type: String, attribute: 'panel-id' })
  panelId = '';

  /**
   * The title text.
   */
  @property()
  title = '';

  connectedCallback() {
    super.connectedCallback();

    if (document.dir) {
      this.dir = document.dir;
    }
  }

  render() {
    const {
      active,
      expanded,
      title,
      _handleClickExpando: handleClickExpando,
    } = this;
    const buttonClasses = classMap({
      [`${prefix}--side-nav__submenu`]: true,
      [`${prefix}--masthead__side-nav--submemu--selected`]: active,
    });

    const isSubitem = this.parentElement?.hasAttribute('is-submenu') || false;

    return html`
      <div class="${prefix}--side-nav__item">
        <button
          type="button"
          aria-haspopup="true"
          tabindex="-1"
          aria-expanded="${String(Boolean(expanded))}"
          class="${buttonClasses}"
          @click=${handleClickExpando}
          data-attribute1="headerNav"
          data-attribute2="${isSubitem ? 'TabHdline' : 'L0'}"
          data-attribute3="${title}"
        >
          <div class="${prefix}--side-nav__submenu-content">
            <span class="${prefix}--side-nav__submenu-title">${title}</span>
            <div
              class="${prefix}--side-nav__icon ${prefix}--side-nav__icon--small ${prefix}--side-nav__submenu-chevron">
              ${ChevronDown20()}
            </div>
          </div>
        </button>
      </div>
    `;
  }

  /**
   * The name of the custom event fired before this side nav menu is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this side nav menu.
   */
  static get eventBeforeToggle() {
    return `${ddsPrefix}-left-nav-menu-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this side nav menu is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${ddsPrefix}-left-nav-menu-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeftNavMenu;
