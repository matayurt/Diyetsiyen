// app/recipes/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, ChevronRight, Utensils, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ShareMenu from '@/components/ShareMenu';
import { recipes } from '@/data/recipes';

export default function RecipeDetail({ params }) {
  const [recipe, setRecipe] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // ID'ye göre tarifi bul
    const foundRecipe = recipes.find(r => r.id === parseInt(params.id));
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, [params.id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tarif bulunamadı</h1>
          <Link 
            href="/recipes"
            className="text-[#8aa542] hover:text-[#758e30] transition-colors"
          >
            Tariflere Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/recipes"
              className="flex items-center gap-2 text-[#8aa542] hover:text-[#758e30] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Tariflere Dön</span>
            </Link>
            <ShareMenu recipe={recipe} variant="button" />
          </div>
        </div>
      </div>

      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className={`object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-[#8aa542]">
                  {recipe.category}
                </span>
                <span className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                  {recipe.difficulty || 'Orta'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                {recipe.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                {recipe.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                  <div className="text-xs text-gray-600">Hazırlama</div>
                  <div className="font-medium">{recipe.prepTime}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                  <div className="text-xs text-gray-600">Porsiyon</div>
                  <div className="font-medium">{recipe.servings}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Utensils className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                  <div className="text-xs text-gray-600">Kalori</div>
                  <div className="font-medium">{recipe.calories}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Heart className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                  <div className="text-xs text-gray-600">Zorluk</div>
                  <div className="font-medium">{recipe.difficulty || 'Orta'}</div>
                </div>
              </div>

              {/* Nutrition Info */}
              {recipe.nutrition && (
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <h3 className="text-lg font-bold mb-4">Besin Değerleri</h3>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#8aa542] mb-1">
                        {recipe.nutrition.protein}g
                      </div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#8aa542] mb-1">
                        {recipe.nutrition.carbs}g
                      </div>
                      <div className="text-sm text-gray-600">Karbonhidrat</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#8aa542] mb-1">
                        {recipe.nutrition.fat}g
                      </div>
                      <div className="text-sm text-gray-600">Yağ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#8aa542] mb-1">
                        {recipe.nutrition.fiber}g
                      </div>
                      <div className="text-sm text-gray-600">Lif</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Malzemeler</h3>
                <ul className="grid gap-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-[#8aa542]" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              {/* Instructions */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Hazırlanışı</h3>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li 
                      key={index} 
                      className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8aa542] text-white flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <span className="flex-1">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              {recipe.tips && (
                <div className="mt-8">
                  <div className="p-4 bg-[#8aa542]/5 rounded-xl border border-[#8aa542]/10">
                    <h4 className="font-bold text-[#8aa542] mb-2">Pro Tip</h4>
                    <p className="text-gray-600 italic">{recipe.tips}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}