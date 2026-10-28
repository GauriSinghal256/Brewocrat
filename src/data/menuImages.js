// ─────────────────────────────────────────────────────────────
//  MENU VISUALS MAPPING
// ─────────────────────────────────────────────────────────────
export const itemImages = {
  // Food Signatures
  'Nutty Moroccan Chicken Wings': '/images/meat_platter_wings.png',
  'Big Fat Mezze Feast Platter': '/images/mediterranean_platter.png',
  'Wood-Fired Truffle Margherita': '/images/special-dish4.png',
  'Shahi Paneer Tikka Lababdar': '/images/plate_shahi_paneer.png',
  'Smokey Mutton Rogan Josh': '/images/bhuna_gosht_curry.png',
  'Dum Pukht Zafrani Biryani': '/images/special-dish3.png',
  'Charcoal Smokey Mutton Tikkas': '/images/special-dish2.png',
  'Truffle Cream Cheese & Corn Dumpling': '/images/special-dish5.png',
  'Hot Walnut Brownie With Ice Cream': '/images/dessert1.jpg',
  'Santorini Garden Bowl Salad': '/images/mediterranean_platter.png',
  'Crispy Spinach Chaat': '/images/appetizers1.jpg',
  'Potato Wedges With Ranch Dressing': '/images/appetizers1.jpg',
  'French Fries With Melted Cheese Sauce': '/images/special-dish1.png',

  // Drinks Signatures
  'Tropical Ale Tower (3 Ltr)': '/images/craft_beer_tower.png',
  'Tropical Ale (500 ml)': '/images/beers/beer_tropical_ale.jpg',
  'German Lager (500 ml)': '/images/beers/beer_golden_pour.jpg',
  'Brewocrat Pale Ale (500 ml)': '/images/beers/beer_pale_ale.jpg',
  'Smoky German Dark Lager (500 ml)': '/images/beers/beer_dark_lager.jpg',
  'Breakfast in Jalisco': '/images/cocktails_bar.png',
  'Indian Sapphire': '/images/cocktails_bar.png',
  'Ginger Monkey': '/images/cocktails_bar.png',
  'Deadly Strong LIIT': '/images/cocktails_bar.png',
  'Corona Extra (Pint)': '/images/beers/beer_golden_pour.jpg',
  'Hoegaarden (Pint)': '/images/beers/beer_tropical_ale.jpg',
};

export const categoryImages = {
  // Food categories
  'table-dressing': '/images/appetizers1.jpg',
  'soups-salads': '/images/mediterranean_platter.png',
  'starters': '/images/meat_platter_wings.png',
  'pizzas-burgers': '/images/special-dish2.png',
  'platters': '/images/meat_platter_wings.png',
  'indian-mains': '/images/bhuna_gosht_curry.png',
  'rice-noodles': '/images/special-dish1.png',
  'sushi-mediterranean': '/images/mediterranean_platter.png',
  'desserts': '/images/dessert1.jpg',

  // Drinks categories
  'beers': '/images/craft_beer_tower.png',
  'cocktails': '/images/cocktails_bar.png',
  'wines': '/images/spirits_wine_coolers.png',
  'spirits': '/images/spirits_wine_coolers.png',
  'mocktails': '/images/cocktails_bar.png',
  'beverages': '/images/cocktails_bar.png',
};

export const FALLBACK_IMAGE = '/images/maindish1.jpg';

export const getItemImage = (item) =>
  itemImages[item?.name] || categoryImages[item?.category] || FALLBACK_IMAGE;
