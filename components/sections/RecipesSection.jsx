import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Users, ChevronRight, Utensils, BookOpen } from 'lucide-react';

// Örnek tarif verisi
const recipes = [
  {
    id: 1,
    title: "Sağlıklı Kinoa Salatası",
    description: "Protein açısından zengin, besleyici ve lezzetli bir salata tarifi.",
    image: "/api/placeholder/600/400",
    category: "Salatalar",
    prepTime: "15 dk",
    servings: "2 kişilik",
    calories: "320 kcal",
    ingredients: [
      "1 su bardağı kinoa",
      "2 orta boy domates",
      "1 salatalık",
      "1/2 demet maydanoz",
      "Zeytinyağı",
      "Limon suyu"
    ],
    instructions: [
      "Kinoayı iyice yıkayın ve 2 su bardağı su ile haşlayın.",
      "Sebzeleri küp küp doğrayın.",
      "Tüm malzemeleri karıştırın.",
      "Zeytinyağı ve limon ile tatlandırın."
    ]
  },
  {
    id: 2,
    title: "Yulaflı Protein Topları",
    description: "Ara öğün için ideal, enerjik ve besleyici atıştırmalık.",
    image: "/api/placeholder/600/400",
    category: "Atıştırmalıklar",
    prepTime: "20 dk",
    servings: "8 adet",
    calories: "180 kcal",
    ingredients: [
      "2 su bardağı yulaf",
      "2 yemek kaşığı fıstık ezmesi",
      "1 yemek kaşığı bal",
      "1 ölçek protein tozu"
    ],
    instructions: [
      "Tüm malzemeleri karıştırın.",
      "Karışımdan ceviz büyüklüğünde toplar yapın.",
      "Buzdolabında 1 saat bekletin."
    ]
  }
];

const RecipesSection = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const categories = ['Tümü', 'Salatalar', 'Atıştırmalıklar', 'Ana Yemekler', 'Tatlılar'];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto max-w-7xl px-4">
      {/* Başlık */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-[#8aa542]"
        >
          Sağlıklı Tarifler
        </motion.h2>
        <p className="text-gray-600 text-lg">
          Lezzetli ve besleyici tarifleri keşfedin
        </p>
      </div>

      {/* Arama ve Filtreleme */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tarif ara..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${selectedCategory === category
                    ? 'bg-[#8aa542] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tarifler Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-[#8aa542]">
                  {recipe.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{recipe.servings}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Utensils size={16} />
                  <span>{recipe.calories}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#8aa542] text-white hover:bg-[#758e30] transition-colors"
              >
                <BookOpen size={18} />
                <span>Tarifi Görüntüle</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tarif Detay Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-64">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h3>
              <p className="text-gray-600 mb-6">{selectedRecipe.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                  <div className="text-sm text-gray-600">Hazırlama</div>
                  <div className="font-medium">{selectedRecipe.prepTime}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                  <div className="text-sm text-gray-600">Porsiyon</div>
                  <div className="font-medium">{selectedRecipe.servings}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Utensils className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                  <div className="text-sm text-gray-600">Kalori</div>
                  <div className="font-medium">{selectedRecipe.calories}</div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4">Malzemeler</h4>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#8aa542]" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4">Hazırlanışı</h4>
                <ol className="space-y-4">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8aa542] text-white flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RecipesSection;