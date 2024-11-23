'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChevronDown, BookOpen, ChevronRight, Utensils, ArrowLeft, Heart, Share2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRecipe } from '@/contexts/RecipeContext';
import Image from 'next/image';
import { recipes } from '@/data/recipes';
import ShareMenu from '@/components/ShareMenu';

const RecipesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Salatalar');
  const [mounted, setMounted] = useState(false);
  const categories = ['Salatalar', 'Atıştırmalıklar', 'Ana Yemekler', 'Tatlılar', 'Kahvaltılıklar', 'Çorbalar'];

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
    <section id="recipes">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8 text-center text-[#8aa542]"
        >
          Sağlıklı Yaşam İçin En Popüler Tarifler
        </motion.h2>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full text-sm shadow-md font-medium transition-all duration-300
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
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-4 py-2 bg-white/90 rounded-full text-sm font-medium text-[#8aa542]">
                    {recipe.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-[#8aa542] transition-colors">
                    {recipe.title}
                  </h3>
                  <ShareMenu recipe={recipe} variant="iconOnly" />
                </div>
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
                  <div className="flex items-center gap-2">
                    <Utensils size={18} />
                    <span>{recipe.calories}</span>
                  </div>
                </div>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#8aa542] text-white hover:bg-[#758e30] transition-colors"
                >
                  <BookOpen size={18} />
                  <span>Tarifi Görüntüle</span>
                </Link>
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