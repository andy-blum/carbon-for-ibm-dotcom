/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined.js';
import { html, property, query, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import User20 from 'carbon-web-components/es/icons/user/20.js';
import UserOnline20 from 'carbon-web-components/es/icons/user--online/20.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The profile menu UI in the masthead.
 *
 * @element dds-masthead-profile
 */
@customElement(`${ddsPrefix}-masthead-profile`)
class DDSMastheadProfile extends HostListenerMixin(FocusMixin(StableSelectorMixin(LitElement))) {
  /**
   * The trigger button.
   */
  @query('a')
  protected _trigger!: HTMLElement;

  /**
   * Handles `click` event handler on this element.
   */
  protected _handleClick() {
    this._handleUserInitiatedToggle();
  }

  /**
   * Handles user-initiated toggling the open state.
   *
   * @param [force] If specified, forces the open state to the given one.
   */
  protected _handleUserInitiatedToggle(force: boolean = !this.expanded) {
    this.expanded = force;
    if (!force) {
      this._trigger.focus();
    }
  }

  /**
   * Handles `blur` event handler on this element.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleBlur({ relatedTarget }: FocusEvent) {
    if (!this.contains(relatedTarget as Node)) {
      this.expanded = false;
    }
  }

  /**
   * Handler for the `keydown` event.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleKeydown({ key }: KeyboardEvent) {
    if (key === 'Esc' || key === 'Escape') {
      this._handleUserInitiatedToggle(false);
    }
  }

  /**
   * `true` if the trigger button should show the UI of the authenticated state.
   */
  @property({ type: Boolean, reflect: true })
  authenticated = false;

  /**
   * `true` if the menu should be expanded.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * The `aria-label` attribute for the menu UI.
   */
  @property({ attribute: 'menu-label' })
  menuLabel?: string;

  /**
   * The `aria-label` attribute for the trigger button.
   */
  @property({ attribute: 'trigger-label' })
  triggerLabel = 'User profile';

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  render() {
    const { authenticated, expanded, menuLabel, triggerLabel, _handleClick: handleClick } = this;
    return html`
      <a
        role="button"
        tabindex="0"
        class="${prefix}--header__menu-item ${prefix}--header__menu-title"
        href="javascript:void 0"
        aria-expanded="${String(Boolean(expanded))}"
        aria-label="${ifDefined(triggerLabel)}"
        @click=${handleClick}
      >
        ${authenticated ? UserOnline20() : User20()}
      </a>
      <ul class="${prefix}--header__menu" aria-label="${ifDefined(menuLabel)}">
        <slot></slot>
      </ul>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead-profile`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadProfile;
