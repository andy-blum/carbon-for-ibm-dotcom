/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement } from 'lit-element';
import HostListener from '../../globals/decorators/host-listener';
import BXFloatingMenu, {
  FLOATING_MENU_ALIGNMENT,
  FLOATING_MENU_DIRECTION,
  FLOATING_MENU_POSITION_DIRECTION,
} from '../floating-menu/floating-menu';
import styles from './tooltip.scss';

const { prefix } = settings;

/**
 * Tooltip body.
 */
@customElement(`${prefix}-tooltip-body`)
class BXTooltipBody extends BXFloatingMenu {
  /**
   * How the menu is aligned to the trigger button.
   */
  @property()
  alignment = FLOATING_MENU_ALIGNMENT.CENTER;

  /**
   * The menu direction.
   */
  @property()
  direction = FLOATING_MENU_DIRECTION.BOTTOM;

  /**
   * `true` if the dropdown should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = async (event) => {
    if (event.key === 'Escape') {
      this.open = false;
    }
  };

  /**
   * The position of this tooltip body.
   */
  get position() {
    const { alignment, direction } = this;
    const position = super.position;
    const { direction: positionDirection, start, top } = position;

    if (
      direction === FLOATING_MENU_DIRECTION.TOP ||
      direction === FLOATING_MENU_DIRECTION.BOTTOM
    ) {
      if (alignment === FLOATING_MENU_ALIGNMENT.START) {
        position.start -= 16;
      }

      if (alignment === FLOATING_MENU_ALIGNMENT.END) {
        position.start += 16;
      }
    }

    if (
      direction === FLOATING_MENU_DIRECTION.RIGHT ||
      direction === FLOATING_MENU_DIRECTION.LEFT
    ) {
      if (alignment === FLOATING_MENU_ALIGNMENT.START) {
        position.top -= 16;
      }

      if (alignment === FLOATING_MENU_ALIGNMENT.END) {
        position.top += 16;
      }
    }

    if (direction === FLOATING_MENU_DIRECTION.LEFT) {
      const style = this.ownerDocument!.defaultView!.getComputedStyle(this);
      const margin = Number(
        (/^([\d-.]+)px$/.exec(
          style.getPropertyValue(
            positionDirection !== FLOATING_MENU_POSITION_DIRECTION.RTL
              ? 'margin-right'
              : 'margin-left'
          )
        ) || [])[1]
      );
      if (!isNaN(margin)) {
        // For direction === DIRECTION_RIGHT, the left/top margin the caret size effectively adjusts the position,
        // but for direction === DIRECTION_LEFT such thing won't happen
        return {
          ...position,
          start: start - margin,
        };
      }
    }

    if (direction === FLOATING_MENU_DIRECTION.TOP) {
      const style = this.ownerDocument!.defaultView!.getComputedStyle(this);
      const margin = Number(
        (/^([\d-.]+)px$/.exec(style.getPropertyValue('margin-bottom')) || [])[1]
      );
      if (!isNaN(margin)) {
        // For direction === DIRECTION_BOTTOM, the left/top margin the caret size effectively adjusts the position,
        // but for direction === DIRECTION_TOP such thing won't happen
        return {
          ...position,
          top: top - margin,
        };
      }
    }

    return position;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'menu');
    }
    if (!this.hasAttribute('tabindex')) {
      // TODO: Should we use a property?
      this.setAttribute('tabindex', '-1');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <span class="${prefix}--tooltip__caret"></span>
      <div class="${prefix}--tooltip__content"><slot></slot></div>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXTooltipBody;
