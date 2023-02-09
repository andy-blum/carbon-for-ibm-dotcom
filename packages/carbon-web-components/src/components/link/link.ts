/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement, query } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import styles from './link.scss';

const { prefix } = settings;

/**
 * Link size.
 */
export enum LINK_SIZE {
  /**
   * Regular size
   */
  REGULAR = '',

  /**
   * Small size.
   */
  SMALL = 'sm',

  /**
   * Large size.
   */
  LARGE = 'lg',
}

/**
 * Link.
 *
 * @element bx-link
 * @csspart link The link.
 */
@customElement(`${prefix}-link`)
class BXLink extends FocusMixin(LitElement) {
  /**
   * `true` if there is an icon.
   */
  private _hasIcon = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this[name === 'icon' ? '_hasIcon' : ''] = hasContent;
    this.requestUpdate();
  }

  @query('#link')
  protected _linkNode?: HTMLAnchorElement | HTMLParagraphElement;

  /**
   * The CSS class list for the link node.
   */
  protected get _classes() {
    const { disabled, size } = this;
    return classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--link--${size}`]: size,
    });
  }

  /**
   * Handles `click` event on the `<a>`.
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected _handleClick(_: MouseEvent) {}

  /**
   * @returns The inner content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderInner() {
    const { _hasIcon: hasIcon, _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
      <div ?hidden="${!hasIcon}" class="${prefix}--link__icon">
        <slot name="icon" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The disabled link content.
   */
  protected _renderDisabledLink() {
    const { _classes: classes } = this;
    return html`
      <p id="link" part="link" class="${classes}">${this._renderInner()}</p>
    `;
  }

  /**
   * @returns The link content.
   */
  protected _renderLink() {
    const {
      download,
      href,
      hreflang,
      linkRole,
      ping,
      rel,
      target,
      type,
      _classes: classes,
      _handleClick: handleClick,
    } = this;
    return html`
      <a
        id="link"
        role="${ifNonNull(linkRole)}"
        class="${classes}"
        part="link"
        download="${ifNonNull(download)}"
        href="${ifNonNull(href)}"
        hreflang="${ifNonNull(hreflang)}"
        ping="${ifNonNull(ping)}"
        rel="${ifNonNull(rel)}"
        target="${ifNonNull(target)}"
        type="${ifNonNull(type)}"
        @click="${handleClick}">
        ${this._renderInner()}
      </a>
    `;
  }

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The default file name.
   */
  @property({ reflect: true })
  download!: string;

  /**
   * Link `href`.
   */
  @property({ reflect: true })
  href!: string;

  /**
   * The language of what `href` points to.
   */
  @property({ reflect: true })
  hreflang!: string;

  /**
   * The a11y role for `<a>`.
   */
  @property({ attribute: 'link-role' })
  linkRole!: string;

  /**
   * URLs to ping.
   */
  @property({ reflect: true })
  ping!: string;

  /**
   * The link type.
   */
  @property({ reflect: true })
  rel!: string;

  /**
   * Link size.
   */
  @property({ reflect: true })
  size = LINK_SIZE.REGULAR;

  /**
   * The link target.
   */
  @property({ reflect: true })
  target!: string;

  /**
   * MIME type of the `target`.
   */
  @property({ reflect: true })
  type!: string;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  render() {
    const { disabled } = this;
    return disabled ? this._renderDisabledLink() : this._renderLink();
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXLink;
