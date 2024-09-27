import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Report from 'components/BalanceSheet/Report';

const mockReport =
{
    "reportTitles": [
        "Balance Sheet",
        "Demo Org",
        "As at 25 September 2024"
    ],
    "reportDate": "25 September 2024",
    "rows": [
        {
            "rowType": "Header",
            "title": "",
            "rows": [],
            "cells": [
                "",
                "25 September 2024",
                "26 September 2023"
            ]
        },
        {
            "rowType": "Section",
            "title": "Bank",
            "rows": [
                {
                    "rowType": "Row",
                    "title": "",
                    "cells": [
                        "My Bank Account",
                        "126.70",
                        "99.60"
                    ]
                },
                {
                    "rowType": "Row",
                    "title": "",
                    "cells": [
                        "Sample Business",
                        "92911.00",
                        "92911.00"
                    ]
                },
                {
                    "rowType": "Row",
                    "title": "",
                    "cells": [
                        "Sample Business 1",
                        "11039.00",
                        "11039.00"
                    ]
                },
                {
                    "rowType": "SummaryRow",
                    "title": "",
                    "cells": [
                        "Total Bank",
                        "104076.70",
                        "104049.60"
                    ]
                }
            ],
            "cells": []
        },
    ]
}


describe('Report', () => {
    it('renders Report', () => {

        render(<Report report={mockReport} />);
        expect(screen.getByText('Bank')).toBeInTheDocument();
        expect(screen.getByText('25 September 2024')).toBeInTheDocument();
        expect(screen.getByText('Balance Sheet / Demo Org / As at 25 September 2024')).toBeInTheDocument();
    });

    it('toggles section expansion on click', async () => {
        render(<Report report={mockReport} />);

        expect(screen.getByText('Bank')).toBeInTheDocument();
        expect(screen.getByText('25 September 2024')).toBeInTheDocument();
        expect(screen.getByText('Balance Sheet / Demo Org / As at 25 September 2024')).toBeInTheDocument();

        const expandButton = screen.getByTestId('show-report');
        fireEvent.click(expandButton);

        await waitFor(() => {
            expect(screen.queryByText('Bank')).not.toBeInTheDocument();
            expect(screen.queryByText('25 September 2024')).not.toBeInTheDocument();
            expect(screen.getByText('Balance Sheet / Demo Org / As at 25 September 2024')).toBeInTheDocument();
        })
    });
});