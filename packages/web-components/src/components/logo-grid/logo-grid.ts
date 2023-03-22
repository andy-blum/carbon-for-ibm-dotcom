/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { css, html, property, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import parseAspectRatio from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/parseAspectRatio/parseAspectRatio';
import DDSContentBlock from '../content-block/content-block';
import '../horizontal-rule/horizontal-rule';
import '../content-block/content-block-heading';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './logo-grid.scss';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Logo grid.
 *
 * @element dds-logo-grid
 */
@carbonElement(`${ddsPrefix}-logo-grid`)
class DDSLogoGrid extends StableSelectorMixin(DDSContentBlock) {
  protected _renderInnerBody() {
    const { _hasContent: hasContent, _hasMedia: hasMedia, logoCount } = this;

    const rowClasses = {
      [`${prefix}--logo-grid__row`]: true,
      [`${prefix}--logo-grid__${logoCount}-columns`]: logoCount,
    };

    return html`
      <div
        ?hidden="${!hasContent && !hasMedia}"
        class="${prefix}--content-block__children ${prefix}--content-layout__body">
        <div class="${classMap(rowClasses)}">
          ${this._renderContent()}${this._renderMedia()}
        </div>
      </div>
    `;
  }

  /**
   * @returns The footer content.
   */
  protected _renderFooter(): TemplateResult | string | void {
    const { _hasFooter: hasFooter, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasFooter}" class="${prefix}--content-block__cta-row">
        <div
          class="${prefix}--content-block__cta ${prefix}-content-block__cta-col">
          <slot name="footer" @slotchange="${handleSlotChange}"></slot>
        </div>
      </div>
    `;
  }

  @property({ attribute: 'hide-border', reflect: true, type: Boolean })
  hideBorder = false;

  /**
   * Integer value that determines the number of columns in the grid.
   *
   * While any non-zero integer will work, styles will constrain values to between
   * two and four.
   */
  @property({ attribute: 'logo-count', reflect: true })
  logoCount?;

  /**
   * Aspect ratio of grid cells.
   *
   * Values should match the format `<integer><divider-character><integer>`.
   * Any non-digit character can work as a divider.
   */
  @property({ attribute: 'logo-ratio', reflect: true })
  logoRatio?;

  updated(changedProperties) {
    const { logoRatio } = this;
    if (changedProperties.has('logoRatio')) {
      if (logoRatio) {
        const ratioSplit = parseAspectRatio(logoRatio);
        if (ratioSplit.length === 2) {
          const [w, h] = ratioSplit;
          this.style.setProperty('--logo-ratio', `${w}/${h}`);
        }
      } else {
        this.style.removeProperty('--logo-ratio');
      }
    }
  }

  render() {
    return html`
      <div class="${prefix}--content-layout--logo-grid">
        <slot name="heading"></slot>
        ${this._renderBody()}
      </div>
      ${!this.hideBorder ? html` <dds-hr></dds-hr> ` : ``}
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--logo-grid`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLogoGrid;
