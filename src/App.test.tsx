/* eslint-disable prettier/prettier */
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App  from './App';

describe('App', () => {
    it('Render hello world', () => {
        // arrange
        render(<App />);
        // act
        // expect
        expect(
            screen.getByRole('heading', {
                level : 1
            })
        ).toHaveTextContent('Hello World');
    });
})