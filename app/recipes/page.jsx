// app/recipes/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Users, ChevronRight, Utensils, BookOpen, ArrowLeft, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { recipes } from '@/data/recipes';
import ShareMenu from '@/components/ShareMenu';

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('date');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('Tümü');

  const categories = ['Tümü', ...new Set(recipes.map(recipe => recipe.category))];
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
          (difficultyOrder[a.difficulty] || 2) - (difficultyOrder[b.difficulty] || 2)
        );
        break;
    }
    
    return filtered;
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
        {/* Header bölümü */}
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

        {/* Başlık */}
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

        {/* Filtreler bölümü */}
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

          {/* Genişletilmiş filtreler */}
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

        {/* Tarifler grid'i */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link href={`/recipes/${recipe.id}`} className="block">
                <div className="relative h-56">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-[#8aa542]">
                      {recipe.category}
                    </span>
                  </div>
                  {recipe.difficulty && (
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-600">
                        {recipe.difficulty}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <Link href={`/recipes/${recipe.id}`} className="block flex-1 group">
                  <h3 className="text-2xl font-bold group-hover:text-[#8aa542] transition-colors line-clamp-2">
                    {recipe.title}
                  </h3>
                </Link>
                <div className="flex-shrink-0 ml-2 -mt-1">
                  <ShareMenu recipe={recipe} variant="iconOnly" />
                </div>
              </div>
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
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#8aa542] text-white hover:bg-[#758e30] transition-colors"
                  >
                    <BookOpen size={20} />
                    <span>Tarifi Görüntüle</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sonuç bulunamadı mesajı */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aradığınız kriterlere uygun tarif bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}