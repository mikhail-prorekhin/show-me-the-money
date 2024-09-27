import { render, screen, fireEvent } from '@testing-library/react';
import ReportBodySection from './ReportBodySection';
import { ReportType, SectionRowType } from 'models/Balance';

const mockReport =
{
    "rowType": "Section",
    "title": "Non-current Assets",
    "rows": [
        {
            "rowType": "Header",
            "rows": [],
            "cells": [
                "",
                "19 September 2024",
                "20 September 2023"
            ]
        },
        {
            "rowType": "Section",
            "title": "Non-current Assets",
            "rows": [
                {
                    "rowType": "Row",
                    "cells": [
                        "Warehouse Equipments",
                        "10000.00",
                        "10000.00"
                    ]
                },
                {
                    "rowType": "SummaryRow",
                    "cells": [
                        "Total Non-current Assets",
                        "88000.00",
                        "88000.00"
                    ]
                }
            ],
            "cells": []
        },
    ],
    "cells": []
}

describe('ReportBodySection', () => {
    it('renders ReportSection components within TableBody', () => {

        render(<ReportBodySection report={mockReport} />);
        expect(screen.getByText('Warehouse Equipments')).toBeInTheDocument();
        expect(screen.getByText('Total Non-current Assets')).toBeInTheDocument();
        expect(screen.getByText('Non-current Assets')).toBeInTheDocument();
    });

    it('toggles section expansion on click', () => {
        render(<ReportBodySection report={mockReport} />);

        expect(screen.getByText('Warehouse Equipments')).toBeInTheDocument();
        expect(screen.getByText('Total Non-current Assets')).toBeInTheDocument();
        expect(screen.getByText('Non-current Assets')).toBeInTheDocument();

        const expandButton = screen.getByTestId('show-more');
        fireEvent.click(expandButton);

        expect(screen.queryByText('Warehouse Equipments')).not.toBeInTheDocument();
        expect(screen.queryByText('Total Non-current Assets')).not.toBeInTheDocument();
        expect(screen.getByText('Non-current Assets')).toBeInTheDocument();
    });
});
