'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChevronDown, BookOpen, ChevronRight, Utensils, ArrowLeft, Heart, Share2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRecipe } from '@/contexts/RecipeContext';

const recipes = [
  {
    id: 1,
    title: "Sağlıklı Kinoa Salatası",
    description: "Protein açısından zengin, besleyici ve lezzetli bir salata tarifi.",
    image: "assets/recipes/kinoa-salad.jpg",
    category: "Salatalar",
    prepTime: "15 dk",
    servings: "2 kişilik",
    calories: "320 kcal",
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
    difficulty: "Kolay",
    nutrition: {
      protein: "22",
      carbs: "15",
      fat: "28",
      fiber: "8"
    },
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
    ],
    tips: "Avokadonun tazeligini korumak için limon suyunu hemen ekleyin."
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
    difficulty: "Orta",
    nutrition: {
      protein: "35",
      carbs: "20",
      fat: "25",
      fiber: "4"
    },
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
    ],
    tips: "Tavukları marine ederek daha lezzetli bir sonuç elde edebilirsiniz."
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
    difficulty: "Kolay",
    nutrition: {
      protein: "8",
      carbs: "22",
      fat: "6",
      fiber: "3"
    },
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
    ],
    tips: "Daha çıtır bir doku için içine kırılmış badem ekleyebilirsiniz."
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
    difficulty: "Kolay",
    nutrition: {
      protein: "6",
      carbs: "25",
      fat: "12",
      fiber: "10"
    },
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
    ],
    tips: "Daha kremamsı bir kıvam için blenderdan geçirebilirsiniz."
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
    difficulty: "Orta",
    nutrition: {
      protein: "32",
      carbs: "25",
      fat: "18",
      fiber: "5"
    },
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
    ],
    tips: "Pişirme kağıdı kullanarak sebzelerin yapışmasını önleyebilirsiniz."
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
    difficulty: "Orta",
    nutrition: {
      protein: "5",
      carbs: "18",
      fat: "6",
      fiber: "2"
    },
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
    ],
    tips: "Şeker yerine stevia kullanarak kaloriyi daha da düşürebilirsiniz."
  },
  {
    id: 8,
    title: "Akdeniz Usulü Sebzeli Makarna",
    description: "Tam buğday makarnası ile sağlıklı ve doyurucu bir öğün.",
    image: "/api/placeholder/600/400",
    category: "Ana Yemekler",
    prepTime: "25 dk",
    servings: "4 kişilik",
    calories: "380 kcal",
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
    prepTime: "10 dk",
    servings: "2 kişilik",
    calories: "250 kcal",
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
    tips: "Daha yoğun bir hindistan cevizi aroması için hindistan cevizi sütü kreması kullanabilirsiniz."
  }
];

const RecipesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Salatalar');
  // const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { setSelectedRecipe } = useRecipe();
  const [mounted, setMounted] = useState(false);
  const categories = ['Salatalar', 'Atıştırmalıklar', 'Ana Yemekler', 'Tatlılar'];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getFilteredRecipes = () => {
    const recipesByCategory = {};
    recipes.forEach(recipe => {
      if (!recipesByCategory[recipe.category]) {
        recipesByCategory[recipe.category] = [];
      }
      recipesByCategory[recipe.category].push(recipe);
    });
   
    Object.keys(recipesByCategory).forEach(category => {
      recipesByCategory[category].sort((a, b) => new Date(b.date) - new Date(a.date));
    });
   
    return recipesByCategory[selectedCategory]?.slice(0, 3) || [];
  };

  if (!mounted) return null;

  const filteredRecipes = getFilteredRecipes();

  return (
    <section className="bg-gray-50" id="recipes">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8 text-center text-[#8aa542]"
        >
          Sağlıklı Yaşam İçin En İyi Tarifler
        </motion.h2>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-[#8aa542] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:scale-105'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-4 right-4 px-4 py-2 bg-white/90 rounded-full text-sm font-medium text-[#8aa542]">
                  {recipe.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#8aa542] transition-colors">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>{recipe.servings}</span>
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

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/recipes"
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-[#8aa542] text-white hover:bg-[#758e30] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 text-lg font-medium">Tüm Tarifleri Keşfet</span>
            <ChevronDown size={22} className="relative z-10 group-hover:transform group-hover:translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#8aa542] to-[#758e30] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <p className="mt-4 text-gray-600">
            {recipes.length}+ sağlıklı ve lezzetli tarif seni bekliyor!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RecipesSection;