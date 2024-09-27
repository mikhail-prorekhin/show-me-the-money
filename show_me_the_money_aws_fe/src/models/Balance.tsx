import * as Yup from 'yup';

export enum RowType {
    Header = "Header",
    Section = "Section",
    Summary = "SummaryRow",
    Row = "Row"
}


export const Row = Yup.object({
    rowType: Yup.string()
        .oneOf([RowType.Row])
        .required(),
    cells: Yup.array().of(Yup.string()).required()
}).defined();

export const HeaderRow = Yup.object({
    rowType: Yup.string()
        .oneOf([RowType.Header])
        .required(),
    cells: Yup.array().of(Yup.string()).required()
}).defined();

export const SummaryRow = Yup.object({
    rowType: Yup.string()
        .oneOf([RowType.Summary])
        .required(),
    cells: Yup.array().of(Yup.string()).required()
}).defined();


export const SectionRow = Yup.object({
    rowType: Yup.string()
        .oneOf([RowType.Section])
        .required(),
    title: Yup.string().required(),
    rows: Yup.array().of(Row).required()
}).defined();

export const RowsSchema = Yup.array().of(
    Yup.lazy((value) => {
        switch (value.fieldType) {
            case RowType.Header:
                return HeaderRow;
            case RowType.Section:
                return SectionRow;
            case RowType.Summary:
                return SummaryRow;
            default:
                return Yup.mixed().required();
        }
    })
).required();

export const Report = Yup.object({
    reportTitles: Yup.array().of(Yup.string()).required(),
    reportDate: Yup.string().required(),
    rows: RowsSchema,
}).defined();

export const Response = Yup.object({
    reports: Yup.array().of(Report).required(),
})

export type ResponseType = Yup.InferType<typeof Response>;
export type ReportType = Yup.InferType<typeof Report>;
export type HeaderRowType = Yup.InferType<typeof HeaderRow>;
export type FooterRowType = Yup.InferType<typeof SummaryRow>;
export type SectionRowType = Yup.InferType<typeof SectionRow>;
export type BodyRowType = Yup.InferType<typeof Row>;
