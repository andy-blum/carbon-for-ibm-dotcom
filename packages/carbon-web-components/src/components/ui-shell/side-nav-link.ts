/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import { html, property, query, LitElement } from 'lit-element';
import FocusMixin from '../../globals/mixins/focus';
import styles from './side-nav.scss';
import { carbonElement } from '../../globals/decorators/carbon-element';

const { prefix } = settings;

/**
 * Side nav menu item.
 *
 * @element bx-side-nav-link
 * @slot link - The link.
 * @slot title - The title.
 * @slot title-icon-container - The title icon container.
 */
@carbonElement(`${prefix}-side-nav-link`)
class BXSideNavLink extends FocusMixin(LitElement) {
  /**
   * The container for the title icon.
   */
  @query('#title-icon-container')
  private _titleIconContainerNode!: HTMLDivElement;

  /**
   * Handles `slotchange` event on the `<slot>` for the title icon.
   */
  private _handleSlotChangeTitleIcon({ target }) {
    this._titleIconContainerNode?.toggleAttribute(
      'hidden',
      target.assignedNodes().length === 0
    );
  }

  /**
   * `true` if the menu item should be active.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Link `href`.
   */
  @property()
  href = '';

  /**
   * The title.
   */
  @property()
  title!: string;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    const {
      active,
      href,
      title,
      _handleSlotChangeTitleIcon: handleSlotChangeTitleIcon,
    } = this;
    const classes = classMap({
      [`${prefix}--side-nav__link`]: true,
      [`${prefix}--side-nav__link--current`]: active,
    });
    return html`
      <a part="link" class="${classes}" href="${href}">
        <div
          id="title-icon-container"
          part="title-icon-container"
          hidden
          class="${prefix}--side-nav__icon">
          <slot
            name="title-icon"
            @slotchange=${handleSlotChangeTitleIcon}></slot>
        </div>
        <span part="title" class="${prefix}--side-nav__link-text">
          <slot>${title}</slot>
        </span>
      </a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXSideNavLink;
