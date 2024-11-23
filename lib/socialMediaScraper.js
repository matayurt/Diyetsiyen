// lib/socialMediaScraper.js

import axios from "axios"; // HTTP istekleri için
import cheerio from "cheerio"; // HTML parse etmek için

export async function getSocialMediaStats() {
  try {
    // Instagram verilerini çek
    const instaStats = await scrapeInstagram("dyt.melikeozturk");
    // Facebook verilerini çek
    const fbStats = await scrapeFacebook("dyt.melikeozturkk");

    return {
      instagram: instaStats,
      facebook: fbStats,
    };
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return getDefaultStats();
  }
}

// Instagram scraping fonksiyonu
async function scrapeInstagram(username) {
  try {
    // Instagram profiline HTTP isteği at
    const response = await axios.get(`https://www.instagram.com/${username}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // HTML'i parse et
    const $ = cheerio.load(response.data);

    // Meta etiketlerinden veri çek
    const metaDescription = $('meta[property="og:description"]').attr(
      "content"
    );

    // Regular expression ile sayıları çıkar
    const followers =
      metaDescription?.match(/(\d+(?:,\d+)*) Followers/)?.[1] || "0";
    const posts = metaDescription?.match(/(\d+(?:,\d+)*) Posts/)?.[1] || "0";

    return {
      followers: formatNumber(followers.replace(/,/g, "")),
      posts: formatNumber(posts.replace(/,/g, "")),
    };
  } catch (error) {
    console.error("Instagram scraping hatası:", error);
    return {
      followers: "30K+",
      posts: "850+",
    };
  }
}

// Facebook scraping fonksiyonu
async function scrapeFacebook(username) {
  try {
    // Facebook sayfasına HTTP isteği at
    const response = await axios.get(`https://www.facebook.com/${username}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // HTML'i parse et
    const $ = cheerio.load(response.data);

    // Meta etiketlerinden veri çek
    const metaDescription = $('meta[name="description"]').attr("content");

    // Regular expression ile sayıları çıkar
    const followers =
      metaDescription?.match(/(\d+(?:,\d+)*) likes/)?.[1] || "0";

    return {
      followers: formatNumber(followers.replace(/,/g, "")),
      posts: "100+", // Facebook post sayısını çekmek daha zor, sabit değer kullanıyoruz
    };
  } catch (error) {
    console.error("Facebook scraping hatası:", error);
    return {
      followers: "500+",
      posts: "100+",
    };
  }
}

// Sayıları formatla (1000 -> 1K, 1000000 -> 1M)
function formatNumber(number) {
  const num = parseInt(number);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Varsayılan değerler
function getDefaultStats() {
  return {
    instagram: {
      followers: "30K+",
      posts: "850+",
    },
    facebook: {
      followers: "500+",
      posts: "100+",
    },
  };
}
