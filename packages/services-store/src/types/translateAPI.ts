/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A link item.
 * Used for masthead, footer, etc.
 */
export interface BasicLink {
  title: string;
  titleEnglish?: string;
  highlightedLink?: boolean;
  url?: string;
  description?: string;
  target?: string;
}

/**
 * A set of links.
 * Used for masthead, footer, etc.
 */
export interface BasicLinkSet {
  title: string;
  links: BasicLink[];
}

export interface MegapanelGroup {
  headingTitle?: string;
  headingUrl?: string;
  description?: string;
  links: BasicLink[];
}

/**
 * A content in mega panel.
 */
export interface MegapanelContent {
  headingTitle?: string;
  headingUrl?: string;
  description?: string;
  megapanelGroups?: MegapanelGroup[]; // used in Tabbed layout
  quickLinks?: BasicLinkSet; // used in Listing layout
}

/**
 * A menu item in masthead.
 */
export interface MastheadMenuItem {
  title: string;
  titleEnglish?: string;
  url?: string;
  highlighted?: boolean;
  megaPanelViewAll?: boolean;
  megapanelContent?: MegapanelContent; // Used if has megamenu
}

/**
 * A menu section in masthead.
 */
export interface MastheadMenuSection {
  title: string;
  titleEnglish: string;
  url?: string;
  description?: string;
  menuItems?: MastheadMenuItem[]; // for 'list' layouts use
  megapanelContent?: MegapanelContent; // for 'tab' layouts use
  megaPanelViewAll?: boolean;
}

/**
 * An item in masthead.
 */
export interface MastheadLink {
  title: string;
  titleEnglish?: string;
  url?: string;
  hasMenu?: boolean;
  hasMegapanel?: boolean;
  megamenuLayout?: 'tab' | 'list';
  menuSections?: MastheadMenuSection[]; // 'list' layouts will only use first section
}

/**
 * A menu section for masthead
 */
export interface MastheadL1 {
  title: string;
  url?: string;
  menuItems?: MastheadLink[];
}

/**
 * An profile item in masthead.
 */
export interface MastheadProfileItem {
  /**
   * The title text.
   */
  title: string;
  /**
   * The id of the profile item.
   */
  id?: string;
  /**
   * The link URL.
   */
  url?: string;
}

/**
 * Labels object for leaving ibm component
 */
export interface LeavingIBMLabels {
  LEAVING001: string;
  LEAVING002: string;
  LEAVING003: string;
}

/**
 * Masthead logo tooltip
 */
export interface MastheadLogoData {
  svg?: string;
  tooltip?: string;
  denylist: [];
  allowlist: [];
  end: string;
  path: string;
  href: string;
}

/**
 * Cloud Masthead Profile content
 */
export interface MastheadProfileContent {
  iconLabel: string;
  links: MastheadProfileItem[];
  ctaButtons: MastheadProfileItem[];
  contactUsButton: string;
}

/**
 * Misc labels
 */
export interface MiscLabels {
  continueText: string;
}
/**
 * The translation data for ibm.com sites
 */
export interface Translation {
  mastheadNav: {
    /**
     * The nav links.
     */
    links: MastheadLink[];
  };

  /**
   * The link sets for footer menu.
   */
  footerMenu: BasicLinkSet[];

  /**
   * The compact version of the links for footer menu.
   */
  footerThin: BasicLink[];

  /**
   * The profile menus.
   */
  profileMenu: {
    /**
     * The profile menu for logged in state.
     */
    signedin: MastheadProfileItem[];

    /**
     * The profile menu for logged out state.
     */
    signedout: MastheadProfileItem[];
  };

  /**
   * Cloud masthead items
   */
  masthead: {
    logo: MastheadLogoData;
    contact: MastheadProfileContent;
    profileMenu: {
      signedout: MastheadProfileContent;
      signedin: MastheadProfileContent;
    };
  };

  /**
   * Miscellaneous translations
   */
  misc: MiscLabels;

  /**
   * Leaving IBM translations
   */
  leaving: LeavingIBMLabels;
}

/**
 * The Redux action ID for `TranslationAPI`.
 */
export enum TRANSLATE_API_ACTION {
  /**
   * One to set the state that the REST call for translation data that is in progress.
   */
  SET_REQUEST_TRANSLATION_IN_PROGRESS = 'SET_REQUEST_TRANSLATION_IN_PROGRESS',

  /**
   * One to set the state that the REST call for translation data failed.
   */
  SET_ERROR_REQUEST_TRANSLATION = 'SET_ERROR_REQUEST_TRANSLATION',

  /**
   * One to set the given translation data.
   */
  SET_TRANSLATION = 'SET_TRANSLATION',
}

/**
 * A Redux substate for `TranslateAPI`.
 */
export interface TranslateAPIState {
  /**
   * The translation data, keyed by the language.
   */
  translations?: { [language: string]: Translation };

  /**
   * The requests for the translation data, keyed by the language.
   */
  requestsTranslation?: { [language: string]: Promise<Translation> | string; endpoint: string };

  /**
   * The status of whether requests for the translation data are in progress, keyed by the language.
   */
  requestsTranslationInProgress?: { [language: string]: boolean };

  /**
   * The errors from the requests for the translation data, keyed by the language.
   */
  errorsRequestTranslation?: { [language: string]: Error };
}

// New for v2.1.0
export interface L0Menu {
  items: L0MenuItem[];
}

export interface L0MenuItem extends BasicLink {
  submenu?: L0Submenu;
}

export interface L0Submenu {
  layout: 'simple' | 'megamenu';
  sections: Megapanel[];
  highlights?: MegapanelLinkGroup[];
  viewAll?: BasicLink;
}

export interface Megapanel {
  heading?: BasicLink;
  groups: MegapanelLinkGroup[];
}

export interface MegapanelLinkGroup {
  heading?: BasicLink;
  links?: BasicLink[];
}
