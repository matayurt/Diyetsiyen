import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { ChevronDown, Leaf, Heart, Brain } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    title: "Sağlıklı Beslenme",
    description: "Uzman diyetisyeninizle kişiselleştirilmiş beslenme planları"
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Yaşam Koçluğu",
    description: "Sadece diyet değil, yaşam tarzı değişimi için profesyonel destek"
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    title: "Zihinsel Sağlık",
    description: "Beden ve zihin sağlığı için bütünsel yaklaşım"
  }
];

const HomeSection = () => {
  return (
    <div className="text-center px-4 pt-20 pb-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8aa542] to-[#8aa542]">
            <Typewriter
              words={['Sağlıklı Beslenme', 'Diyet Planları', 'Kilo Verme']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Diyetisyeninizle birlikte sağlıklı yaşama adım atın ve hayalinizdeki 
          bedene kavuşun
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="#packets"
            className="inline-block px-8 py-4 bg-[#8aa542] text-white rounded-full font-semibold shadow-lg hover:bg-[#758e30] transition duration-300 hover:scale-105"
          >
            Sağlıklı Bir Hayata Adım Atın
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-[#8aa542]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-green-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;