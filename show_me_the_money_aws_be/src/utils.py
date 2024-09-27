def convert(response):
    return {
        'reports': [
            {
                'reportTitles': report.get('ReportTitles', ""),
                'reportDate': report.get('ReportDate', ""),
                'rows': [
                    {
                        'rowType': row.get('RowType', ""),
                        'title': row.get('Title', ""),
                        'rows': [
                            {
                                'rowType': sub_row.get('RowType', ""),
                                'title': sub_row.get('Title', ""),
                                'cells': [cell['Value'] for cell in sub_row.get('Cells', [])]
                            }
                            for sub_row in row.get('Rows', [])
                        ],
                        'cells': [cell['Value'] for cell in row.get('Cells', [])]
                    }
                    for row in report.get('Rows', [])
                ]
            }
            for report in response['Reports']
        ]
    }