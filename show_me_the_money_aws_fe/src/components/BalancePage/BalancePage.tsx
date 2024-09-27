import BalanceSheet from "components/BalanceSheet/BalanceSheet";
import { ResponseType } from "models/Balance"
import Filter from "./Filter";
import React from "react";
import getBalance from "api/balance";
import Loading from "components/Loading/Loading";
import ErrorBar from "components/ErrorBar/ErrorBar";


const BalancePage = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState("");
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
        getBalance(
            {},
            setData,
            setError,
            setLoaded
        )
    }, []);

    const submit = (data: any) => {
        getBalance(
            data,
            setData,
            setError,
            setLoaded
        )
    }

    return <>
        <Filter submit={submit} />
        {(loaded) ? (error ? <ErrorBar message={error} /> :
            <BalanceSheet response={data as unknown as ResponseType} />) : <Loading />}
    </>


}


export default BalancePage;