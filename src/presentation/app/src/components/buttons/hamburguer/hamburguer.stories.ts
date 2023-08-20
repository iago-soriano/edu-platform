import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStorybookDecorator } from '@styles';

import { HamburguerButton } from './index';

const meta = {
  title: 'Core/Buttons/Hamburguer',
  component: HamburguerButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HamburguerButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    open: {
      control: 'boolean',
      description: 'fsdfsd'
    },
    onClick: { control: { disable: true } }, // Disable control for onClick
  },
  decorators: [ThemeStorybookDecorator]
};


