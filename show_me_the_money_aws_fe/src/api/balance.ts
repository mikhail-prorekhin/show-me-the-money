import axios from "axios";
import API_SETTINGS from "constants/api";
import { Response, ResponseType } from "models/Balance";

const getBalance = async (
  payload: any,
  setData: (arg0: any) => any,
  setError: (arg0: any) => any,
  setLoaded: (arg0: boolean) => void
) => {
  setLoaded(false);
  setData(null);
  setError("");

  const url = API_SETTINGS.apiURL + "/reports";

  try {
    const response = await axios.get(url, {
      params: payload,
      headers: {
        "x-api-key": API_SETTINGS.apiKey,
        "Content-Type": "application/json",
      },
    });

    await Response.validate(response.data?.body as unknown as ResponseType);
    setData(response.data?.body);
  } catch (_) {
    setError("Service Error, Please call support");
  } finally {
    setLoaded(true);
  }
};

export default getBalance;
