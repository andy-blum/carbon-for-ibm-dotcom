/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined.js';
import { html, customElement, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import Chat20 from '../../internal/vendor/@carbon/web-components/icons/chat/20.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import DDSMastheadProfile from './masthead-profile';
import DDSMastheadContainer from './masthead-container';
import { CMApp } from './masthead-composite';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The contact button UI in the masthead.
 *
 * @element dds-masthead-contact
 */
@customElement(`${ddsPrefix}-masthead-contact`)
class DDSMastheadContact extends DDSMastheadProfile {
  /**
   * The `aria-label` attribute for the trigger button.
   */
  @property({ attribute: 'trigger-label' })
  triggerLabel = 'Contact';

  render() {
    const { triggerLabel, _handleClick: handleClick } = this;
    return html`
      <a
        href="javascript:void 0"
        class="${prefix}--header__menu-item ${prefix}--header__menu-title"
        aria-label="${ifDefined(triggerLabel)}"
        @click=${handleClick}>
        ${Chat20()}
      </a>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('expanded')) {
      if (!this.expanded) {
        const mastheadContainer = this.closest(
          `${ddsPrefix}-masthead-container`
        ) as DDSMastheadContainer;

        /**
         * This is a workaround to minimize the chat module. Currently no minimize methods exist.
         *
         * @see https://github.ibm.com/live-advisor/cm-app
         */
        if (mastheadContainer.contactModuleApp) {
          (mastheadContainer.contactModuleApp as CMApp).init();
        }
      }
    }
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadContact;
