import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  // stories: [
  //   {
  //     // 👇 Sets the directory containing your stories
  //     directory: '../src/components/**/',
  //     // 👇 Storybook will load all files that match this glob
  //     files: '*.stories.*',
  //     // 👇 Used when generating automatic titles for your stories
  //     titlePrefix: 'Core',
  //   },
  // ],
  stories: ['../src/**/*.mdx', '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
