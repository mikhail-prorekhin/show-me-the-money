import { Card, CardActions, CardContent, Collapse, Typography, TableContainer, Table } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReportType } from "models/Balance";
import React from "react";
import ExpandBlock from "../common/ExpandBlock";
import ReportHeader from "./ReportHeader";
import ReportBodySection from "./ReportBodySection";


const Report = ({ report }: { report: ReportType }) => {
    const [expanded, setExpanded] = React.useState(true);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <Card sx={{
        margin: "1rem 0",
    }} >
        <CardActions sx={{
            justifyContent: "space-between",
            bgcolor: 'info.light'
        }}  >
            <Typography sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium' }} >{report.reportTitles.join(" / ")}</Typography>
            <ExpandBlock
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                data-testid="show-report"
            >
                <ExpandMoreIcon />
            </ExpandBlock>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <TableContainer >
                    <Table >
                        <ReportHeader report={report} />
                        <ReportBodySection report={report} />
                    </Table>
                </TableContainer>
            </CardContent>
        </Collapse>
    </Card>
}






export default Report;