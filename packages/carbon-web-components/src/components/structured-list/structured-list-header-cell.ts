/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './structured-list.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CarbonBase from '../../globals/CarbonBase';

/**
 * Structured list header cell.
 *
 * @element cds-structured-list-header-cell
 */
@customElement(`${prefix}-structured-list-header-cell`)
class CDSStructuredListHeaderCell extends CarbonBase {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'columnheader');
    }
    super.connectedCallback();
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSStructuredListHeaderCell;
