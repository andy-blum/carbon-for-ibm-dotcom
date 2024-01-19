/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ArrowRight } from '@carbon/icons-react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
// eslint-disable-next-line max-len
import C4DCardSectionCarousel from '@carbon/ibmdotcom-web-components/es/components-react/card-section-carousel/card-section-carousel';
// @ts-ignore
import C4DCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
// @ts-ignore
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
// @ts-ignore
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
// @ts-ignore
import C4DContentSectionCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-copy';
// @ts-ignore
// eslint-disable-next-line max-len
import C4DContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
// @ts-ignore
import C4DLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';
// @ts-ignore
import C4DCarousel from '@carbon/ibmdotcom-web-components/es/components-react/carousel/carousel';
import readme from './README.stories.react.mdx';
import styles from './card-section-carousel.stories.scss';

const hrefDefault = 'https://www.ibm.com/standards/carbon';
const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;
const iconProps = {
  size: 20,
  slot: 'icon',
};

const Card = ({
  copy = copyDefault,
  heading = headingDefault,
  href = hrefDefault,
} = {}) => (
  <C4DCard href={href}>
    <C4DCardHeading>{heading}</C4DCardHeading>
    <p>{copy}</p>
    <C4DCardFooter>
      <ArrowRight {...iconProps} />
    </C4DCardFooter>
  </C4DCard>
);

export const Default = () => {
  return (
    <C4DCardSectionCarousel>
      <C4DContentSectionHeading>
        Lorem ipsum dolor sit amet
      </C4DContentSectionHeading>
      <C4DContentSectionCopy>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est.
      </C4DContentSectionCopy>
      <C4DLinkWithIcon slot="footer" href={hrefDefault}>
        Link text
        <ArrowRight {...iconProps} />
      </C4DLinkWithIcon>
      <C4DCarousel>
        <Card />
        <Card copy={copyOdd} />
        <Card />
        <Card copy={copyOdd} />
        <Card />
      </C4DCarousel>
    </C4DCardSectionCarousel>
  );
};

export default {
  title: 'Components/Card section carousel',
  decorators: [
    (story) => (
      <>
        <style type="text/css">{styles.cssText}</style>
        <div className="cds--grid">
          <div className="cds--row grid-alignment">{story()}</div>
        </div>
      </>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
