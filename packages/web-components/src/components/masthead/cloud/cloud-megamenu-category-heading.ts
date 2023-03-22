/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, property } from 'lit-element';
import ArrowRight32 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/32.js';
import ddsSettings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './cloud-masthead.scss';
import { carbonElement } from '../../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud MegaMenu Category Heading.
 *
 * @element dds-cloud-megamenu-category-heading
 */
@carbonElement(`${ddsPrefix}-cloud-megamenu-category-heading`)
class DDSCloudMegaMenuCategoryHeading extends LitElement {
  /**
   * href.
   */
  @property({ reflect: true })
  href = '';

  /**
   * Megamenu content category heading
   */
  @property({ reflect: true })
  title = '';

  render() {
    return html`
      <h2><a href="${this.href}">${this.title} ${ArrowRight32()}</a></h2>
      <span><slot></slot></span>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCloudMegaMenuCategoryHeading;
