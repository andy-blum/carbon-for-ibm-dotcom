/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentBlock from '../content-block/content-block';
import styles from './content-block-simple.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Simple version of content block.
 *
 * @element dds-content-block-simple
 */
@customElement(`${ddsPrefix}-content-block-simple`)
class DDSContentBlockSimple extends StableSelectorMixin(DDSContentBlock) {
  static get stableSelector() {
    return `${ddsPrefix}--content-block-simple`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentBlockSimple;
