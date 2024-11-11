import axios from "axios";

export async function getUserMedia(accessToken) {
  try {
    const response = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`
    );
    return response.data.data.filter((item) => item.media_type === "VIDEO");
  } catch (error) {
    console.error("Error fetching Instagram media:", error);
    return [];
  }
}
