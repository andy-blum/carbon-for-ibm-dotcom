/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import { BXSearchBase } from '@carbon/web-components/es/components/search/search.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './search.scss';

export { SEARCH_COLOR_SCHEME } from '../../internal/vendor/@carbon/web-components/components/search/search.js';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Expressive search.
 *
 * @element dds-search
 */
@customElement(`${ddsPrefix}-search`)
class DDSSearch extends BXSearchBase {
  /**
   * The name of the custom event fired after the search content is changed upon a user gesture.
   */
  static get eventInput() {
    return `${ddsPrefix}-search-input`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSSearch;
