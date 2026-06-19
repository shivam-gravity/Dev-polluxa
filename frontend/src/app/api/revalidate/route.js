// http://localhost:3000/api/revalidate?path=/&secret=cacheRevalidateTest

import { revalidatePath, revalidateTag } from "next/cache";

// related tags for collections which are related to each other, eg. if industry has brands
// 'brand': ['industry'],
// 'industry': ['brand']
// or for cases like case-study has plural form case-studies
const collectionRelations = {
  "agentcommerce": ["agentcommerces"],
  "article": ["articles"],
  "author": ["authors"],
  "career": ["careers"],
  "case-study": ["case-studies"],
  "category": ["categories"],
  "channel-commerce": ["channel-commerces"],
  "commerce": ["commerces"],
  "creator-commerce": ["creator-commerces"],
  "creator-management": ["creator-managements"],
  "dlm": ["dlms"],
  "enterprisegpt": ["enterprisegpts"],
  "event": ["events"],
  "industry": ["industries"],
  "job-type": ["job-types"],
  "logistic": ["logistics"],
  "marketing": ["marketings"],
  "merchandise-financial-planning": ["merchandise-financial-plannings"],
  "navigation": ["navigations"],
  "partner": ["partners"],
  "plm": ["plms"],
  "retail": ["retails"],
  "wms": ["wmss"],
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { model, entry } = body;
    const { slug, locale } = entry || {};

    // Validate secret token
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== process.env.MY_SECRET_TOKEN) {
      console.log("Invalid Token");
      return new Response(
        JSON.stringify({
          revalidated: false,
          message: "Invalid Token",
        }),
        { status: 401 }
      );
    }

    let pathToRevalidate = "";
    let tagToRevalidate = "";
    let relatedTagsToRevalidate = [];

    if (model === "page") {
      pathToRevalidate = slug === "home" ? `/${locale}` : `/${locale}/${slug}`;
    } else {
      tagToRevalidate = model;
    }

    // For non-page models, revalidate the tag first
    if (tagToRevalidate) {
      // Revalidate the primary tag
      revalidateTag(tagToRevalidate);
      console.log(`Revalidated primary tag ${tagToRevalidate}`);

      // Revalidate the related tags, if any
      if (collectionRelations[model]) relatedTagsToRevalidate = collectionRelations[model];
      for (const tag of relatedTagsToRevalidate) {
        revalidateTag(tag);
        console.log(`Revalidated related tag ${tag}`);
      }
    }

    // Then revalidate the path, if any
    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
      console.log(`Revalidated path ${pathToRevalidate}`);
    }

    return new Response(
      JSON.stringify({
        revalidated: true,
        path: pathToRevalidate || undefined,
        tag: tagToRevalidate || undefined,
        relatedTags: relatedTagsToRevalidate.length > 0 ? relatedTagsToRevalidate : undefined
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in revalidation:", error);
    return new Response(
      JSON.stringify({
        revalidated: false,
        message: "Revalidation failed",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}