import { Typography } from "@mui/material"

const ErrorBar = ({ message }: { message: string }) => <Typography color="error" variant="h6" align="center" data-testid="error-bar">
    Sorry,  {message}
</Typography>



export default ErrorBar