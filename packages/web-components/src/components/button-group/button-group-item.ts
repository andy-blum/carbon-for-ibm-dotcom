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
import styles from './button-group.scss';
import { DDSButtonExpressiveBase } from '../button/button';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Button group item base class.
 */
export class DDSButtonGroupItemBase extends DDSButtonExpressiveBase {
  static get stableSelector() {
    return `${ddsPrefix}--button-group-item`;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/**
 * Button group item.
 *
 * @element dds-button-group-item
 */
@customElement(`${ddsPrefix}-button-group-item`)
class DDSButtonGroupItem extends DDSButtonGroupItemBase {}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSButtonGroupItem;
