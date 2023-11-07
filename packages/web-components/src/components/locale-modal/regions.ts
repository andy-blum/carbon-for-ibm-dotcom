/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import '../../internal/vendor/@carbon/web-components/components/search/search.js';
import styles from './locale-modal.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The regions selector in locale modal.
 *
 * @element c4d-regions
 */
@customElement(`${c4dPrefix}-regions`)
class C4DRegions extends StableSelectorMixin(LitElement) {
  /**
   * The shadow slot this regions selector should be in.
   */
  @property({ reflect: true })
  slot = 'regions-selector';

  render() {
    return html` <slot></slot> `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--regions`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DRegions;
