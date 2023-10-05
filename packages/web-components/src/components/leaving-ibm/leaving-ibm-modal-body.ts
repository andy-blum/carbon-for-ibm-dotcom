/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import CDSModalBody from '../../internal/vendor/@carbon/web-components/components/modal/modal-body.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import '../../internal/vendor/@carbon/web-components/components/link/link.js';
import styles from './leaving-ibm.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Leaving IBM Modal body.
 *
 * @element c4d-leaving-ibm-modal-body
 */
@customElement(`${c4dPrefix}-leaving-ibm-modal-body`)
class C4DLeavingIbmModalBody extends StableSelectorMixin(CDSModalBody) {
  /**
   * external url triggering the leaving ibm modal.
   */
  @property({ reflect: true })
  href = '';

  render() {
    const { href } = this;
    return html`
      <p><slot></slot></p>
      <slot name="supplemental"></slot>
      <cds-link size="lg" href="${ifDefined(href)}"
        >${!href ? href : new URL(href).hostname}</cds-link
      >
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--leaving-ibm-modal-body`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeavingIbmModalBody;
