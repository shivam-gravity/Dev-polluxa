import qs from "qs";
import { getStrapiURL } from "./api-helpers";
import { routing } from "@/i18n/routing";

export async function fetchAPI(path, urlParamsObject = {}, options = {}, tag, locale = null) {
  const currentLocale = locale || routing.defaultLocale;
  try {
    // Merge default and user options
    const mergedOptions = {
      //next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      ...(tag && { next: { tags: [tag] } }),
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}&locale=${currentLocale}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    );
  }
}
