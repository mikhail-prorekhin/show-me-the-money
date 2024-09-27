import stub from "./stub.json";

export const convert = (stub) => {
  return {
    reports: stub.Reports.map((report) => {
      return {
        reportTitles: report.ReportTitles,
        reportDate: report.ReportDate,
        rows: report.Rows.map((row) => {
          return {
            rowType: row.RowType,
            title: row.Title,
            rows: (row.Rows || []).map((row) => {
              return {
                rowType: row.RowType,
                title: row.Title,
                cells: (row.Cells || []).map((cell) => cell.Value),
              };
            }),
            cells: (row.Cells || []).map((cell) => cell.Value),
          };
        }),
      };
    }),
  };
};

export const result = () => convert(stub);
