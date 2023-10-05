/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DImage from '../image/image';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './leadspace.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;
/**
 * Custom leadspace image.
 *
 * @element c4d-leadspace-image
 */
@customElement(`${c4dPrefix}-leadspace-image`)
class C4DLeadspaceImage extends StableSelectorMixin(C4DImage) {
  static get stableSelector() {
    return `${c4dPrefix}--image`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeadspaceImage;
