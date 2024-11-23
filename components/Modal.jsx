'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Clock, Users, ChevronRight, Utensils, Heart, Calendar } from 'lucide-react';
import { useRecipe } from '@/contexts/RecipeContext';
import Image from 'next/image';
import ShareMenu from './ShareMenu';
import { useRouter } from 'next/navigation';

export default function Modal() {
    const { selectedRecipe: recipe, setSelectedRecipe } = useRecipe();
    const [imageLoaded, setImageLoaded] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      if (recipe) {
        document.body.style.overflow = 'hidden';
        // URL'i güncelle ama sayfayı yenileme
        window.history.pushState({}, '', `/recipe/${recipe.id}`);
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [recipe]);
  
    if (!recipe) return null;
  
    const onClose = () => {
      setSelectedRecipe(null);
      // Modal kapandığında URL'i geri al
      window.history.pushState({}, '', '/');
    };
  
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Overlay with blur */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
        
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header - Always visible */}
          <div className="flex-shrink-0 border-b">
            <div className="flex justify-between items-center p-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all"
              >
                <ArrowLeft size={20} />
                <span>Geri Dön</span>
              </button>
              <div>
                <ShareMenu recipe={recipe} />
              </div>
            </div>
          </div>
  
          {/* Content Container */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full lg:grid lg:grid-cols-2">
              {/* Left Side - Image Section (Fixed) */}
              <div className="relative h-72 md:h-96 lg:h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    priority
                    className={`object-cover object-center transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoadingComplete={() => setImageLoaded(true)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Image Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-[#8aa542]">
                      {recipe.category}
                    </span>
                    <span className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                      {recipe.difficulty || 'Orta'}
                    </span>
                  </div>
                </div>
              </div>
  
              {/* Right Side - Recipe Details (Scrollable) */}
              <div className="h-full overflow-y-auto">
                <div className="p-6 lg:p-8 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
                    <p className="text-gray-600 text-lg">{recipe.description}</p>
                  </div>
  
                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    <div className="bg-gray-50 p-6 rounded-xl">
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
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Malzemeler</h3>
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
  
                  {/* Instructions */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Hazırlanışı</h3>
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
                    <div className="mt-6">
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
      </div>
    );
}