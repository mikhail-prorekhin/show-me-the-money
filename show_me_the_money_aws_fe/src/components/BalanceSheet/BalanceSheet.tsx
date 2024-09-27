import { ResponseType } from "models/Balance"
import Report from "./Report"

const BalanceSheet = ({ response }: { response: ResponseType | undefined }) => {

    return <>
        {(response?.reports || []).map(report => {
            const id = report.reportTitles.join("");
            return <Report key={id} report={report} />
        })}
    </>
}


export default BalanceSheet;