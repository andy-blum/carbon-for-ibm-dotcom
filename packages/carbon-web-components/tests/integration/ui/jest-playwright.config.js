/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  browser: process.env.CCE_UI_INTEGRATION_TEST_BROWSER,
  launchBrowserApp: {
    headless: process.env.CI !== 'false',
  },
};
