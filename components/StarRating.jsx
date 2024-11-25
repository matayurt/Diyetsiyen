'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value, onChange, readonly = false }) {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={readonly ? "button" : "button"}
          disabled={readonly}
          className={`transform transition-all duration-200 ${
            readonly ? '' : 'hover:scale-110'
          }`}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          onClick={() => !readonly && onChange(star)}
        >
          <Star
            className={`w-6 h-6 transition-all duration-300 ${
              star <= (hoverRating || value)
                ? 'fill-yellow-400 stroke-yellow-400'
                : 'stroke-gray-400'
            } ${
              star <= value
                ? 'animate-[star-pop_0.3s_ease-in-out]'
                : ''
            }`}
          />
        </button>
      ))}
    </div>
  );
}
