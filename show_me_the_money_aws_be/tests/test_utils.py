import unittest
import sys

sys.path.append("../src")
from utils import convert


class TestConvertFunction(unittest.TestCase):

    def test_basic_conversion(self):
        stub = {
            "Status": "OK",
            "Reports": [
                {
                    "ReportID": "BalanceSheet",
                    "ReportName": "Balance Sheet",
                    "ReportType": "BalanceSheet",
                    "ReportTitles": [
                        "Balance Sheet",
                        "Demo Org",
                        "As at 19 September 2024",
                    ],
                    "ReportDate": "19 September 2024",
                    "UpdatedDateUTC": "/Date(1726725133935)/",
                    "Fields": [],
                    "Rows": [
                        {
                            "RowType": "Header",
                            "Cells": [
                                {"Value": ""},
                                {"Value": "19 September 2024"},
                                {"Value": "20 September 2023"},
                            ],
                        },
                        {
                            "RowType": "Section",
                            "Title": "Bank",
                            "Rows": [
                                {
                                    "RowType": "Row",
                                    "Cells": [
                                        {
                                            "Value": "My Bank Account",
                                            "Attributes": [
                                                {
                                                    "Value": "d2e3044e-2fb8-42fa-be17-64c8956d5f57",
                                                    "Id": "account",
                                                }
                                            ],
                                        },
                                        {
                                            "Value": "126.70",
                                            "Attributes": [
                                                {
                                                    "Value": "d2e3044e-2fb8-42fa-be17-64c8956d5f57",
                                                    "Id": "account",
                                                }
                                            ],
                                        },
                                        {
                                            "Value": "99.60",
                                            "Attributes": [
                                                {
                                                    "Value": "d2e3044e-2fb8-42fa-be17-64c8956d5f57",
                                                    "Id": "account",
                                                }
                                            ],
                                        },
                                    ],
                                },
                                {
                                    "RowType": "SummaryRow",
                                    "Cells": [
                                        {"Value": "Total Bank"},
                                        {"Value": "104076.70"},
                                        {"Value": "104049.60"},
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    "ReportID": "BalanceSheet_1",
                    "ReportName": "Balance Sheet _1",
                    "ReportType": "BalanceSheet",
                    "ReportTitles": ["str1", "str1", "str3"],
                    "ReportDate": "20 September 2024",
                    "UpdatedDateUTC": "/Date(1726725133935)/",
                    "Fields": [],
                    "Rows": [
                        {
                            "RowType": "Header",
                            "Cells": [
                                {"Value": ""},
                                {"Value": "19 September 2024"},
                                {"Value": "20 September 2023"},
                            ],
                        },
                        {
                            "RowType": "Section",
                            "Title": "Bank",
                            "Rows": [
                                {
                                    "RowType": "Row",
                                    "Cells": [
                                        {
                                            "Value": "My Bank Account",
                                            "Attributes": [
                                                {
                                                    "Value": "d2e3044e-2fb8-42fa-be17-64c8956d5f57",
                                                    "Id": "account",
                                                }
                                            ],
                                        },
                                        {
                                            "Value": "126.70",
                                            "Attributes": [
                                                {
                                                    "Value": "d2e3044e-2fb8-42fa-be17-64c8956d5f57",
                                                    "Id": "account",
                                                }
                                            ],
                                        },
                                        {
                                            "Value": "99.60",
                                            "Attributes": [
                                                {
                                                    "Value": "d2e3044e-2fb8-42fa-be17-64c8956d5f57",
                                                    "Id": "account",
                                                }
                                            ],
                                        },
                                    ],
                                }
                            ],
                        },
                    ],
                },
            ],
        }

        expected_output = {
            "reports": [
                {
                    "reportTitles": [
                        "Balance Sheet",
                        "Demo Org",
                        "As at 19 September 2024",
                    ],
                    "reportDate": "19 September 2024",
                    "rows": [
                        {
                            "rowType": "Header",
                            "title": "",
                            "rows": [],
                            "cells": ["", "19 September 2024", "20 September 2023"],
                        },
                        {
                            "rowType": "Section",
                            "title": "Bank",
                            "rows": [
                                {
                                    "rowType": "Row",
                                    "title": "",
                                    "cells": ["My Bank Account", "126.70", "99.60"],
                                },
                                {
                                    "rowType": "SummaryRow",
                                    "title": "",
                                    "cells": ["Total Bank", "104076.70", "104049.60"],
                                },
                            ],
                            "cells": [],
                        },
                    ],
                },
                {
                    "reportTitles": ["str1", "str1", "str3"],
                    "reportDate": "20 September 2024",
                    "rows": [
                        {
                            "rowType": "Header",
                            "title": "",
                            "rows": [],
                            "cells": ["", "19 September 2024", "20 September 2023"],
                        },
                        {
                            "rowType": "Section",
                            "title": "Bank",
                            "rows": [
                                {
                                    "rowType": "Row",
                                    "title": "",
                                    "cells": ["My Bank Account", "126.70", "99.60"],
                                }
                            ],
                            "cells": [],
                        },
                    ],
                },
            ]
        }
        self.assertEqual(convert(stub), expected_output)

    def test_empty_report(self):
        stub = {"Reports": []}
        expected_output = {"reports": []}
        self.assertEqual(convert(stub), expected_output)

    def test_missing_cells(self):
        stub = {
            "Reports": [
                {
                    "ReportTitles": "Test Report",
                    "ReportDate": "2024-09-01",
                    "Rows": [{"RowType": "Header", "Title": "Assets", "Rows": []}],
                }
            ]
        }

        expected_output = {
            "reports": [
                {
                    "reportTitles": "Test Report",
                    "reportDate": "2024-09-01",
                    "rows": [
                        {
                            "rowType": "Header",
                            "title": "Assets",
                            "rows": [],
                            "cells": [],
                        }
                    ],
                }
            ]
        }

        self.assertEqual(convert(stub), expected_output)


if __name__ == "__main__":
    unittest.main()

# python -m unittest test_convert.py
