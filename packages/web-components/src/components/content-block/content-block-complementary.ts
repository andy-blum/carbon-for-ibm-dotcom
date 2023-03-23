/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import styles from './content-block.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The complementary content in content block.
 *
 * @element dds-content-block-complementary
 */
@customElement(`${ddsPrefix}-content-block-complementary`)
class DDSContentBlockComplementary extends LitElement {
  /**
   * The shadow slot this logo UI should be in.
   */
  @property({ reflect: true })
  slot = 'complementary';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'complementary');
    }
    super.connectedCallback();
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentBlockComplementary;
