import os
import json
import requests
from utils import convert

XERO_API = os.environ["XERO_API"]
GET_BALANCE = os.environ["GET_BALANCE"]


def lambda_handler(event, context):
    url = XERO_API + GET_BALANCE
    payload = event.get("payload", {})

    try:
        response = requests.get(
            url, params=payload, headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        response_data = response.json()
        return {"statusCode": 200, "body": convert(response_data)}
    except requests.exceptions.RequestException as e:
        return {"statusCode": 500, "body": "Internal Error"}
