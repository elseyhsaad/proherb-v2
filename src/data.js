export const brands = ['PROHERB','Pro Thera','Pro Active','Pro Like','Pro LYT','Pro Mask','Pro Muscle','Pro Red','Pro Scrub','Pro Shefa','Pro Slim','Pro Soft','Pro Spano','Pro Thera Power','Pro Vicks','Pro ZN','Pro Energy','Pro Fresh','PRP Herbal','Pro Med','Pro Collagene','Pro Honey','Pro Vit']
// All 53 user-supplied pictures, retained in their original sending order.
const entries = [
 ['Black Seed Oil','PROHERB','Herbal Oils','60 softgels · 1000 mg','#7456a3'],
 ['Flax Seed Oil ','PROHERB','Herbal Oils','60 softgels','#c45b4c'],
 ['Pumpkin Seed Oil','PROHERB','Herbal Oils','60 softgels · 1000 mg','#548c55'],
 ['Senna Saunf','PROHERB','Herbal Oils','30 tablets','#65b6d2'],
 ['Omega Pro B','PROHERB','Kids & Family','100 ml · orange & honey','#d34b38'],
 ['Omega Pro 3','PROHERB','Kids & Family','100 ml · strawberry','#283d89'],
 ['Prochicum Herbal Syrup','PROHERB','Kids & Family','120 ml','#81a84a'],
 ['Pro Spano Syrup','Pro Spano','Kids & Family','100 ml','#3e8d63'],
 ['Pro Con Active Syrup','PROHERB','Kids & Family','200 ml','#c63d35'],
 ['Baby Pro Calm','PROHERB','Kids & Family','100 ml','#ec5e9a'],
 ['Pro Antidol','Pro Thera','Kids & Family','100 ml · strawberry','#be4e93'],
 ['Pro Antidol Plus','Pro Thera','Kids & Family','100 ml · strawberry','#277552'],
 ['Pro ZN+2','Pro ZN','Vitamins & Minerals','30 tablets · zinc gluconate','#44926b'],
 ['Vitamin C Effervescent Duo','Pro Vit','Vitamins & Minerals','Vitamin C · effervescent','#f09a3c'],
 ['Vitamin C Pro','Pro Vit','Vitamins & Minerals','60 tablets · 1000 mg','#ba789b'],
 ['Vitamin C Pro Complex','Pro Vit','Vitamins & Minerals','30 tablets · 1000 mg','#e6b43f'],
 ['Vitamin E','Pro Vit','Vitamins & Minerals','400 IU · 50 softgels','#cfb94e'],
 ['Pro D3 Drops','Pro Vit','Vitamins & Minerals','20 ml','#f5a154'],
 ['B12 Forte','Pro Vit','Vitamins & Minerals','Liquid supplement · 10 vials','#b43c3c'],
 ['Vitamin Iron','Pro Vit','Vitamins & Minerals','10 vials · cherry','#bd4d9c'],
 ['Profol Folic Acid','Pro Med','Vitamins & Minerals','5 mg · 20 tablets','#c94949'],
 ['100% Whey Isolates','Pro Muscle','Sports & Energy','1825 g','#212b32'],
 ['Epi Gain','Pro Energy','Sports & Energy','12 capsules','#4c406e'],
 ['Pro Hair Serum','PROHERB','Beauty & Care','30 ml','#277b55'],
 ['Pro Active Kids Gummies','Pro Active','Gummies','60 gummies','#c77b3a'],
 ['Pro Beauty Gummies','PROHERB','Gummies','60 gummies · strawberry','#cd5394'],
 ['Pro Calcium & Vitamin D3 Gummies','Pro Vit','Gummies','60 gummies','#e89b51'],
 ['Pro Biotin 5000 Gummies','PROHERB','Gummies','60 gummies','#65a155'],
 ['Pro Eye Care Gummies','PROHERB','Gummies','60 gummies','#c96d36'],
 ['Pro Apple Cider Gummies','PROHERB','Gummies','60 gummies','#b5594c'],
 ['Pro Collagen 10,000','Pro Collagene','Beauty & Care','30 shots · 9 ml','#554277'],
 ['Black Cumin Seed Oil','PROHERB','Herbal Oils','60 softgels · 1000 mg','#7343a4'],
 ['Pro Glutathione + Vitamin C','PROHERB','Beauty & Care','30 capsules','#3ba8be'],
 ['Pro Sifa — Orange','Pro Shefa','Specialized Wellness','Herbal formula','#c8913d'],
 ['Pro Sifa — Blue','Pro Shefa','Specialized Wellness','Herbal formula','#4077ae'],
 ['Pro Sifa — Silver','Pro Shefa','Specialized Wellness','Herbal formula','#a5a49c'],
 ['Thyme Fresh Oil','PRP Herbal','Herbal Oils','50 ml','#658d45'],
 ['Flax Seed Oil','PROHERB','Herbal Oils','60 softgels · 1000 mg','#aa5c42'],
 ['Powerful Readiness & Delay','Pro Thera Power','Specialized Wellness','12 tablets','#d39433'],
 ['MS.PRO Gummies','PROHERB','Gummies','60 gummies','#7756ad'],
 ['MR.PRO Gummies','PROHERB','Gummies','60 gummies','#b43c45'],
 ['Pro Like Eau de Cologne','Pro Like','Beauty & Care','400 ml','#5aaeb0'],
 ['Red Pro Capsules','Pro Red','Sports & Energy','60 capsules','#e43e39'],
 ['White Pro Capsules','Pro Slim','Specialized Wellness','60 capsules','#a7be51'],
 ['Pro Scar Cream','Pro Scrub','Beauty & Care','50 ml','#5c6d83'],
 ['Slim Pro Capsules','Pro Slim','Specialized Wellness','60 capsules','#46b4ac'],
 ['Power Pro','Pro Thera Power','Specialized Wellness','5 pieces','#c9a252'],
 ['Procaine Oral Care Spray','Pro Thera','Personal Care','30 ml','#de9652'],
 ['Pro Fresh Mouthwash','Pro Fresh','Personal Care','300 ml','#3c9dc4'],
 ['Dr. Pro Cleansing Gel','Pro Med','Personal Care','500 ml','#61bcc1'],
 ['Dr. Pro Nasal Spray','Pro Med','Personal Care','60 ml','#469c9f'],
 ['Pro Active L-Carnitine + Zinc','Pro Active','Sports & Energy','30 softgels','#bd4b48'],
 ['L-Carnitine Pro Softgel','Pro Soft','Sports & Energy','30 softgels','#b14a4a']
]

const additionalEntries = [
  {
    id: 54,
    name: 'Throat Drops Orange',
    brand: 'PROHERB',
    category: 'Specialized Wellness',
    specification: 'Orange · Lozenges',
    color: '#e5a52f',
    productType: 'lozenges'
  },
  {
    id: 55,
    name: 'Pro B Complex',
    brand: 'PROHERB',
    category: 'Vitamins & Minerals',
    specification: 'Vitamin B Complex',
    color: '#bb4545',
    productType: 'capsules'
  },
  {
    id: 56,
    name: 'Pro Beta Vit A,C,E',
    brand: 'Pro Vit',
    category: 'Vitamins & Minerals',
    specification: 'Vitamins A, C & E',
    color: '#e5a82a',
    productType: 'capsules'
  },
  {
    id: 57,
    name: 'Pro Memo',
    brand: 'PROHERB',
    category: 'Specialized Wellness',
    specification: 'Memory & Cognitive Support',
    color: '#399b62',
    productType: 'capsules'
  },
  {
    id: 58,
    name: 'Pro Women',
    brand: 'PROHERB',
   category: "Women's Health",
    specification: "Women's Wellness",
    color: '#d35491',
    productType: 'liquids'
  },
  {
    id: 60,
    name: 'Hair Vital Men',
    brand: 'PROHERB',
    category: 'Beauty & Care',
    specification: 'Men · Hair Nutrition',
    color: '#242d34',
    productType: 'capsules'
  },
  {
    id: 61,
    name: 'Hair Vital Women',
    brand: 'PROHERB',
    category: 'Beauty & Care',
    specification: 'Women · Hair Nutrition',
    color: '#bf478c',
    productType: 'capsules'
  },
  {
    id: 62,
    name: 'KDA Prolin',
    brand: 'PROHERB',
    category: 'Specialized Wellness',
    specification: 'Kidney & Urinary Tract Support',
    color: '#42a262',
    productType: 'powders'
  },
  {
    id: 63,
    name: 'Throat Drops Propolis & Honey',
    brand: 'PROHERB',
    category: 'Specialized Wellness',
    specification: 'Propolis & Honey · Lozenges',
    color: '#d5a039',
    productType: 'lozenges'
  },
  {
    id: 64,
    name: 'Pro Shield',
    brand: 'PROHERB',
    category: 'Personal Care',
    specification: 'Mosquito Repellent Lotion',
    color: '#419e90',
    productType: 'lotions'
  },
  {
    id: 65,
    name: 'SunShield SPF 50',
    brand: 'PROHERB',
    category: 'Beauty & Care',
    specification: 'Sun Protection · SPF 50',
    color: '#ed9944',
    productType: 'sprays'
  },
  {
    id: 66,
    name: 'L-Ca Pro',
    brand: 'Pro Active',
    category: 'Specialized Wellness',
    specification: 'Metabolism & Weight Management Support',
    color: '#bb454c',
    productType: 'capsules'
  },
  {
    id: 67,
    name: 'Throat Drops Lemon & Honey',
    brand: 'PROHERB',
    category: 'Specialized Wellness',
    specification: 'Lemon & Honey · Lozenges',
    color: '#dab83e',
    productType: 'lozenges'
  },
  {
    id: 68,
    name: 'Pro Mini',
    brand: 'PROHERB',
    category: 'Vitamins & Minerals',
    specification: 'Essential Minerals · General Wellness',
    color: '#9064ac',
    productType: 'capsules'
  },
  {
    id: 69,
    name: 'Throat Drops Eucalyptus & Menthol',
    brand: 'PROHERB',
    category: 'Specialized Wellness',
    specification: 'Eucalyptus & Menthol · Lozenges',
    color: '#349b8c',
    productType: 'lozenges'
  },


{
  id: 70,
  name: 'Pro Honey Plus — Botanical Extract & Fig',
  brand: 'Pro Honey',
  category: 'Herbal Oils',
  specification: 'Honey with Botanical Extract & Fig · 200 g',
  color: '#d8caa0',
  productType: 'honey'
},
{
  id: 71,
  name: 'Pro Honey Plus — Senna & Fennel',
  brand: 'Pro Honey',
  category: 'Herbal Oils',
  specification: 'Honey with Senna & Fennel · 200 g',
  color: '#71944b',
  productType: 'honey'
},
{
  id: 72,
  name: 'Pro Honey Plus — United Herbs',
  brand: 'Pro Honey',
  category: 'Herbal Oils',
  specification: 'United Herbs in One Dose · 200 g',
  color: '#343434',
  productType: 'honey'
},
{
  id: 73,
  name: 'Pro Honey Plus — Black Seed',
  brand: 'Pro Honey',
  category: 'Herbal Oils',
  specification: 'Honey with Black Seed · 200 g',
  color: '#5b8dc9',
  productType: 'honey'
},
{
  id: 74,
  name: 'Pro Honey Plus — Indian Costus',
  brand: 'Pro Honey',
  category: 'Herbal Oils',
  specification: 'Honey with Indian Costus · 200 g',
  color: '#813c49',
  productType: 'honey'
},
{
  id: 75,
  name: 'Pro Honey Plus — Chamomile',
  brand: 'Pro Honey',
  category: 'Herbal Oils',
  specification: 'Honey with Chamomile · 200 g',
  color: '#e9aa32',
  productType: 'honey'
}

]

const removedProductIds = [32, 34, 35, 36, 38]
export const products = [
  ...entries.map((e, i) => ({
    id: i + 1,
    slug: `${e[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${i + 1}`,
    name: e[0],
    brand: e[1],
    category: e[2],
    specification: e[3],
    color: e[4],
    image: `/products/p${String(i + 1).padStart(2, '0')}.webp`
  })),

  ...additionalEntries.map(p => ({
    ...p,
    slug: `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${p.id}`,
    image: `/products/p${String(p.id).padStart(2, '0')}.webp`
  }))
].filter(p => !removedProductIds.includes(p.id))

export const categories = [
  'All products',
  ...new Set(products.map(p => p.category))
]


