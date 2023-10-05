/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import EventManager from '../../../../tests/utils/event-manager';
import { MastheadLink } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import C4DMastheadComposite from '../masthead-composite';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from '../__stories__/profile-items';

const template = (props?) => {
  const { language, userStatus, navLinks } = props ?? {};
  return html`
    <c4d-masthead-composite
      language="${ifDefined(language)}"
      user-status="${ifDefined(userStatus)}"
      .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
      .navLinks="${navLinks}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}">
    </c4d-masthead-composite>
  `;
};

const navLinksFoo: MastheadLink[] = [
  {
    title: 'item-title-foo',
    url: 'https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/foo',
  },
  {
    title: 'menu-title-foo',
    menuSections: [
      {
        menuItems: [
          {
            title: 'menu-item-title-bar',
            url: 'https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/bar',
          },
        ],
      },
    ],
  },
];

describe('c4d-masthead-composite', function () {
  const events = new EventManager();

  describe('Rendering global bar', function () {
    it('should render unauthenticated state', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'c4d-masthead-composite'
      );
      expect(
        mastheadComposite?.shadowRoot?.querySelector('c4d-masthead-global-bar')
      ).toMatchSnapshot();
    });

    it('should render authenticated state', async function () {
      render(template({ userStatus: 'test.user@ibm.com' }), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'c4d-masthead-composite'
      );
      expect(
        mastheadComposite?.shadowRoot?.querySelector('c4d-masthead-global-bar')
      ).toMatchSnapshot();
    });
  });

  describe('Rendering nav items', function () {
    it('should render nothing if there is no given/default nav items', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'c4d-masthead-composite'
      );
      expect(
        mastheadComposite?.shadowRoot?.querySelector('c4d-top-nav')
      ).toBeNull();
      expect(
        mastheadComposite?.shadowRoot?.querySelector('c4d-left-nav')!.children
          .length
      ).toBe(0);
    });

    it('should render the given nav items to the top', async function () {
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(
        document.body
          .querySelector('c4d-masthead-composite')
          ?.shadowRoot?.querySelector('c4d-top-nav')
      ).toMatchSnapshot();
    });

    it('should render the given nav items to the left', async function () {
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(
        document.body
          .querySelector('c4d-masthead-composite')
          ?.shadowRoot?.querySelector('c4d-left-nav')
      ).toMatchSnapshot();
    });
  });

  describe('Determining the nav/search language', function () {
    it('should use the given language', async function () {
      C4DMastheadComposite.prototype._setLanguage = jasmine.createSpy();
      render(template({ language: 'ko-KR' }), document.body);
      await Promise.resolve();
      expect(C4DMastheadComposite.prototype._setLanguage).toHaveBeenCalled();
    });

    afterEach(function () {
      C4DMastheadComposite.prototype._setLanguage = undefined;
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    events.reset();
  });
});
