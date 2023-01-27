/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';
import { DDSCardFooterBase } from '../card/card-footer';
import CTAMixin from '../../component-mixins/cta/cta';
import VideoCTAMixin from '../../component-mixins/cta/video';
import { CTA_TYPE } from './defs';
import styles from './cta.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Card CTA footer.
 *
 * @element dds-card-cta-footer
 */
@customElement(`${ddsPrefix}-card-cta-footer`)
class DDSCardCTAFooter extends VideoCTAMixin(CTAMixin(DDSCardFooterBase)) {
  protected _renderContent() {
    const { ctaType, _hasCopy: hasCopy } = this;
    if (ctaType !== CTA_TYPE.VIDEO) {
      return super._renderContent();
    }
    const {
      videoDuration,
      formatVideoCaption: formatVideoCaptionInEffect,
      formatVideoDuration: formatVideoDurationInEffect,
    } = this;
    const caption = hasCopy
      ? undefined
      : formatVideoCaptionInEffect({
          duration: formatVideoDurationInEffect({
            duration: !videoDuration ? videoDuration : videoDuration * 1000,
          }),
        });
    return html`
      <span class="${prefix}--card__cta__copy"
        ><slot @slotchange="${this._handleSlotChange}"></slot>${caption}</span
      >
    `;
  }

  /**
   * The CTA type.
   */
  @property({ reflect: true, attribute: 'cta-type' })
  ctaType = CTA_TYPE.REGULAR;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoCaption = formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatVideoDuration = formatVideoDuration;

  /**
   * The video duration.
   */
  @property({ type: Number, attribute: 'video-duration' })
  videoDuration?: number;

  /**
   * The video thumbnail URL.
   * Card CTA footer does not support video thumbnail, and this property should never be set.
   */
  videoThumbnailUrl?: never;

  /**
   * The video name.
   * This property should be set when a custom video title is needed.
   */
  videoName?: string;

  /**
   * This property is set to "link-list" when parent is of link-list-card-cta.
   */
  @property({ reflect: true })
  mode?: string;

  /**
   * The video custom description.
   */
  @property({ attribute: 'video-description' })
  videoDescription?: string;

  connectedCallback() {
    if (this.parentElement?.matches(`${ddsPrefix}-link-list-item-card-cta`)) {
      this.mode = 'link-list';
    }
    super.connectedCallback();
  }

  static get stableSelector() {
    return `${ddsPrefix}--card-cta-footer`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCardCTAFooter;
