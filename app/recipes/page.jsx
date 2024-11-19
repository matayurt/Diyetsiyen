// app/recipes/page.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Users, ChevronRight, Utensils, BookOpen, ArrowLeft, Heart, Share2, Calendar, Filter } from 'lucide-react';
import Link from 'next/link';

const recipes = [
  {
    id: 1,
    title: "Sağlıklı Kinoa Salatası",
    description: "Protein açısından zengin, besleyici ve lezzetli bir salata tarifi.",
    image: "/api/placeholder/600/400",
    category: "Salatalar",
    prepTime: "15",
    servings: "2 kişilik",
    calories: "320",
    date: "2024-03-15",
    difficulty: "Kolay",
    nutrition: {
      protein: "18",
      carbs: "45",
      fat: "12",
      fiber: "6"
    },
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
    ],
    tips: "Kinoanın daha lezzetli olması için haşlamadan önce tavada hafifçe kavurabilirsiniz."
  },
  {
    id: 2,
    title: "Avokadolu Ton Balıklı Salata",
    description: "Omega-3 ve sağlıklı yağlar açısından zengin pratik salata.",
    image: "/api/placeholder/600/400",
    category: "Salatalar",
    prepTime: "10 dk",
    servings: "1 kişilik",
    calories: "350 kcal",
    date: "2024-03-14",
    ingredients: [
      "1 adet olgun avokado",
      "1 kutu ton balığı",
      "1/4 kırmızı soğan",
      "Cherry domates",
      "Limon suyu",
      "Zeytinyağı"
    ],
    instructions: [
      "Avokadoyu ikiye bölüp çekirdeğini çıkarın.",
      "Ton balığını süzün.",
      "Soğanı ince doğrayın.",
      "Tüm malzemeleri karıştırıp servis yapın."
    ]
  },
  {
    id: 3,
    title: "Izgara Tavuklu Sezar Salata",
    description: "Protein zengini, doyurucu akşam yemeği alternatifi.",
    image: "/api/placeholder/600/400",
    category: "Salatalar",
    prepTime: "25 dk",
    servings: "2 kişilik",
    calories: "400 kcal",
    date: "2024-03-13",
    ingredients: [
      "2 tavuk göğsü",
      "1 kase marul",
      "Light sezar sosu",
      "Tam buğday kruton",
      "Parmesan peyniri"
    ],
    instructions: [
      "Tavukları ızgarada pişirin.",
      "Marulları yıkayıp doğrayın.",
      "Malzemeleri karıştırın.",
      "Sosu ekleyip servis yapın."
    ]
  },
  {
    id: 4,
    title: "Yulaflı Protein Topları",
    description: "Ara öğün için ideal, enerjik ve besleyici atıştırmalık.",
    image: "/api/placeholder/600/400",
    category: "Atıştırmalıklar",
    prepTime: "20 dk",
    servings: "8 adet",
    calories: "180 kcal",
    date: "2024-03-15",
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
  },
  {
    id: 5,
    title: "Badem Sütlü Chia Puding",
    description: "Sağlıklı ve besleyici kahvaltı alternatifi.",
    image: "/api/placeholder/600/400",
    category: "Atıştırmalıklar",
    prepTime: "5 dk",
    servings: "1 porsiyon",
    calories: "220 kcal",
    date: "2024-03-14",
    ingredients: [
      "3 yemek kaşığı chia tohumu",
      "1 bardak badem sütü",
      "1 tatlı kaşığı bal",
      "Meyve (süsleme için)"
    ],
    instructions: [
      "Chia ve badem sütünü karıştırın.",
      "Balı ekleyip karıştırın.",
      "Buzdolabında 4 saat bekletin.",
      "Meyvelerle süsleyip servis yapın."
    ]
  },
  {
    id: 6,
    title: "Fırında Sebzeli Tavuk",
    description: "Düşük kalorili, protein açısından zengin akşam yemeği.",
    image: "/api/placeholder/600/400",
    category: "Ana Yemekler",
    prepTime: "45 dk",
    servings: "4 kişilik",
    calories: "380 kcal",
    date: "2024-03-15",
    ingredients: [
      "4 tavuk göğsü",
      "2 patates",
      "2 havuç",
      "1 kabak",
      "Zeytinyağı",
      "Baharatlar"
    ],
    instructions: [
      "Sebzeleri doğrayın.",
      "Tavukları marine edin.",
      "Tüm malzemeleri tepsiye dizin.",
      "180 derecede 35 dk pişirin."
    ]
  },
  {
    id: 7,
    title: "Diyet Magnolia",
    description: "Düşük kalorili, lezzetli tatlı alternatifi.",
    image: "/api/placeholder/600/400",
    category: "Tatlılar",
    prepTime: "20 dk",
    servings: "4 porsiyon",
    calories: "150 kcal",
    date: "2024-03-15",
    ingredients: [
      "Yulaf ezmesi",
      "Yağsız süt",
      "Light labne",
      "Şekersiz bisküvi",
      "Meyve"
    ],
    instructions: [
      "Bisküvileri rondodan geçirin.",
      "Kremayı hazırlayın.",
      "Katmanları oluşturun.",
      "2 saat buzdolabında bekletin."
    ]
  },
  {
    id: 8,
    title: "Akdeniz Usulü Sebzeli Makarna",
    description: "Tam buğday makarnası ile sağlıklı ve doyurucu bir öğün.",
    image: "/api/placeholder/600/400",
    category: "Ana Yemekler",
    prepTime: "25",
    servings: "4 kişilik",
    calories: "380",
    date: "2024-03-16",
    difficulty: "Orta",
    nutrition: {
      protein: "12",
      carbs: "65",
      fat: "8",
      fiber: "9"
    },
    ingredients: [
      "300gr tam buğday makarna",
      "2 kabak",
      "2 patlıcan",
      "3 domates",
      "Zeytinyağı",
      "Taze fesleğen",
      "Parmesan peyniri"
    ],
    instructions: [
      "Makarnayı al dente haşlayın.",
      "Sebzeleri küp küp doğrayın.",
      "Sebzeleri zeytinyağında soteleyin.",
      "Makarna ile karıştırıp servis yapın.",
      "Üzerine parmesan rendeleyin."
    ],
    tips: "Sebzeleri önceden marine ederek daha lezzetli bir sonuç elde edebilirsiniz."
  },
  {
    id: 9,
    title: "Hindistan Cevizli Chia Puding",
    description: "Tropikal lezzetlerle buluşan sağlıklı kahvaltı alternatifi.",
    image: "/api/placeholder/600/400",
    category: "Atıştırmalıklar",
    prepTime: "10",
    servings: "2 kişilik",
    calories: "250",
    date: "2024-03-17",
    difficulty: "Kolay",
    nutrition: {
      protein: "8",
      carbs: "32",
      fat: "14",
      fiber: "12"
    },
    ingredients: [
      "4 yemek kaşığı chia tohumu",
      "1 bardak hindistan cevizi sütü",
      "1 yemek kaşığı bal",
      "Taze meyveler",
      "Hindistan cevizi rendesi"
    ],
    instructions: [
      "Chia ve hindistan cevizi sütünü karıştırın.",
      "Balı ekleyip iyice karıştırın.",
      "Buzdolabında 4 saat bekletin.",
      "Meyveler ve hindistan cevizi ile süsleyin."
    ],
    tips: "Daha kremamsı bir kıvam için blenderdan geçirebilirsiniz."
  }
  // Add more recipes...
];

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('date');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('Tümü');

  const categories = ['Tümü', 'Salatalar', 'Atıştırmalıklar', 'Ana Yemekler', 'Tatlılar'];
  const difficulties = ['Tümü', 'Kolay', 'Orta', 'Zor'];
  const sortOptions = [
    { value: 'date', label: 'En Yeni' },
    { value: 'calories', label: 'Kalori (Düşük-Yüksek)' },
    { value: 'prepTime', label: 'Hazırlama Süresi' },
    { value: 'difficulty', label: 'Zorluk Derecesi' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 55);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFilteredAndSortedRecipes = () => {
    let filtered = recipes;
    
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    if (difficultyFilter !== 'Tümü') {
      filtered = filtered.filter(recipe => recipe.difficulty === difficultyFilter);
    }
    
    switch (sortBy) {
      case 'date':
        filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'calories':
        filtered = [...filtered].sort((a, b) => parseInt(a.calories) - parseInt(b.calories));
        break;
      case 'prepTime':
        filtered = [...filtered].sort((a, b) => parseInt(a.prepTime) - parseInt(b.prepTime));
        break;
      case 'difficulty':
        const difficultyOrder = { 'Kolay': 1, 'Orta': 2, 'Zor': 3 };
        filtered = [...filtered].sort((a, b) => 
          difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        );
        break;
    }
    
    return filtered;
  };

  const shareRecipe = (recipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      });
    }
  };

  const filteredRecipes = getFilteredAndSortedRecipes();

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#8aa542] text-white p-4 rounded-full shadow-lg hover:bg-[#758e30] transition-all z-40"
        >
          <ArrowLeft className="rotate-90" size={24} />
        </button>
      )}

      <div className="container mx-auto max-w-7xl px-4 py-28">
      <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed top-20 left-0 right-0 bg-white shadow-md z-30 transition-all duration-300 ${isScrolled ? '-mt-4' : ''}`}
            >
            <div className="container mx-auto max-w-7xl px-4 py-4">
                <Link
                href="/#recipes"
                className="flex items-center gap-2 text-[#8aa542] hover:text-[#758e30] transition-colors"
                >
                <ArrowLeft size={20} />
                <span className="font-medium">Ana Sayfaya Dön</span>
                </Link>
            </div>
            </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-[#8aa542]">Sağlıklı Tarifler</h1>
          <p className="text-xl text-gray-600">
            Besleyici ve lezzetli yemek tarifleri koleksiyonu
          </p>
        </motion.div>

        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tarif veya malzeme ara..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex-1 flex gap-4 items-center justify-end">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <Filter size={20} />
                <span>Filtreler</span>
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542]"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Kategori</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
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
                <div>
                  <h3 className="font-medium mb-2">Zorluk Seviyesi</h3>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setDifficultyFilter(difficulty)}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
                          ${difficultyFilter === difficulty
                            ? 'bg-[#8aa542] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-56">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-[#8aa542]">
                    {recipe.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-600">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{recipe.title}</h3>
                <p className="text-gray-600 mb-6">{recipe.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                  <Clock size={18} />
                    <span>{recipe.prepTime} dk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>{recipe.servings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils size={18} />
                    <span>{recipe.calories} kcal</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-gray-700">Temel Malzemeler:</h4>
                  <ul className="space-y-2">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronRight size={16} className="text-[#8aa542]" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#8aa542] text-white hover:bg-[#758e30] transition-colors"
                  >
                    <BookOpen size={20} />
                    <span>Tarifi Görüntüle</span>
                  </button>
                  <button
                    onClick={() => shareRecipe(recipe)}
                    className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aradığınız kriterlere uygun tarif bulunamadı.
            </p>
          </div>
        )}

        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-white border-b">
                <div className="flex justify-between items-center p-4">
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft size={20} />
                    <span>Tariflere Dön</span>
                  </button>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => shareRecipe(selectedRecipe)}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      <Share2 size={20} />
                      <span className="hidden sm:inline">Paylaş</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative h-64 md:h-80">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#8aa542]/10 rounded-full text-sm font-medium text-[#8aa542]">
                    {selectedRecipe.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                    {selectedRecipe.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                    <Calendar size={14} className="inline-block mr-1" />
                    {new Date(selectedRecipe.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-2">{selectedRecipe.title}</h3>
                <p className="text-gray-600 text-lg mb-8">{selectedRecipe.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                    <div className="text-sm text-gray-600">Hazırlama</div>
                    <div className="font-medium">{selectedRecipe.prepTime} dk</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                    <div className="text-sm text-gray-600">Porsiyon</div>
                    <div className="font-medium">{selectedRecipe.servings}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Utensils className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                    <div className="text-sm text-gray-600">Kalori</div>
                    <div className="font-medium">{selectedRecipe.calories} kcal</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Heart className="w-6 h-6 mx-auto mb-2 text-[#8aa542]" />
                    <div className="text-sm text-gray-600">Zorluk</div>
                    <div className="font-medium">{selectedRecipe.difficulty}</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4">Malzemeler</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-[#8aa542]" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
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

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h4 className="text-lg font-bold mb-4">Besin Değerleri</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Protein</div>
                      <div className="font-medium text-[#8aa542]">{selectedRecipe.nutrition.protein}g</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Karbonhidrat</div>
                      <div className="font-medium text-[#8aa542]">{selectedRecipe.nutrition.carbs}g</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Yağ</div>
                      <div className="font-medium text-[#8aa542]">{selectedRecipe.nutrition.fat}g</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Lif</div>
                      <div className="font-medium text-[#8aa542]">{selectedRecipe.nutrition.fiber}g</div>
                    </div>
                  </div>
                  {selectedRecipe.tips && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-600 italic">
                        <span className="font-medium">İpucu:</span> {selectedRecipe.tips}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}