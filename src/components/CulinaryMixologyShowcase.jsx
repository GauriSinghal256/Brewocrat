import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFire, FaLeaf } from 'react-icons/fa6';

export default function CulinaryMixologyShowcase({ onOpenBookModal }) {
  const foodItems = [
    {
      title: 'Smokey Mutton Tikka & Chops',
      category: 'Tandoor & Grills',
      price: '₹745',
      desc: 'Tender prime mutton marinated 24-hours in Kashmiri chili, hung curd, and roasted stone-ground spices, smoked over fragrant charcoal.',
      diet: 'non-veg',
      image: '/images/bhuna_gosht_curry.png'
    },
    {
      title: 'Big Fat Mezze Feast Platter',
      category: 'Mediterranean',
      price: '₹695',
      desc: 'Artisanal hummus trio, smoky moutabal, crunchy falafel, warm herb pita, kalamata olives, and pickled baby cucumbers.',
      diet: 'veg',
      image: '/images/mediterranean_platter.png'
    },
    {
      title: 'Wood-Fired Neapolitan Truffle Pizza',
      category: 'Artisan Hearth',
      price: '₹625',
      desc: 'Hand-stretched 48-hour fermented sourdough crust baked at 450°C, wild forest mushrooms, Fior di Latte mozzarella & white truffle drizzle.',
      diet: 'veg',
      image: '/images/meat_platter_wings.png'
    },
    {
      title: 'Butter Chicken Stuffed Amritsari Kulcha',
      category: 'Desi Comfort',
      price: '₹585',
      desc: 'Flaky clay oven kulcha filled with slow-cooked shredded butter chicken, served with makhani dip and spicy pickled shallots.',
      diet: 'non-veg',
      image: '/images/maindish1.jpg'
    }
  ];

  return (
    <section className="relative overflow-hidden brew-wall py-14 sm:py-20">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A441]">
            03 / Kitchen &amp; Mixology
          </p>
          <h2 className="font-serif text-3xl font-normal uppercase tracking-wide text-[#F7EFE0] sm:text-5xl md:text-6xl">
            Culinary Alchemy &amp; <span className="italic text-[#D9A441]">Skybar Pours</span>
          </h2>
        </div>

        <div
          aria-label="Featured dishes, swipe horizontally to explore"
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-5 sm:px-0"
        >
          {foodItems.map((item, idx) => (
            <article
              key={item.title}
              className="group flex w-[min(84vw,22rem)] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-[#D9A441]/25 brew-card shadow-xl sm:w-[min(48vw,22rem)] lg:w-[min(32vw,22rem)]"
            >
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-48 shrink-0 overflow-hidden sm:h-52"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/images/special-dish1.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08]/70 to-transparent" />
                <span
                  className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border sm:right-6 sm:top-6 ${
                    item.diet === 'veg'
                      ? 'border-green-500/50 bg-green-950/90 text-green-400'
                      : 'border-red-500/50 bg-red-950/90 text-red-400'
                  }`}
                  title={item.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                >
                  {item.diet === 'veg' ? <FaLeaf /> : <FaFire />}
                </span>
              </motion.div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="line-clamp-2 font-serif text-xl font-medium uppercase leading-tight text-[#F7EFE0]">
                    {item.title}
                  </h3>
                  <span className="shrink-0 font-serif text-xl font-semibold text-[#F7EFE0]">{item.price}</span>
                </div>
                <p className="mb-4 line-clamp-2 text-sm font-medium leading-relaxed text-[#F7EFE0]">
                  {item.desc}
                </p>
                <Link
                  to="/menu"
                  className="mt-auto inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9A441] transition-colors hover:text-[#F7EFE0]"
                >
                  Explore the menu <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner with Menu Link & Table Reserve */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 rounded-3xl bg-[#2A1A10]/70 border border-[#D9A441]/25 backdrop-blur-md">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h4 className="font-serif text-xl sm:text-2xl text-[#F7EFE0] uppercase font-normal mb-1">
              Craving The Complete Experience?
            </h4>
            <p className="text-xs sm:text-sm text-[#E6D3B3]/80 font-light">
              Explore our full 100+ multi-cuisine menu and craft cocktails list.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/menu"
              className="pill-btn-outline group cursor-pointer"
            >
              <span>View Full Menu</span>
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <button
              onClick={onOpenBookModal}
              className="pill-btn-primary group cursor-pointer"
            >
              <span>Book A Table</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
