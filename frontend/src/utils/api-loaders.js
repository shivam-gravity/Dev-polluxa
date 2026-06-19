"use server";
import { fetchAPI } from "@/utils/fetch-api";

const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function getGlobal(locale = null) {
  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "global";

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "navbar.links",
      "navbar.button",
      "navbar.navbarLogo.logoImg",
      "navbar.navbarLogoMobile.logoImg",
      "subMenu.button",
      "subMenu.subMenuLogo.logoImg",
      "footer.socialLinks",
      "footer.socialLinks.icon",
      "footer.footerLogo.logoImg",
      "footer.button",
      "footer.menuLinks",
      "leadForm",
      "leadForm.submitButton",
      "footer.FooterMenu.FooterLinks",
      "testimonials",
      "testimonials.Testimonial",
      "testimonials.Testimonial.picture",
    ],
  };
  return await fetchAPI(path, urlParamsObject, options, tag, locale);
}

export async function getMainMenu(locale = null) {
  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/main-menu`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "main-menu";

  const urlParamsObject = {
    populate: [
      "MainMenuItems",
      "MainMenuItems.Button",
      "MainMenuItems.media.file",
      "MainMenuItems.navigations",
      "MainMenuItems.navigations.links",
      "MainMenuItems.navigations.links.icon",
      "MainMenuItems.navigations.Button",
      "MainMenuItems.navigations.media.file",
    ],
  };
  return await fetchAPI(path, urlParamsObject, options, tag, locale);
}

export async function getPageBySlug(slug, locale = null) {
  const path = `/pages`;
  const urlParamsObject = { filters: { slug } };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return await fetchAPI(path, urlParamsObject, options, null, locale);
}

export async function getPostBySlug(slug, collections, locale = null) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/${collections}`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      seo: {
        fields: ["metaTitle", "metaDescription"],
      },
      job_types: {
        populate: {
          careers: {
            populate: {
              cover: { fields: ["url", "alternativeText", "width", "height"] },
              job_types: true,
              title: true,
              location: true,
              level: true,
              description: true,
            },
            filters: {
              slug: {
                $ne: slug,
              },
            },
          },
        },
      },
      category: {
        populate: {
          articles: {
            filters: {
              slug: {
                $ne: slug,
              },
            },
            sort: ["createdAt:desc"],
            pagination: {
              limit: 4,
            },
            populate: {
              cover: { fields: ["url", "alternativeText", "width", "height"] },
              cardCover: {
                fields: ["url", "alternativeText", "width", "height"],
              },
              category: { populate: "*" },
              authorsBio: {
                populate: "*",
              },
            },
          },
        },
      },
      blocks: {
        populate: {
          __component: "*",
          feature: {
            populate: {
              media: {
                fields: [
                  "url",
                  "alternativeText",
                  "caption",
                  "width",
                  "height",
                ],
              },
            },
          },
          features: {
            populate: {
              bullets: "*",
              image: {
                fields: [
                  "url",
                  "alternativeText",
                  "caption",
                  "width",
                  "height",
                ],
              },
            },
          },
          KPIS: {
            populate: {
              description: "*",
              KPI: {
                populate: {
                  description: "*",
                  metrics: "*",
                  metricSuffix: "*",
                },
              },
            },
          },
          BrandAchievements: {
            populate: {
              description: "*",
              KPI: {
                populate: {
                  description: "*",
                  metrics: "*",
                  metricSuffix: "*",
                  image: "*",
                },
              },
            },
          },
          brands: {
            populate: {
              media: {
                populate: {
                  file: "*",
                },
              },
            },
          },
          service: {
            populate: {
              icon: {
                populate: {
                  file: "*",
                },
              },
              Button: "*",
            },
          },
          PostInformation: {
            populate: {
              header: "*",
              Features: {
                populate: {
                  Bullets: true,
                },
              },
            },
          },
          socialLinks: {
            populate: {
              icon: {
                populate: {
                  file: "*",
                },
              },
            },
          },
          video: {
            populate: {
              video: "*",
            },
          },
          header: {
            populate: {
              fields: ["heading", "description"],
            },
          },
          Features: "*",
          Bullets: "*",
          Button: "*",
          buttons: "*",
          picture: "*",
          media: {
            populate: {
              file: "*",
            },
          },
          FormDetails: {
            populate: {
              fields: ["title", "description"],
            },
          },
        },
      },
      cover: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = `${collections}`;
  const response = await fetchAPI(path, urlParamsObject, options, tag, locale);
  return response;
}

export async function getAllArticles(collections, page = 1, locale = null) {
  const path = `/${collections}`;
  const urlParamsObject = {
    populate: ["cover", "author", "category", "job_types"],
    sort: ["publishedAt:desc"],
    pagination: {
      page: page,
      pageSize: 24,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = collections;
  const response = await fetchAPI(path, urlParamsObject, options, tag, locale);
  return response;
}
