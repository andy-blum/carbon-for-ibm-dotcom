/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import CDSModalHeader from '../../internal/vendor/@carbon/web-components/components/modal/modal-header.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './expressive-modal.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Expressive modal header.
 *
 * @element c4d-expressive-modal-header
 */
@customElement(`${c4dPrefix}-expressive-modal-header`)
class C4DExpressiveModalHeader extends StableSelectorMixin(CDSModalHeader) {
  @property({ reflect: true })
  slot = 'header';

  static get stableSelector() {
    return `${c4dPrefix}--expressive-modal-header`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DExpressiveModalHeader;
