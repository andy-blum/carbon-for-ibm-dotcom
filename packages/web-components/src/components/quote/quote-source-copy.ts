/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';
import styles from './quote.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The source copy content of quote.
 *
 * @element dds-quote-source-copy
 */
@carbonElement(`${ddsPrefix}-quote-source-copy`)
class DDSQuoteSourceCopy extends LitElement {
  /**
   * The shadow slot this source copy content should be in.
   */
  @property({ reflect: true })
  slot = 'source-copy';

  render() {
    return html` <slot></slot> `;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSQuoteSourceCopy;
