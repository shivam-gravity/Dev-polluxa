"use server";

export async function getShippingPrice(payLoad) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `d54894254aa7ce8c4c01035dba438b4e-7eaaf8e4-1009-4846-aa2e-2462f3c365d4-31590defce148f3f48a0f7509facd765/598ee749afcbc367333a9000d52aeddf/cd67da85-a874-43b1-b6d6-86a38af4661b`,
      "X-API-KEY": "DGD*pwY8Cnmr+a6&5nLDJhKnjt6=ZC",
    },
    body: JSON.stringify(payLoad),
  };

  const response = await fetch(
    "https://api.aymakan.net/v2/service/price",
    options
  );
  const data = await response.json();
  return data;
}

export async function getShipmentDetails(payLoad) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `d54894254aa7ce8c4c01035dba438b4e-7eaaf8e4-1009-4846-aa2e-2462f3c365d4-31590defce148f3f48a0f7509facd765/598ee749afcbc367333a9000d52aeddf/cd67da85-a874-43b1-b6d6-86a38af4661b`,
      "X-ADMIN-API-TOKEN":
        "GSmtUI8phKtGspZ76de8YeBm6a1XSIcVUsQi0SOI1YpS5FezKo1TZiIe7HHW6Y0T",
    },
  };

  const response = await fetch(
    `https://api.aymakan.net/admin/shipping/track/${payLoad}`,
    options
  );
  const data = await response.json();
  return data;
}
