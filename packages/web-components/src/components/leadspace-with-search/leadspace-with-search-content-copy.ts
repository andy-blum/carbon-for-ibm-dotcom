/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, property } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './leadspace-with-search.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentBlockParagraph from '../content-block/content-block-paragraph';
import { carbonElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Copy in the content section of Leadspace with search
 *
 * @element dds-leadspace-with-search-content-copy
 */
@carbonElement(`${ddsPrefix}-leadspace-with-search-content-copy`)
class DDSLeadspaceWithSearchContentCopy extends StableSelectorMixin(
  DDSContentBlockParagraph
) {
  /**
   * The shadow slot the content should be in.
   */
  @property({ reflect: true })
  slot = 'copy';

  static get stableSelector() {
    return `${ddsPrefix}--leadspace-with-search-content-copy`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLeadspaceWithSearchContentCopy;
