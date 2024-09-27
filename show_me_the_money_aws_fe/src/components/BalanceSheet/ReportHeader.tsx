import { TableHead, TableRow, TableCell } from "@mui/material";
import { ReportType } from "models/Balance";
import { getTextAlign, isHeaderRow } from "utils";

const ReportHeader = ({ report }: { report: ReportType }) => {
    const cells = report.rows?.filter(isHeaderRow)[0]
        .cells
    const styles = cells && {
        width: `${Math.ceil(50 / (cells.length - 1))}%`,
    };
    return <>
        <colgroup>
            {cells?.map((cell, index) =>
                index ? <col key={index} style={styles} /> : <col key="first" />)
            }
        </colgroup>
        <TableHead sx={{
            bgcolor: 'grey.500'
        }} >
            <TableRow>
                {cells?.map((cell, index) => <TableCell key={`${cell} ${index}`} align={getTextAlign(index)}  >{cell}</TableCell>)}
            </TableRow>
        </TableHead>
    </>


}

export default ReportHeader;