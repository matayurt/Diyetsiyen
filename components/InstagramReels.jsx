import { useEffect, useState } from 'react';
import { getUserMedia } from '../utils/instagram';

export default function InstagramReels({ accessToken }) {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    async function fetchReels() {
      const reelsData = await getUserMedia(accessToken);
      setReels(reelsData.slice(0, 3)); // İlk 3 Reels çek
    }
    fetchReels();
  }, [accessToken]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {reels.map((reel) => (
        <div key={reel.id} className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <a href={reel.permalink} target="_blank" rel="noopener noreferrer">
            <video src={reel.media_url} controls className="w-full h-full object-cover" />
          </a>
        </div>
      ))}
    </div>
  );
}
