/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { DDSCardBase } from '../card/card';
import styles from './content-group-cards.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Content Group Card item.
 *
 * @element dds-content-group-card-item
 */
@customElement(`${ddsPrefix}-content-group-cards-item`)
class DDSContentGroupCardsItem extends StableSelectorMixin(DDSCardBase) {
  static get stableSelector() {
    return `${ddsPrefix}--content-group-cards-item`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentGroupCardsItem;
