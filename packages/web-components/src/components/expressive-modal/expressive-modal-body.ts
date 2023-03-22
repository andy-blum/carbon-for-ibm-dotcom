/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BXModalBody from '../../internal/vendor/@carbon/web-components/components/modal/modal-body.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './expressive-modal.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Expressive modal body.
 *
 * @element dds-expressive-modal-body
 */
@carbonElement(`${ddsPrefix}-expressive-modal-body`)
class DDSExpressiveModalBody extends StableSelectorMixin(BXModalBody) {
  static get stableSelector() {
    return `${ddsPrefix}--expressive-modal-body`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSExpressiveModalBody;
