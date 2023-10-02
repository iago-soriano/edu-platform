import React from 'react';
// import { ThemeProvider } from "styled-components";
import { ThemeProvider } from '@contexts';

export const ThemeStorybookDecorator = (Story) => {

    return (
        <ThemeProvider > 
            <Story />
        </ThemeProvider>
    )
}