import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportHeader from './ReportHeader';
import { ReportType } from 'models/Balance';



describe('ReportHeader', () => {
    it('renders the table header with correct cells', () => {

        const mockReport: ReportType = {
            rows: [

                {
                    "rowType": "Section",
                    "rows": [],
                    cells: ['Header 1', 'Header 2', 'Header 3'],
                },
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
                    "title": "Assets",
                    "rows": [],
                    "cells": []
                },
            ],
        };

        render(<ReportHeader report={mockReport} />);

        expect(screen.getByText("19 September 2024")).toBeInTheDocument();
        expect(screen.getByText("20 September 2023")).toBeInTheDocument();
    });

    it('applies the correct styles to the col elements', () => {
        const mockReport: ReportType = {
            rows: [
                {
                    "rowType": "Section",
                    "title": "Assets",
                    "rows": [],
                    "cells": []
                },
                {
                    "rowType": "Header",
                    "rows": [],
                    "cells": [
                        "",
                        "19 September 2024",
                        "20 September 2023",
                        "20 September 2022",
                        "20 September 2021"
                    ]
                },
            ],
        };
        const { container } = render(<ReportHeader report={mockReport} />);


        const colGroup = container.querySelector('colgroup');
        expect(colGroup).toBeInTheDocument();

        const cols = colGroup?.querySelectorAll('col');
        expect(cols).toHaveLength(5);


        expect(cols[1]).toHaveStyle('width: 13%');
    });
});