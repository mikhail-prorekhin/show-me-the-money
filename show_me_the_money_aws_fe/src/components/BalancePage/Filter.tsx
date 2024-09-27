import { Card, CardActions, CardContent, Collapse, Typography, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import ExpandBlock from "../common/ExpandBlock";
import dayjs from "dayjs";

export type FiltersType = {
    date: string,
    paymentsOnly: boolean,
    standardLayout: boolean,
    period: string,
    timeframe: string,
    trackingOptionID1: string
}

const removeEmptyFields = (filters: FiltersType) => Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value !== null &&
        value !== undefined &&
        value !== false &&
        ((typeof value !== 'string') || value.trim())
    )
);

const Filter = ({ submit }: { submit: (arg0: any) => void }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [filters, setFilters] = React.useState<FiltersType>({} as FiltersType)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const applyFilters = (
        submit: { (formdata: any): void; (arg0: FiltersType): void; }) => () => {
            submit(removeEmptyFields(filters))
        }

    return <Card sx={{ margin: "1rem 0" }} >
        <CardActions sx={{
            justifyContent: "space-between",
            bgcolor: 'secondary.light'
        }}  >
            <Typography sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium' }} >Filters </Typography>
            <ExpandBlock
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                data-testid="show-more"
            >
                <ExpandMoreIcon />
            </ExpandBlock>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CardContent sx={{ flexGrow: 1 }}  >
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <DatePicker onChange={(value) =>
                                    setFilters({ ...filters, date: (value?.format('YYYY-MM-DD').toString() || "") })}
                                    value={dayjs(filters.date)}
                                    name="date" data-testid="date" label="Date" />
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="period-label">Period</InputLabel>
                                <Select
                                    name="period"
                                    labelId="period-label"
                                    id="period"
                                    value={filters.period ?? ""}
                                    label="Period"
                                    onChange={(event: SelectChangeEvent) =>
                                        setFilters({ ...filters, period: event.target.value })}
                                    data-testid="period"
                                >
                                    <MenuItem value={""}>{"-"}</MenuItem>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(id => <MenuItem key={id} value={id}>{id}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="timeframe-label">Timeframe</InputLabel>
                                <Select
                                    fullWidth
                                    name="timeframe"
                                    labelId="timeframe-label"
                                    id="timeframe"
                                    value={filters.timeframe ?? ""}
                                    label="timeframe"
                                    onChange={(event: SelectChangeEvent) =>
                                        setFilters({ ...filters, timeframe: event.target.value })}
                                    data-testid="time-frame"
                                >
                                    <MenuItem value={""}>{"-"}</MenuItem>
                                    <MenuItem value={'MONTH'}>MONTH</MenuItem>
                                    <MenuItem value={'QUARTER'}>QUARTER</MenuItem>
                                    <MenuItem value={'YEAR'}>YEAR</MenuItem>
                                </Select></FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                name="trackingOptionID1"
                                label="Tracking Option"
                                value={filters.trackingOptionID1 ?? ""}
                                onChange={(event) => setFilters({ ...filters, trackingOptionID1: event.target.value })}
                                data-testid="tracking-optionID1"
                            />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <FormControlLabel control={<Checkbox name="standardLayout"
                                checked={filters.standardLayout ?? false}
                                onChange={(event) => setFilters({ ...filters, standardLayout: event.target.checked })}
                                data-testid="standard-layout"
                            />} label="Standard Layout" />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <FormControlLabel control={<Checkbox name="paymentsOnly"
                                checked={filters.paymentsOnly ?? false}
                                onChange={(event) => setFilters({ ...filters, paymentsOnly: event.target.checked })}
                                data-testid="payments-only"
                            />} label="Payments Only" />
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}

                        onClick={applyFilters(submit)}
                        data-testid="apply-filter-submit"
                    >
                        Apply
                    </Button>
                </CardContent>
            </LocalizationProvider>
        </Collapse>
    </Card >
}

export default Filter;