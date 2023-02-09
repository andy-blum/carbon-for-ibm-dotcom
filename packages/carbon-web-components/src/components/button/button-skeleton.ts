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
import { html, customElement } from 'lit-element';
import ifNonNull from '../../globals/directives/if-non-null';
import BXButton from './button';
import styles from './button.scss';

const { prefix } = settings;

/**
 * Button skeleton.
 */
@customElement(`${prefix}-btn-skeleton`)
class BXButtonSkeleton extends BXButton {
  /**
   * Handles `click` event on the `<a>.
   *
   * @param event The event.
   */
  private _handleClickLinkSkeleton(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault(); // Stop following the link
      event.stopPropagation(); // Stop firing `onClick`
    }
  }

  render() {
    const {
      autofocus,
      disabled,
      download,
      href,
      hreflang,
      ping,
      rel,
      size,
      target,
      type,
    } = this;
    const classes = classMap({
      [`${prefix}--btn`]: true,
      [`${prefix}--skeleton`]: true,
      [`${prefix}--btn--${size}`]: size,
    });
    return href
      ? html`
          <a
            id="button"
            role="button"
            class="${classes}"
            download="${ifNonNull(download)}"
            href="${ifNonNull(href)}"
            hreflang="${ifNonNull(hreflang)}"
            ping="${ifNonNull(ping)}"
            rel="${ifNonNull(rel)}"
            target="${ifNonNull(target)}"
            type="${ifNonNull(type)}"
            @click="${this._handleClickLinkSkeleton}"></a>
        `
      : html`
          <button
            id="button"
            class="${classes}"
            ?autofocus="${autofocus}"
            ?disabled="${disabled}"
            type="${ifNonNull(type)}"></button>
        `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXButtonSkeleton;
