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

import styles from './card-section-simple.scss';
import { DDSContentSectionBase } from '../content-section/content-section';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The Card Section Simple pattern
 *
 * @element dds-card-section-simple
 */
@customElement(`${ddsPrefix}-card-section-simple`)
class DDSCardSectionSimple extends StableSelectorMixin(DDSContentSectionBase) {
  static get stableSelector() {
    return `${ddsPrefix}--card-section-simple`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardSectionSimple;
