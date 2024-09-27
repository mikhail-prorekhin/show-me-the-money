import {
  SectionRowType,
  RowType,
  BodyRowType,
  FooterRowType,
  HeaderRowType,
} from "models/Balance";

export const getTextAlign = (index: number): "right" | "left" =>
  index ? "right" : "left";

export function isBodyRow(row: any): row is SectionRowType {
  return row.rowType === RowType.Section;
}

export function isDataRow(row: any): row is BodyRowType {
  return row.rowType === RowType.Row;
}

export function isFooterRow(row: any): row is FooterRowType {
  return row.rowType === RowType.Summary;
}

export function isHeaderRow(row: any): row is HeaderRowType {
  return row.rowType === RowType.Header;
}
