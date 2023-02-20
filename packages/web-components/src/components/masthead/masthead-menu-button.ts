/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map.js';
import { html, state, property, query, customElement } from 'lit-element';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import BXHeaderMenuButton from '../../internal/vendor/@carbon/web-components/components/ui-shell/header-menu-button.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import focuswrap from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/focuswrap/focuswrap';
import Handle from '../../globals/internal/handle';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Toggle button for masthead left nav.
 *
 * @element dds-masthead-menu-button
 */
@customElement(`${ddsPrefix}-masthead-menu-button`)
class DDSMastheadMenuButton extends HostListenerMixin(BXHeaderMenuButton) {
  /**
   * The handle for focus wrapping.
   */
  private _hFocusWrap: Handle | null = null;

  /**
   * Search bar opened flag.
   */
  @state()
  private _hasSearchActive = false;

  /**
   * Handles toggle event from the search component.
   *
   * @param event The event.
   */
  @HostListener('parentRoot:eventToggleSearch')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleSearchToggle = (event: Event) => {
    if ((event as CustomEvent).detail.active !== undefined) {
      this._hasSearchActive = (event as CustomEvent).detail.active;
      this.hideMenuButton = (event as CustomEvent).detail.active;
    }
  };

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

  /**
   * The `<button>`.
   */
  @query(`.${prefix}--header__menu-trigger`)
  private _buttonNode!: HTMLButtonElement;

  /**
   * The shadow slot this toggle button should be in.
   */
  @property({ reflect: true })
  slot = 'brand';

  /**
   * `true` to hide the logo at render
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-menu-button' })
  hideMenuButton = false;

  focus() {
    const { _buttonNode: buttonNode } = this;
    if (buttonNode) {
      buttonNode.focus();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('active')) {
      const {
        active,
        _startSentinelNode: startSentinelNode,
        _endSentinelNode: endSentinelNode,
      } = this;
      if (active) {
        this._hFocusWrap = focuswrap(this.shadowRoot!, [
          startSentinelNode,
          endSentinelNode,
        ]);
      } else if (this._hFocusWrap) {
        this._hFocusWrap = this._hFocusWrap.release();
      }
    }

    if (changedProperties.has('hideMenuButton')) {
      this._hasSearchActive = this.hideMenuButton;
    }
  }

  private _renderSentinel = (side: String) => {
    return html`
      <button
        id="${side}-sentinel"
        type="button"
        class="${prefix}--visually-hidden"></button>
    `;
  };

  render() {
    const {
      active,
      _hasSearchActive: hasSearchActive,
      _renderSentinel: renderSentinel,
    } = this;
    const classes = classMap({
      [`${ddsPrefix}-ce--header__menu-trigger__container`]: true,
      [`${ddsPrefix}-ce--header__menu-trigger__container--has-search-active`]:
        hasSearchActive,
    });
    const startSentinel = active ? renderSentinel('start') : '';
    const endSentinel = active ? renderSentinel('end') : '';
    return html`
      <div class="${classes}">
        ${startSentinel}${super.render()}${endSentinel}
      </div>
    `;
  }

  /**
   * The name of the custom event fired after the seach is toggled.
   */
  static get eventToggleSearch() {
    return `${ddsPrefix}-search-with-typeahead-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadMenuButton;
