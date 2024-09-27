import axios from "axios";
import API_SETTINGS from "constants/api";
import { Response, ResponseType } from "models/Balance";
import getBalance from "./balance";

jest.mock("axios");

describe("getBalance", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("should set data when API call is successful", async () => {
    const mockData = { data: { body: { reports: [] } } };
    const payload = { reportType: "summary" };

    // Mock the validate method

    axios.get = jest.fn().mockReturnValue(Promise.resolve(mockData));

    const setData = jest.fn();
    const setError = jest.fn();
    const setLoaded = jest.fn();

    await getBalance(payload, setData, setError, setLoaded);
    expect(axios.get).toHaveBeenCalledWith(API_SETTINGS.apiURL + "/reports", {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_SETTINGS.apiKey,
      },
      params: {
        ...payload,
      },
    });
    expect(setLoaded).toHaveBeenCalledWith(false);
    expect(setData).toHaveBeenCalledWith(mockData.data.body);
    expect(setError).toHaveBeenCalledWith("");
    expect(setLoaded).toHaveBeenCalledWith(true);
  });

  it("should set error when API call fails", async () => {
    const payload = { reportType: "summary" };

    axios.get = jest.fn().mockReturnValue(Promise.reject("error happends"));

    const setData = jest.fn();
    const setError = jest.fn();
    const setLoaded = jest.fn();

    await getBalance(payload, setData, setError, setLoaded);

    expect(setLoaded).toHaveBeenCalledWith(false);
    expect(setData).toHaveBeenCalledWith(null);
    expect(setError).toHaveBeenCalledWith("Service Error, Please call support");
    expect(setLoaded).toHaveBeenCalledWith(true);
  });

  it("should handle validation failure", async () => {
    const mockData = { data: { body: { data: "wrong" } } };
    const payload = { reportType: "summary" };

    axios.get = jest.fn().mockReturnValue(Promise.resolve(mockData));

    const setData = jest.fn();
    const setError = jest.fn();
    const setLoaded = jest.fn();

    await getBalance(payload, setData, setError, setLoaded);

    expect(setLoaded).toHaveBeenCalledWith(false);
    expect(setData).toHaveBeenCalledWith(null);
    expect(setError).toHaveBeenCalledWith("Service Error, Please call support");
    expect(setLoaded).toHaveBeenCalledWith(true);
  });
});
