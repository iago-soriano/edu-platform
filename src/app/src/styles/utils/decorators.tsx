import React from 'react';
import { ThemeProvider } from "styled-components";
import { Theme } from '@styles';

export const ThemeStorybookDecorator = (Story) => {
    return (
        <ThemeProvider theme={Theme}> 
            <Story />
        </ThemeProvider>
    )
}