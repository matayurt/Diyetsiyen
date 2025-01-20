module.exports = {
  siteUrl: "https://www.melikeozturk.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/*"],
      },
    ],
  },
  transform: async (config, path) => {
    // Sayfalara göre özel öncelik ve güncelleme sıklığı ayarları
    const priorities = {
      "/": 1.0,
      "/comments": 0.9,
      "/recipes": 0.9,
      "/kvkk": 0.5,
      "/gizlilik-politikasi": 0.5,
      "/kullanim-kosullari": 0.5,
    };

    const changefreq = {
      "/": "daily",
      "/comments": "daily",
      "/recipes": "daily",
      "/kvkk": "monthly",
      "/gizlilik-politikasi": "monthly",
      "/kullanim-kosullari": "monthly",
    };

    return {
      loc: path,
      changefreq: changefreq[path] || "weekly",
      priority: priorities[path] || 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
