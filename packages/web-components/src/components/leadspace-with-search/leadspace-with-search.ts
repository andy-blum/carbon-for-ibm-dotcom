/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import '../horizontal-rule/horizontal-rule';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './leadspace-with-search.scss';
import { ADJACENT_THEMES } from './defs';
import StickyHeader from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/StickyHeader/StickyHeader';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Leadspace with Search
 *
 * @element c4d-leadspace-with-search
 */
@customElement(`${c4dPrefix}-leadspace-with-search`)
class C4DLeadspaceWithSearch extends StableSelectorMixin(LitElement) {
  /**
   *
   */
  @property()
  _contents: any[] = [];

  /**
   * `true` if there is an image.
   */
  @property({ attribute: 'has-image', reflect: true, type: Boolean })
  protected _hasImage = false;

  /**
   * sets the heading for sticky search
   */
  @property()
  protected _heading: string = '';

  /**
   * `true` if there is an image.
   */
  @property({ attribute: 'scroll-behavior', reflect: true, type: Boolean })
  protected _scrollBehavior = false;

  /**
   * The adjacent theme.
   *
   * Color scheme options are:
   * "white-and-g10",
   * "g10-and-white",
   * "g90-and-g100",
   * "g100-and-g90"
   */
  @property({ attribute: 'adjacent-theme', reflect: true })
  theme = ADJACENT_THEMES.MONOTHEME;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleHeadingSlotChange({ target }: Event) {
    this._heading = (
      (target as HTMLSlotElement).assignedNodes()[0] as HTMLElement
    ).innerText;
  }

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleImageSlotChange({ target }: Event) {
    this._hasImage = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );

    this._contents = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
  }

  /**
   * Returns a class-name based on the Adjacent theme type
   */
  protected _getSearchClass() {
    return classMap({
      [`${prefix}--search-container`]: true,
      [`${prefix}--search-container-adjacent-theme`]:
        this.theme !== ADJACENT_THEMES.MONOTHEME || this._hasImage,
    });
  }

  protected firstUpdated() {
    StickyHeader.global.leadspaceWithSearch = this;
  }

  render() {
    return html`
      <div class="${prefix}--content-layout">
        <slot
          name="heading"
          @slotchange=${this._handleHeadingSlotChange}></slot>
        <div class="${prefix}--content-layout__body">
          <slot name="content"></slot>
          <slot @slotchange=${this._handleImageSlotChange} name="image"></slot>
        </div>
      </div>
      <div class="${this._getSearchClass()}">
        <div class="${prefix}--search-container-inner">
          <div class="${prefix}--sticky-header">${this._heading}</div>
          <slot name="search"></slot>
        </div>
      </div>
      <slot name="hr"></slot>
      ${this._contents.map((e) => {
        return html` ${unsafeHTML((e as HTMLElement).outerHTML)} `;
      })}
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--leadspace-with-search`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeadspaceWithSearch;
