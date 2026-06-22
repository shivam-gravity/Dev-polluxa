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
    const text = await response.text();
    process.stdout.write(`[FETCH-DEBUG] URL:${requestUrl.substring(0, 80)} status:${response.status} len:${text.length}\n`);
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      process.stdout.write(`[FETCH-DEBUG] JSON PARSE FAILED: ${parseError.message}\n`);
      process.stdout.write(`[FETCH-DEBUG] Full URL: ${requestUrl}\n`);
      process.stdout.write(`[FETCH-DEBUG] Response: ${text.substring(0, 600)}\n`);
      throw parseError;
    }
    return data;
  } catch (error) {
    console.error(error);
    const code = error?.cause?.code ?? error?.code;
    if (code === "ECONNREFUSED" || code === "ENOTFOUND" || code === "ETIMEDOUT") {
      console.warn(
        `[fetchAPI] Backend unreachable (${code}). Returning null — static params will be skipped and pages rendered dynamically.`
      );
      return null;
    }
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    );
  }
}
