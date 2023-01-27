/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import ddsSettings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './cloud-masthead.scss';
import { DDSMastheadGlobalBarBase } from '../masthead-global-bar';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The action bar in Cloud masthead.
 *
 * @element dds-cloud-masthead-global-bar
 */
@customElement(`${ddsPrefix}-cloud-masthead-global-bar`)
class DDSCloudMastheadGlobalBar extends DDSMastheadGlobalBarBase {
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCloudMastheadGlobalBar;
