/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-link-with-icon (cdn)', () => {
  it('should load the default dds-link-with-icon example', () => {
    cy.visit('/link-with-icon/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-link-with-icon | cdn | default');
  });
});
