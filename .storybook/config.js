import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import centered from '@storybook/addon-centered/react';

// import '../src/styles.css';

import theme from './customTheme'

addParameters({
  options: {
    theme,
  }
});

addDecorator(withInfo);
addDecorator(centered);

configure(require.context('../stories', true, /\.stories\.js$/), module);
