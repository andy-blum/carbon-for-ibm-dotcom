/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import '../../internal/vendor/@carbon/web-components/components/link/link.js';
import '../../internal/vendor/@carbon/web-components/components/list/ordered-list.js';
import '../../internal/vendor/@carbon/web-components/components/list/unordered-list.js';
import '../../internal/vendor/@carbon/web-components/components/list/list-item.js';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './markdown.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Markdown content base class.
 */
export class DDSMarkdownBase extends LitElement {
  /**
   * `true` if the first rendering has happened.
   */
  private _hasRendered = false;

  /**
   * The list of custom element tags that is rendered by our custom renderer.
   */
  // eslint-disable-next-line class-methods-use-this
  protected get _customTags() {
    return new Set([
      `${prefix}-link`,
      `${prefix}-ordered-list`,
      `${prefix}-unordered-list`,
      `${prefix}-list-item`,
    ]);
  }

  /**
   * The custom renderer for the markup parser.
   */
  // eslint-disable-next-line class-methods-use-this
  protected get _renderer() {
    return {
      link(href, title, text) {
        return `<${prefix}-link href="${href}" size="lg" ${
          title ? `title="${title}"` : ''
        }>${text}</${prefix}-link>`;
      },
      list(body, ordered) {
        const tag = `${prefix}-${ordered ? 'ordered' : 'unordered'}-list`;
        return `<${tag}>${body}</${tag}>`;
      },
      listitem(text) {
        return `<${prefix}-list-item>${text}</${prefix}-list-item>`;
      },
    };
  }

  /**
   * The markdown content.
   */
  @property({ attribute: false })
  content?: string;

  update(changedProperties) {
    super.update(changedProperties);
    const {
      content,
      _customTags: customTags,
      textContent,
      _hasRendered: hasRendered,
      _renderer: renderer,
    } = this;
    if (!hasRendered && !this.firstElementChild) {
      const lightDOMTemplateResult = html`
        ${unsafeHTML(
          markdownToHtml(content ?? (hasRendered ? '' : textContent), {
            customTags,
            renderer,
          })
        )}
      `;
      this._hasRendered = true;
      render(lightDOMTemplateResult, this, { eventContext: this });
    }
    this.querySelectorAll('bx-ordered-list, bx-unordered-list').forEach((e) => {
      e.setAttribute('isExpressive', '');
    });
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/**
 * Markdown content.
 *
 * @element dds-markdown
 */
@customElement(`${ddsPrefix}-markdown`)
class DDSMarkdown extends DDSMarkdownBase {}
/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSMarkdown;
