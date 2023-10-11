import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStorybookDecorator } from '@styles';
import { useTheme } from 'styled-components';

import { FormButton } from './index';

const meta = {
    title: 'Core/Buttons/FormButton',
    component: FormButton,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
    },
  } satisfies Meta<typeof FormButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    argTypes: {
      loading: {
        control: 'boolean',
        description: 'fsdfsd'
      },
      disabled: {
        control: 'boolean',
        description: 'fsdfsd'
      },
      onClick: { control: { disable: true } }, // Disable control for onClick,
    },
    args: {
        label: "Button"
    },
    decorators: [ThemeStorybookDecorator]
  };
  