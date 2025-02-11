export default async function sitemap() {
  const baseUrl = "https://www.melikeozturk.com";

  // Ana sayfalar
  const routes = [
    "",
    "/izmit-diyetisyen",
    "/kocaeli-diyetisyen",
    "/gizlilik-politikasi",
    "/kullanim-kosullari",
    "/kvkk",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
