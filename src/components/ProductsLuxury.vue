<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { Search, SlidersHorizontal, ChevronRight, ArrowUpRight, X, PackageCheck, ArrowRight, LayoutGrid } from 'lucide-vue-next'
import { wellnessCategories, groupForProduct, labelForCategory } from '../wellnessCategories'

const props = defineProps({
  products: { type: Array, required: true },
  lang: { type: String, default: 'en' },
  asset: { type: Function, required: true }
})
const emit = defineEmits(['quote'])
const route = useRoute()
const router = useRouter()
const term = ref('')
const brand = ref('all')
const sortBy = ref('featured')
const mobileFilters = ref(false)
const activeCategory = computed(() => {
  const value = String(route.query.category || 'all')
  return wellnessCategories.some(c => c.id === value) ? value : 'all'
})
const ui = computed(() => ({
  en: { eyebrow:'PROHERB / PRODUCT COLLECTION', a:'Explore Wellness.', b:'Discover Possibilities.', intro:'Explore our diverse portfolio by wellness category, product line, or brand.', all:'All Products', browse:'Browse Categories', search:'Search products or brands...', brands:'All brands', sort:'Sort', featured:'Featured', az:'Name A–Z', za:'Name Z–A', results:'products', details:'View Product', inquire:'Request a Quote', clear:'Clear filters', empty:'No products in this selection yet.', emptySub:'Try a different category or browse the full collection.', filter:'Categories', note:'Category placement is for catalog navigation only; it does not establish medical indications or treatment claims.', new:'More products coming soon' },
  ar: { eyebrow:'PROHERB / مجموعة المنتجات', a:'استكشف العناية.', b:'اكتشف الخيارات.', intro:'تصفح منتجاتنا حسب الفئة أو العلامة التجارية أو اسم المنتج.', all:'جميع المنتجات', browse:'تصفّح التصنيفات', search:'ابحث عن منتج أو علامة...', brands:'كل العلامات', sort:'الترتيب', featured:'المختارة', az:'الاسم أ–ي', za:'الاسم ي–أ', results:'منتج', details:'تفاصيل المنتج', inquire:'طلب عرض سعر', clear:'مسح الفلاتر', empty:'لا توجد منتجات بهذه الفئة حالياً.', emptySub:'اختر فئة أخرى أو تصفّح كل المنتجات.', filter:'التصنيفات', note:'تصنيفات العرض مخصصة لتسهيل التصفح، وليست ادعاءات طبية أو علاجية.', new:'المزيد من المنتجات قريباً' },
  tr: { eyebrow:'PROHERB / ÜRÜN KOLEKSİYONU', a:'Sağlıklı Yaşamı Keşfedin.', b:'Farklı Seçenekler.', intro:'Ürünleri kategori, marka veya ürün adına göre inceleyin.', all:'Tüm Ürünler', browse:'Kategoriler', search:'Ürün veya marka ara...', brands:'Tüm markalar', sort:'Sırala', featured:'Öne çıkanlar', az:'İsim A–Z', za:'İsim Z–A', results:'ürün', details:'Ürün Detayı', inquire:'Teklif Talep Et', clear:'Filtreleri temizle', empty:'Bu kategoride henüz ürün bulunmuyor.', emptySub:'Başka bir kategori seçin veya tüm ürünlere bakın.', filter:'Kategoriler', note:'Kategoriler gezinme amaçlıdır; tıbbi endikasyon veya tedavi iddiası oluşturmaz.', new:'Yeni ürünler yakında' }
}[props.lang] || {
 eyebrow:'PROHERB / PRODUCT COLLECTION', a:'Explore Wellness.', b:'Discover Possibilities.', intro:'Explore our diverse portfolio by wellness category, product line, or brand.', all:'All Products', browse:'Browse Categories', search:'Search products or brands...', brands:'All brands', sort:'Sort', featured:'Featured', az:'Name A–Z', za:'Name Z–A', results:'products', details:'View Product', inquire:'Request a Quote', clear:'Clear filters', empty:'No products in this selection yet.', emptySub:'Try a different category or browse the full collection.', filter:'Categories', note:'Category placement is for catalog navigation only; it does not establish medical indications or treatment claims.', new:'More products coming soon'
}))
const brands = computed(() => [...new Set(props.products.map(p=>p.brand).filter(Boolean))].sort())
const counts = computed(() => Object.fromEntries(wellnessCategories.map(c => [c.id, props.products.filter(p => groupForProduct(p) === c.id).length])))
const visible = computed(() => {
  let list = props.products.filter(p =>
    (activeCategory.value === 'all' || groupForProduct(p) === activeCategory.value) &&
    (brand.value === 'all' || p.brand === brand.value) &&
    `${p.name} ${p.brand} ${p.specification}`.toLowerCase().includes(term.value.trim().toLowerCase())
  )
  if (sortBy.value !== 'featured') list = [...list].sort((a,b)=>sortBy.value==='az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  return list
})
function chooseCategory(category) {
  router.push({path:'/products', query:category==='all' ? {} : {category}})
  mobileFilters.value = false
}
function clearFilters() { term.value=''; brand.value='all'; sortBy.value='featured'; chooseCategory('all') }
watch(() => route.query.category, () => { mobileFilters.value=false })
</script>

<template>
  <div class="pc-page" :dir="lang==='ar'?'rtl':'ltr'">
    <section class="pc-hero">
      <div class="pc-container pc-hero-inner">
        <div class="pc-hero-text">
          <div class="pc-eyebrow"><span></span>{{ui.eyebrow}}</div>
          <h1>{{ui.a}} <em>{{ui.b}}</em></h1>
          <p>{{ui.intro}}</p>
          <div class="pc-hero-meta"><PackageCheck :size="18"/>{{products.length}} {{ui.results}} <span class="pc-meta-dot"></span> {{wellnessCategories.length}} {{ui.browse}}</div>
        </div>
        <div class="pc-hero-art" aria-hidden="true">
          <span class="pc-orbit pc-orbit-1"></span><span class="pc-orbit pc-orbit-2"></span>
          <div class="pc-hero-symbol">P<span>+</span></div>
          <small>THE NATURAL LIFE / EST. 2018</small>
        </div>
      </div>
    </section>

    <section class="pc-container pc-content">
      <div class="pc-toolbar">
        <div class="pc-search"><Search :size="20"/><input v-model="term" :placeholder="ui.search" type="search" /></div>
        <select v-model="brand" class="pc-select" :aria-label="ui.brands">
          <option value="all">{{ui.brands}}</option>
          <option v-for="b in brands" :key="b" :value="b">{{b}}</option>
        </select>
        <select v-model="sortBy" class="pc-select" :aria-label="ui.sort">
          <option value="featured">{{ui.featured}}</option><option value="az">{{ui.az}}</option><option value="za">{{ui.za}}</option>
        </select>
        <button type="button" class="pc-mobile-toggle" @click="mobileFilters=!mobileFilters"><SlidersHorizontal :size="18"/>{{ui.filter}}</button>
      </div>

      <div class="pc-layout">
        <aside class="pc-sidebar" :class="{'pc-sidebar-open':mobileFilters}">
          <div class="pc-sidebar-title"><span>{{ui.browse}}</span><LayoutGrid :size="17"/></div>
          <button type="button" class="pc-category" :class="{'pc-category-active':activeCategory==='all'}" @click="chooseCategory('all')">
            <span>{{ui.all}}</span><small>{{products.length}}</small>
          </button>
          <button v-for="c in wellnessCategories" :key="c.id" type="button" class="pc-category" :class="{'pc-category-active':activeCategory===c.id}" @click="chooseCategory(c.id)">
            <span>{{c[lang] || c.en}}</span><small>{{counts[c.id]}}</small>
          </button>
          <p class="pc-sidebar-note">{{ui.note}}</p>
        </aside>

        <div class="pc-results">
          <div class="pc-results-head">
            <div>
              <div class="pc-results-kicker">{{ui.eyebrow}}</div>
              <h2>{{activeCategory==='all' ? ui.all : labelForCategory(activeCategory,lang)}}</h2>
            </div>
            <span class="pc-results-number">{{visible.length}} {{ui.results}}</span>
          </div>
          <div v-if="visible.length" class="pc-grid">
            <article v-for="p in visible" :key="p.id" class="pc-card">
              <RouterLink :to="`/products/${p.slug}`" class="pc-card-media" :aria-label="p.name">
                <img :src="asset(p.image)" :alt="p.name" loading="lazy"/>
                <span class="pc-card-arrow"><ArrowUpRight :size="18"/></span>
              </RouterLink>
              <div class="pc-card-info">
                <span class="pc-brand">{{p.brand}}</span>
                <h3><RouterLink :to="`/products/${p.slug}`">{{p.name}}</RouterLink></h3>
                <div class="pc-spec">{{p.specification}}</div>
                <div class="pc-card-footer">
                  <span>{{labelForCategory(groupForProduct(p),lang)}}</span>
                  <button type="button" @click="emit('quote',p.name)" :aria-label="ui.inquire"><ArrowRight :size="19"/></button>
                </div>
              </div>
            </article>
          </div>
          <div v-else class="pc-empty">
            <PackageCheck :size="40" :stroke-width="1.3"/>
            <h3>{{ui.empty}}</h3><p>{{ui.emptySub}}</p>
            <button type="button" @click="clearFilters">{{ui.clear}} <ChevronRight :size="17"/></button>
          </div>
          <p class="pc-disclaimer">{{ui.note}}</p>
        </div>
      </div>
    </section>
  </div>
</template>
