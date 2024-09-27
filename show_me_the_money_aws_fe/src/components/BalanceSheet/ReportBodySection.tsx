import { TableCell, TableRow, TableBody } from "@mui/material";
import { SectionRowType, ReportType } from "models/Balance";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandBlock from "../common/ExpandBlock";
import React from "react";
import { getTextAlign, isBodyRow, isDataRow, isFooterRow, isHeaderRow } from "utils";


const ReportSection = ({ section, colNumber }: { section: SectionRowType, colNumber: number }) => {
    const [expanded, setExpanded] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const rows = section.rows?.filter(isDataRow)
    const footerRows = section.rows?.filter(isFooterRow);

    const body = React.useMemo(() => {
        const footer = footerRows.length ? footerRows[0].cells : [];
        return <>
            {
                rows.map((row, index) => <TableRow key={`${row.cells[0]} ${index} `}>
                    {row.cells.map((cell, index) => <TableCell sx={{ paddingLeft: '2rem' }} align={getTextAlign(index)} key={`${cell} + ${index}`}>{cell}</TableCell>)}
                </TableRow>
                )}
            <TableRow>
                {footer.map((cell, index) => <TableCell sx={{ paddingLeft: '2rem', fontWeight: 'medium' }} align={getTextAlign(index)} key={`${cell} + ${index}`}>{cell}</TableCell>)}
            </TableRow>

        </>
    }, [rows, footerRows])

    return <>
        <TableRow sx={{
            bgcolor: 'grey.300'
        }} >
            <TableCell sx={{ fontSize: '1rem', fontWeight: 'medium' }} colSpan={colNumber - 1} >{section.title}</TableCell>
            <TableCell align="right" >
                <ExpandBlock
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    data-testid="show-more"
                >
                    <ExpandMoreIcon />
                </ExpandBlock>
            </TableCell>

        </TableRow>
        <>
            {expanded && body}
        </>
    </>
}




const ReportBodySection = ({ report }: { report: ReportType }) => {
    const rows = report.rows?.filter(isBodyRow)
    const headerCells = report.rows?.filter(isHeaderRow)[0]
        .cells

    return <TableBody>
        {rows?.map((row, index) => <ReportSection key={`${row.title} ${index}`} colNumber={headerCells.length} section={row} />)}
    </TableBody>
}
export default ReportBodySection;


