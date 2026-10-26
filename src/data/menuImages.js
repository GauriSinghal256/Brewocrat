// ─────────────────────────────────────────────────────────────
//  MENU HOVER IMAGES
//  1) Add an exact photo for any dish/drink in `itemImages`
//     (key = item name exactly as in menuData / drinksData).
//  2) Otherwise the category image below is used.
// ─────────────────────────────────────────────────────────────
export const itemImages = {
  'Nutty Moroccan Chicken Wings': '/images/meat_platter_wings.png',
  'Hot Walnut Brownie With Ice Cream': '/images/dessert1.jpg',
  'Tropical Ale Tower (3 Ltr)': '/images/craft_beer_tower.png',
  'Tropical Ale (500 ml)': '/images/beers/beer_tropical_ale.jpg',
  'German Lager (500 ml)': '/images/beers/beer_golden_pour.jpg',
  'Brewocrat Pale Ale (500 ml)': '/images/beers/beer_pale_ale.jpg',
  'Smoky German Dark Lager (500 ml)': '/images/beers/beer_dark_lager.jpg',
  'Breakfast in Jalisco': '/images/cocktails_bar.png',
};

export const categoryImages = {
  // food
  'table-dressing': '/images/appetizers1.jpg',
  'soups-salads': '/images/mediterranean_platter.png',
  'starters': '/images/meat_platter_wings.png',
  'pizzas-burgers': '/images/special-dish2.png',
  'platters': '/images/meat_platter_wings.png',
  'indian-mains': '/images/bhuna_gosht_curry.png',
  'rice-noodles': '/images/special-dish1.png',
  'sushi-mediterranean': '/images/mediterranean_platter.png',
  'desserts': '/images/dessert1.jpg',
  // drinks
  'beers': '/images/craft_beer_tower.png',
  'cocktails': '/images/cocktails_bar.png',
  'wines': '/images/spirits_wine_coolers.png',
  'spirits': '/images/spirits_wine_coolers.png',
  'mocktails': '/images/cocktails_bar.png',
  'beverages': '/images/cocktails_bar.png',
};

export const FALLBACK_IMAGE = '/images/maindish1.jpg';

export const getItemImage = (item) =>
  itemImages[item.name] || categoryImages[item.category] || FALLBACK_IMAGE;
