import React from "react";
import { render, screen } from "@testing-library/react";
import BalancePage from 'components/BalancePage/BalancePage';
import getBalance from "api/balance";


jest.mock("api/balance");

describe("BalancePage", () => {
    const mockGetBalance = getBalance as jest.MockedFunction<typeof getBalance>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the loading state initially", async () => {
        mockGetBalance.mockImplementationOnce((_data, _setData, _setError, setLoaded) => {
            setLoaded(false);
        });

        await render(<BalancePage />);

        expect(screen.getByTestId('loading-spiner')).toBeInTheDocument();
    });

    test("renders the BalanceSheet on success", async () => {
        const mockData = { reports: [{ reportTitles: ["title1", "title2", "title3"] }] };

        mockGetBalance.mockImplementationOnce((_data, setData, setError, setLoaded) => {
            setData(mockData);
            setError("");
            setLoaded(true);
        });

        await render(<BalancePage />);
        expect(screen.getByText("title1 / title2 / title3")).toBeInTheDocument();

    });

    test("renders the ErrorBar on error", async () => {
        const mockError = "Failed to load data";

        mockGetBalance.mockImplementationOnce((_data, _setData, setError, setLoaded) => {
            setError(mockError);
            setLoaded(true);
        });
        await render(<BalancePage />);
        expect(screen.getByTestId('error-bar')).toBeInTheDocument();
    })
});
