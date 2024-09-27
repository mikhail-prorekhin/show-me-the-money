import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filter from './Filter';
import { FiltersType } from './Filter';

describe('Filter component', () => {
    let mockSubmit: jest.Mock;

    beforeEach(() => {
        mockSubmit = jest.fn();
    });


    test('renders without crashing', () => {
        render(<Filter submit={mockSubmit} />);

        expect(screen.getByTestId('show-more')).toBeInTheDocument();
        expect(screen.queryByTestId('period-label')).not.toBeInTheDocument();
    });

    test('expands filter section when the expand button is clicked', () => {
        render(<Filter submit={mockSubmit} />);

        const expandButton = screen.getByTestId('show-more');
        fireEvent.click(expandButton);
        expect(screen.getByPlaceholderText('MM/DD/YYYY')).toBeInTheDocument();
    });

    test('applies filters and calls the submit function with correct data', async () => {
        render(<Filter submit={mockSubmit} />);

        const expandButton = screen.getByTestId('show-more');
        fireEvent.click(expandButton);

        fireEvent.click(screen.getByTestId('standard-layout'));
        fireEvent.click(screen.getByTestId('payments-only'));


        fireEvent.click(screen.getByTestId('apply-filter-submit'));

        await waitFor(() => {
            const expectedFilters: FiltersType = {
                standardLayout: true,
                paymentsOnly: true,
            };

            expect(mockSubmit).toHaveBeenCalledWith(expectedFilters);
        });
    });


});

