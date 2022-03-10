/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement } from 'lit-element';
import BXModalHeader from 'carbon-web-components/es/components/modal/modal-header.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './expressive-modal.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Expressive modal header.
 *
 * @element dds-expressive-modal-header
 */
@customElement(`${ddsPrefix}-expressive-modal-header`)
class DDSExpressiveModalHeader extends StableSelectorMixin(BXModalHeader) {
  @property({ reflect: true })
  slot = 'header';

  static get stableSelector() {
    return `${ddsPrefix}--expressive-modal-header`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSExpressiveModalHeader;
