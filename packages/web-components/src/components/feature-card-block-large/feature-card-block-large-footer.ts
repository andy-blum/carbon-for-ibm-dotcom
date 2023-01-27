/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { DDSFeatureCardFooterBase } from '../feature-card/feature-card-footer';
import styles from './feature-card-block-large.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Feature card block large footer.
 *
 * @element dds-feature-card-block-large-footer
 */
@customElement(`${ddsPrefix}-feature-card-block-large-footer`)
class DDSFeatureCardBlockLargeFooter extends DDSFeatureCardFooterBase {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFeatureCardBlockLargeFooter;
