<script setup>
import {ref,computed,watch,onMounted,onUnmounted} from 'vue'
import {RouterLink,useRoute,useRouter} from 'vue-router'
import {ArrowRight,ArrowUpRight,ChevronDown,Menu,X,Globe2,CalendarDays,ChartNoAxesColumnIncreasing,Layers3,Leaf,FlaskConical,ShieldCheck,Package,HeartPulse,Instagram,Facebook,Linkedin,Youtube,Mail,MapPin,Phone,MessageCircle,Dumbbell,Baby,Flower2,Pill,Droplets,Search,Check,Copy,ArrowLeft,MoveDown,Play,Send} from 'lucide-vue-next'
import {products,brands,categories} from './data'
import AboutLuxury from './components/AboutLuxury.vue'
// Medical hero slider: independent from scrolling, no WebGL or 3D.


const asset = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return import.meta.env.BASE_URL + cleanPath
}

const flagsOpen = ref(false)
const heroSlides = [
  { image: '/images/hero-proherb.webp', eyebrow: 'PROHERB · THE NATURAL LIFE', title: 'NUTRACEUTICAL EXCELLENCE', position: 'center center' },
  { image: '/images/hero-laboratory.webp', eyebrow: 'RESEARCH · PRECISION · QUALITY', title: 'A SCIENCE-LED APPROACH', position: 'center center' },
  { image: '/images/hero-botanical.webp', eyebrow: 'NATURE · WELLNESS · INNOVATION', title: 'INSPIRED BY NATURE', position: 'center center' },
]

const heroIndex = ref(0)
const heroPaused = ref(false)
const foundedCount = ref(0)
const salesCount = ref(0)
const brandCount = ref(0)
const statsRef = ref(null)
let heroTimer = null
let counterFrame = null
let firstSlideTimer = null
let statsAnimated = false
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
function setHeroSlide(index) {
  heroIndex.value = (index + heroSlides.length) % heroSlides.length
  scheduleNextSlide()
}
function nextHeroSlide() { setHeroSlide(heroIndex.value + 1) }
function prevHeroSlide() { setHeroSlide(heroIndex.value - 1) }
function scheduleNextSlide(delay = 3000) {
  if (heroTimer) window.clearTimeout(heroTimer)
  if (reducedMotion) return
  heroTimer = window.setTimeout(() => {
    if (!document.hidden && !heroPaused.value && route.path === '/') {
      heroIndex.value = (heroIndex.value + 1) % heroSlides.length
    }
    scheduleNextSlide(3000)
  }, delay)
}
function onTabVisibility() { if (!document.hidden) scheduleNextSlide(3000) }
function checkStatsOnScroll() {
  if (statsAnimated || route.path !== '/' || !statsRef.value) return
  // Opening the page at scrollY = 0 must never launch the animation.
  if (window.scrollY < 100) return

  const box = statsRef.value.getBoundingClientRect()
  // Start when the top of the card reaches 72% of the viewport height.
  if (box.top <= window.innerHeight * 0.72 && box.bottom >= 0) {
    animateStats()
    window.removeEventListener('scroll', checkStatsOnScroll)
  }
}

function animateStats() {
  if (statsAnimated) return
  statsAnimated = true
  if (reducedMotion) {
    foundedCount.value = 2018
    salesCount.value = 2.5
    brandCount.value = 20
    return
  }
  const begin = performance.now()
  const duration = 1650
  const tick = now => {
    const p = Math.min(1, (now - begin) / duration)
    const eased = 1 - Math.pow(1-p, 3)
    foundedCount.value = Math.round(2018 * eased)
    salesCount.value = Number((2.5 * eased).toFixed(1))
    brandCount.value = Math.round(20 * eased)
    if (p < 1) counterFrame = requestAnimationFrame(tick)
  }
  counterFrame = requestAnimationFrame(tick)
}
onMounted(() => {
  document.addEventListener('visibilitychange', onTabVisibility)
  if (!reducedMotion) {
    firstSlideTimer = window.setTimeout(() => {
      heroIndex.value = 1
      scheduleNextSlide(3000)
    }, 950)
  }
  // Do not start counting when the home page first opens.
  // Wait for an actual downward scroll and for the stats card to come into view.
  window.addEventListener('scroll', checkStatsOnScroll, { passive: true })
})
onUnmounted(() => {
  window.clearTimeout(firstSlideTimer)
  window.clearTimeout(heroTimer)
  if (counterFrame) cancelAnimationFrame(counterFrame)
  window.removeEventListener('scroll', checkStatsOnScroll)
  document.removeEventListener('visibilitychange', onTabVisibility)
})

const route=useRoute(),router=useRouter()
const lang=ref(localStorage.getItem('proherb-v2-lang')||'en'),navOpen=ref(false),brandFilter=ref('All'),categoryFilter=ref('All'),term=ref(''),copied=ref(false)
// Add VERIFIED company information here when available. No invented contacts.
const company={email:'',whatsapp:'',phone:'',address:'Türkiye'}
const menu=[['home','/'],['about','/about'],['experience','/experience'],['products','/products'],['contact','/contact']]
const i18n={
 en:{home:'Home',about:'About',experience:'Experience',products:'Products',contact:'Contact',quote:'Request a Quote',eyebrow:'NUTRACEUTICALS · WELLNESS · GLOBAL HEALTH',hero1:'Medical Wellness.',hero2:'Natural Life.',hero3:'Global Trust.',heroCopy:'Since 2018, PROHERB has brought together diverse nutritional supplements, wellness solutions and opportunities for international partnerships.',explore:'Explore Our Products',story:'Discover Our Story',founded:'Founded',sales:'Cumulative Sales',brandLines:'Brand Lines',presence:'Regional Presence',catSmall:'OUR PRODUCT CATEGORIES',catTitle:'Comprehensive Health Solutions',allCategories:'View All Categories',aboutSmall:'ABOUT PROHERB',aboutTitle:'Science, Quality & Global Wellbeing',aboutCopy:'Established in 2018, PROHERB brings a diverse portfolio of nutritional supplements, herbal oils, wellness and personal care products to partners and customers across Türkiye and international markets.',aboutMore:'Learn More About Us',trust1:'Quality-Focused Portfolio',trust2:'International Partnerships',trust3:'Diverse Product Range',featured:'FEATURED PRODUCTS',featuredTitle:'Our Signature Products',viewAll:'View All Products',marketsTitle:'Our Markets & Distributors',marketsSmall:'OUR GLOBAL CONNECTIONS',ctaTitle:'Looking for a distribution partner?',ctaCopy:'Explore the PROHERB product portfolio and send us an inquiry for your market.',start:'Start an Inquiry',footerText:'A diverse wellness and nutraceutical portfolio, connecting products and partners since 2018.',footerCategories:'Product Categories',quick:'Quick Links',inquiry:'Distributor Inquiry',inquiryText:'Interested in bringing PROHERB products to your market?',rights:'All rights reserved.',portfolio:'Explore the Full Portfolio',search:'Search products...',allBrands:'All brands',allProducts:'All products',result:'products',detail:'Product Details',spec:'Packaging',category:'Category',brand:'Brand',ask:'Request This Product',disclaimer:'Product images and packaging are for reference. Ingredients, usage, permitted claims and regulatory information must be confirmed from official product documents before publication.',related:'Related Products',aboutIntro:'Our Company',aboutHeadline:'A trusted approach to wellness.',aboutPara:'Founded in 2018, PROHERB has developed a broad range of products and relationships with customers and distributors in Türkiye, the Arab world and other international markets.',mission:'What moves us forward',missionText:'Product diversity, accessible communication, a quality-focused approach and long-term relationships with our partners.',experienceIntro:'OUR EXPERIENCE',experienceHeadline:'Built in Türkiye. Connected worldwide.',experiencePara:'Over eight years, PROHERB reports more than $2.5 million in cumulative sales and relationships across the Gulf, Iraq, Bosnia and Herzegovina, Lebanon, Georgia and Türkiye.',salesNote:'Company-reported sales figure; not independently audited here.',vision:'OUR VISION',visionText:'We believe lasting growth begins with trust, continues through quality, and reaches beyond borders through meaningful partnerships.',visionNote:'Proposed brand statement — subject to owner approval.',contactHeadline:'Let’s Build a Partnership.',contactCopy:'Tell us about your market and the products you are interested in. You can prepare an inquiry for email or WhatsApp.',name:'Full Name',company:'Company',country:'Country / Market',email:'Email Address',phone:'WhatsApp / Phone',product:'Products of Interest',quantity:'Estimated Quantity',message:'Your Message',sendEmail:'Prepare Email',sendWa:'Prepare WhatsApp',copy:'Copy Inquiry',copySuccess:'Copied',contactMissing:'Configure the official company email and WhatsApp number in src/App.vue before publishing. Until then, copy the inquiry to send it manually.',noResults:'No matching products.',scroll:'SCROLL TO EXPLORE'},
 ar:{home:'الرئيسية',about:'من نحن',experience:'خبراتنا',products:'المنتجات',contact:'تواصل معنا',quote:'اطلب عرض سعر',eyebrow:'مكملات غذائية · عناية · أسواق عالمية',hero1:'عناية متقدمة.',hero2:'حياة طبيعية.',hero3:'ثقة عالمية.',heroCopy:'منذ عام 2018 تجمع PROHERB مجموعة واسعة من المكملات الغذائية ومنتجات العناية وفرص الشراكة في الأسواق الدولية.',explore:'استكشف المنتجات',story:'تعرّف علينا',founded:'تأسست',sales:'المبيعات التراكمية',brandLines:'خطوط المنتجات',presence:'حضور إقليمي',catSmall:'تصنيفات منتجاتنا',catTitle:'حلول شاملة للصحة والعناية',allCategories:'جميع التصنيفات',aboutSmall:'عن PROHERB',aboutTitle:'العلم والجودة والعناية العالمية',aboutCopy:'تأسست PROHERB سنة 2018 وتقدم مجموعة متنوعة من المكملات الغذائية والزيوت الطبيعية ومنتجات العناية عبر تركيا والأسواق الدولية.',aboutMore:'اعرف المزيد عنا',trust1:'منتجات تركّز على الجودة',trust2:'شراكات دولية',trust3:'تنوع كبير في المنتجات',featured:'منتجات مختارة',featuredTitle:'منتجاتنا المميزة',viewAll:'كل المنتجات',marketsTitle:'أسواقنا وشركاؤنا',marketsSmall:'تواصلنا العالمي',ctaTitle:'هل تبحث عن شريك لتوزيع المنتجات؟',ctaCopy:'استكشف مجموعة PROHERB وأرسل استفسارك عن منتجاتنا في سوقك.',start:'إرسال استفسار',footerText:'مجموعة متكاملة من المكملات ومنتجات العناية تربط المنتجات والشركاء منذ 2018.',footerCategories:'فئات المنتجات',quick:'روابط سريعة',inquiry:'طلبات الوكالة والتوزيع',inquiryText:'هل ترغب في توزيع منتجات PROHERB في سوقك؟',rights:'جميع الحقوق محفوظة.',portfolio:'تصفح كل المنتجات',search:'ابحث عن منتج...',allBrands:'كل العلامات',allProducts:'كل المنتجات',result:'منتج',detail:'تفاصيل المنتج',spec:'العبوة',category:'التصنيف',brand:'العلامة',ask:'اطلب هذا المنتج',disclaimer:'الصور والعبوات للعرض. يجب اعتماد المكونات وطريقة الاستخدام والادعاءات المسموحة من الوثائق الرسمية قبل النشر.',related:'منتجات مشابهة',aboutIntro:'الشركة',aboutHeadline:'نهج موثوق في عالم العناية.',aboutPara:'انطلقت PROHERB عام 2018 ووسّعت منتجاتها وعلاقاتها مع العملاء والموزعين في تركيا والعالم العربي وأسواق أخرى.',mission:'ما الذي يميزنا',missionText:'تنوع المنتجات وسهولة التواصل والاهتمام بالجودة وبناء علاقات طويلة الأمد مع الشركاء.',experienceIntro:'خبرتنا',experienceHeadline:'انطلقنا من تركيا ووصلنا إلى العالم.',experiencePara:'خلال ثماني سنوات، تشير بيانات الشركة إلى مبيعات تراكمية تزيد عن 2.5 مليون دولار وعلاقات في الخليج والعراق والبوسنة والهرسك ولبنان وجورجيا وتركيا.',salesNote:'الأرقام مقدمة من الشركة ولم تخضع هنا لتدقيق مستقل.',vision:'رؤيتنا',visionText:'نؤمن أن النمو الحقيقي يبدأ بالثقة، ويستمر بالجودة، ويتجاوز الحدود عبر شراكات قوية.',visionNote:'نص مقترح يحتاج موافقة صاحب الشركة.',contactHeadline:'لنبدأ شراكة ناجحة.',contactCopy:'أخبرنا عن سوقك والمنتجات التي تهمك. يمكنك تجهيز الاستفسار لإرساله عبر البريد أو واتساب.',name:'الاسم الكامل',company:'الشركة',country:'الدولة / السوق',email:'البريد الإلكتروني',phone:'واتساب / هاتف',product:'المنتجات المطلوبة',quantity:'الكمية المتوقعة',message:'رسالتك',sendEmail:'تجهيز البريد',sendWa:'تجهيز واتساب',copy:'نسخ الطلب',copySuccess:'تم النسخ',contactMissing:'يجب إضافة البريد الإلكتروني ورقم واتساب الرسميين للشركة في src/App.vue قبل النشر. حالياً يمكن نسخ الطلب وإرساله يدوياً.',noResults:'لا توجد نتائج.',scroll:'مرّر للاستكشاف'},
 tr:{home:'Ana Sayfa',about:'Hakkımızda',experience:'Deneyim',products:'Ürünler',contact:'İletişim',quote:'Teklif İste',eyebrow:'TAKVİYE EDİCİ GIDA · SAĞLIK · KÜRESEL PAZAR',hero1:'Sağlıklı Yaşam.',hero2:'Doğal Hayat.',hero3:'Küresel Güven.',heroCopy:'PROHERB, 2018 yılından beri besin takviyelerini, kişisel bakım ürünlerini ve uluslararası iş ortaklıklarını bir araya getiriyor.',explore:'Ürünleri Keşfet',story:'Hikâyemizi Keşfet',founded:'Kuruluş',sales:'Toplam Satış',brandLines:'Ürün Serileri',presence:'Bölgesel Varlık',catSmall:'ÜRÜN KATEGORİLERİ',catTitle:'Kapsamlı Sağlık Çözümleri',allCategories:'Tüm Kategoriler',aboutSmall:'PROHERB HAKKINDA',aboutTitle:'Bilim, Kalite ve Küresel İyi Yaşam',aboutCopy:'2018 yılında kurulan PROHERB; besin takviyesi, bitkisel yağ, sağlık ve kişisel bakım ürünlerinden oluşan geniş portföyünü Türkiye ve uluslararası pazarlara sunuyor.',aboutMore:'Daha Fazlası',trust1:'Kalite Odaklı Ürünler',trust2:'Uluslararası İş Ortaklıkları',trust3:'Geniş Ürün Portföyü',featured:'ÖNE ÇIKAN ÜRÜNLER',featuredTitle:'Seçkin Ürünlerimiz',viewAll:'Tüm Ürünler',marketsTitle:'Pazarlarımız ve Distribütörlerimiz',marketsSmall:'KÜRESEL BAĞLANTILARIMIZ',ctaTitle:'Distribütörlük için iş ortağı mı arıyorsunuz?',ctaCopy:'PROHERB portföyünü keşfedin ve pazarınız için bizimle iletişime geçin.',start:'Bilgi Talep Et',footerText:'2018’den beri ürünleri ve iş ortaklarını buluşturan çeşitli takviye ve sağlık ürünleri portföyü.',footerCategories:'Ürün Kategorileri',quick:'Hızlı Bağlantılar',inquiry:'Distribütörlük',inquiryText:'PROHERB ürünlerini pazarınıza getirmek ister misiniz?',rights:'Tüm hakları saklıdır.',portfolio:'Tüm Ürünleri Keşfet',search:'Ürün ara...',allBrands:'Tüm markalar',allProducts:'Tüm ürünler',result:'ürün',detail:'Ürün Detayı',spec:'Ambalaj',category:'Kategori',brand:'Marka',ask:'Ürün Teklifi Al',disclaimer:'Ürün görselleri ve ambalajlar referans amaçlıdır. İçerik, kullanım ve mevzuat bilgileri yayımlanmadan önce resmî belgelerle doğrulanmalıdır.',related:'Benzer Ürünler',aboutIntro:'ŞİRKETİMİZ',aboutHeadline:'Sağlıklı yaşama güvenilir yaklaşım.',aboutPara:'2018’de kurulan PROHERB, Türkiye, Arap dünyası ve uluslararası pazarlarda ürün ve dağıtım ağını geliştirmektedir.',mission:'Bizi ileri taşıyan',missionText:'Geniş ürün yelpazesi, kolay iletişim, kaliteye odaklanma ve uzun vadeli iş ortaklıkları.',experienceIntro:'DENEYİMİMİZ',experienceHeadline:'Türkiye’de doğdu. Dünyaya bağlandı.',experiencePara:'PROHERB, sekiz yılda 2,5 milyon ABD dolarını aşan kümülatif satış ve Körfez, Irak, Bosna Hersek, Lübnan, Gürcistan ve Türkiye’de ticari bağlantılar bildirmektedir.',salesNote:'Şirket beyanıdır; bağımsız denetim yapılmamıştır.',vision:'VİZYONUMUZ',visionText:'Kalıcı büyümenin güvenle başladığına, kaliteyle sürdüğüne ve güçlü iş ortaklıklarıyla sınırları aştığına inanıyoruz.',visionNote:'Onay bekleyen öneri marka ifadesi.',contactHeadline:'Birlikte İş Geliştirelim.',contactCopy:'Pazarınız ve ilgilendiğiniz ürünler hakkında bilgi verin. E-posta veya WhatsApp için talep hazırlayın.',name:'Ad Soyad',company:'Firma',country:'Ülke / Pazar',email:'E-posta',phone:'WhatsApp / Telefon',product:'İlgilendiğiniz Ürünler',quantity:'Tahmini Miktar',message:'Mesajınız',sendEmail:'E-postayı Hazırla',sendWa:'WhatsApp Hazırla',copy:'Talebi Kopyala',copySuccess:'Kopyalandı',contactMissing:'Yayınlamadan önce src/App.vue dosyasına resmi e-posta ve WhatsApp bilgilerini ekleyin. Şimdilik talebi kopyalayabilirsiniz.',noResults:'Ürün bulunamadı.',scroll:'KEŞFETMEK İÇİN KAYDIR'}
}
const T=computed(()=>i18n[lang.value]||i18n.en)
const isRTL=computed(()=>lang.value==='ar')
const featured=[32,31,14,4].map(id=>products.find(p=>p.id===id)).filter(Boolean)
const tiles=[{title:'Vitamins & Minerals',image:13,icon:Pill,category:'Vitamins & Minerals'},{title:'Gummies',image:26,icon:HeartPulse,category:'Gummies'},{title:'Herbal Oils',image:37,icon:Droplets,category:'Herbal Oils'},{title:'Sports Nutrition',image:22,icon:Dumbbell,category:'Sports & Energy'},{title:'Kids & Syrups',image:6,icon:Baby,category:'Kids & Family'},{title:'Beauty & Personal Care',image:45,icon:Flower2,category:'Beauty & Care'}]
const markets=[['Gulf','GCC'],['Iraq','IQ'],['Bosnia & Herzegovina','BA'],['Lebanon','LB'],['Georgia','GE'],['Türkiye','TR']]
const activeProduct=computed(()=>products.find(p=>p.slug===route.params.slug))
const filtered=computed(()=>products.filter(p=>(categoryFilter.value==='All'||p.category===categoryFilter.value)&&(brandFilter.value==='All'||p.brand===brandFilter.value)&&(`${p.name} ${p.brand} ${p.category}`).toLowerCase().includes(term.value.toLowerCase())))
const related=computed(()=>products.filter(p=>p.id!==activeProduct.value?.id&&p.category===activeProduct.value?.category).slice(0,4))
const form=ref({name:'',company:'',country:'',email:'',phone:'',product:'',quantity:'',message:''})
function setLang(v){lang.value=v;localStorage.setItem('proherb-v2-lang',v)}
function goQuote(product=''){form.value.product=product||form.value.product;router.push('/contact')}
function openCat(cat){categoryFilter.value=cat;brandFilter.value='All';term.value='';router.push('/products')}
function inquiry(){return `PROHERB — Request a Quote\nName: ${form.value.name}\nCompany: ${form.value.company}\nCountry: ${form.value.country}\nEmail: ${form.value.email}\nPhone: ${form.value.phone}\nProducts: ${form.value.product}\nQuantity: ${form.value.quantity}\nMessage: ${form.value.message}`}
function prepareEmail(){if(!company.email)return copyInquiry();window.location.href=`mailto:${company.email}?subject=${encodeURIComponent('PROHERB — Request a Quote')}&body=${encodeURIComponent(inquiry())}`}
function prepareWa(){if(!company.whatsapp)return copyInquiry();window.open(`https://wa.me/${company.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(inquiry())}`,'_blank','noopener,noreferrer')}
async function copyInquiry(){try{await navigator.clipboard.writeText(inquiry());copied.value=true;setTimeout(()=>copied.value=false,2200)}catch(e){window.prompt('Copy your request:',inquiry())}}
function openFloat(){if(company.whatsapp)window.open(`https://wa.me/${company.whatsapp.replace(/\D/g,'')}`,'_blank','noopener,noreferrer');else goQuote()}
watch(()=>route.fullPath,()=>{navOpen.value=false;document.title=`PROHERB | ${route.name==='home'?'The Natural Life':T.value[route.name]||'Products'}`})
watch(isRTL,v=>{document.documentElement.dir=v?'rtl':'ltr';document.documentElement.lang=lang.value})
watch(lang,()=>{document.documentElement.lang=lang.value})
onMounted(()=>{document.documentElement.dir=isRTL.value?'rtl':'ltr';document.documentElement.lang=lang.value})
</script>

<template>
<div class="site-shell" :class="{'is-rtl':isRTL}">
  <header class="site-header">
    <RouterLink to="/" class="logo-link" aria-label="PROHERB home"><img :src="asset('/logo-header.png')" alt="PROHERB — The Natural Life" /></RouterLink>
    <nav class="nav-desktop"><RouterLink v-for="[key,path] in menu" :key="key" :to="path" :class="{'nav-active':route.path===path}">{{T[key]}}<ChevronDown v-if="key==='products'" :size="13"/></RouterLink></nav>
    <div class="header-actions"><button class="gold-button header-quote" @click="goQuote()">{{T.quote}} <ArrowRight :size="17"/></button><span class="header-separator"></span><Globe2 :size="18"/>
<div class="flag-select">
  <button
    type="button"
    class="flag-selected"
    @click="flagsOpen = !flagsOpen"
    aria-label="Select language"
  >
  
<img
  :src="`https://flagcdn.com/w80/${lang === 'en' ? 'us' : lang === 'ar' ? 'sa' : 'tr'}.png`"
  alt="Selected language"
/>

    <ChevronDown :size="14" />
  </button>

<Transition name="flag-dropdown">
  <div v-if="flagsOpen" class="flag-options">
    <button
      v-for="item in [
        { code: 'en', flag: 'us' },
        { code: 'ar', flag: 'sa' },
        { code: 'tr', flag: 'tr' }
      ]"
      :key="item.code"
      type="button"
      @click="setLang(item.code); flagsOpen = false"
    >
      
<img
  :src="`https://flagcdn.com/w80/${item.flag}.png`"
  alt="Language flag"
/>

    </button>
  </div>
</Transition>
</div>
<button class="menu-toggle" @click="navOpen=!navOpen" aria-label="Toggle menu"><X v-if="navOpen"/><Menu v-else/></button></div>
    <nav v-if="navOpen" class="nav-mobile"><RouterLink v-for="[key,path] in menu" :key="key" :to="path">{{T[key]}}</RouterLink><button @click="goQuote()">{{T.quote}}</button></nav>
  </header>
  <main>
    <template v-if="route.name==='home'">
      <section class="hero"><div class="hero-gradient"></div><div class="hero-copy"><div class="eyebrow"><span class="gold-line"></span>{{T.eyebrow}}</div><h1>{{T.hero1}}<br/>{{T.hero2}}<br/><em>{{T.hero3}}</em></h1><p>{{T.heroCopy}}</p><div class="hero-buttons"><RouterLink to="/products" class="green-button">{{T.explore}} <ArrowRight :size="18"/></RouterLink><RouterLink to="/about" class="outline-button"><Play :size="18"/> {{T.story}}</RouterLink></div><div class="hero-scroll">{{T.scroll}} <MoveDown :size="18"/></div></div><div class="hero-art medical-hero-art" @mouseenter="heroPaused=true" @mouseleave="heroPaused=false" @focusin="heroPaused=true" @focusout="heroPaused=false">
  <div class="medical-hero-slides" aria-label="PROHERB medical and wellness imagery">
    <img v-for="(slide,index) in heroSlides" :key="slide.image" :src="asset(slide.image)" :alt="slide.title" :class="{active:index===heroIndex}" :style="{objectPosition:slide.position}" :aria-hidden="index!==heroIndex" :fetchpriority="index===0?'high':'auto'" />
  </div>
  <div class="medical-photo-shade"></div>
  <div class="medical-photo-caption"><span class="medical-caption-line"></span><small>{{heroSlides[heroIndex].eyebrow}}</small><strong>{{heroSlides[heroIndex].title}}</strong></div>
  <div class="medical-slide-controls" aria-label="Hero image controls">
    <button type="button" class="medical-slide-arrow" @click="prevHeroSlide" aria-label="Previous image"><ArrowLeft :size="18"/></button>
    <button v-for="(slide,index) in heroSlides" :key="slide.image" type="button" class="medical-slide-dot" :class="{active:index===heroIndex}" @click="setHeroSlide(index)" :aria-label="`View image ${index+1}`" :aria-pressed="index===heroIndex"></button>
    <button type="button" class="medical-slide-arrow" @click="nextHeroSlide" aria-label="Next image"><ArrowRight :size="18"/></button>
  </div>
</div></section>
      <section ref="statsRef" class="metrics container"><div class="metric"><CalendarDays/><span><small>{{T.founded}}</small><strong class="count-value">{{foundedCount}}</strong></span></div><div class="metric"><ChartNoAxesColumnIncreasing/><span><strong class="count-value">${{salesCount.toFixed(1)}}M+</strong><small>{{T.sales}}</small></span></div><div class="metric"><Layers3/><span><strong class="count-value">{{brandCount}}+</strong><small>{{T.brandLines}}</small></span></div><div class="metric last"><Globe2/><span><b>{{T.presence}}</b><small>Gulf · Iraq · Bosnia & Herzegovina<br/>Lebanon · Georgia · Türkiye</small></span></div></section>
      <section class="categories-section container section-space"><div class="section-top"><div><div class="section-kicker"><span class="gold-line"></span>{{T.catSmall}}</div><h2>{{T.catTitle}}</h2></div><button @click="openCat('All')" class="subtle-link">{{T.allCategories}} <ArrowRight :size="17"/></button></div><div class="category-grid"><button class="category-card" v-for="tile in tiles" :key="tile.title" @click="openCat(tile.category)"><component :is="tile.icon" :size="28" :stroke-width="1.4" class="category-icon"/><h3>{{tile.title}}</h3><div class="category-photo"><img :src="asset(products[tile.image-1].image)" :alt="tile.title" loading="lazy"/></div><span class="category-arrow"><ArrowUpRight :size="17"/></span></button></div></section>
      <section class="ph-editorial container section-space">
        
<div class="ph-editorial-photo">
<img :src="asset('/images/pro1.png')"
    alt="PROHERB - From Nature to Global Markets"
    loading="lazy"
  />


</div>

        <div class="ph-editorial-copy"><div class="section-kicker"><span class="gold-line"></span>{{T.aboutSmall}}</div>
          <h2>{{lang==='ar'?'من الطبيعة إلى أسواق العالم':lang==='tr'?'Doğadan Dünya Pazarlarına':'From Nature to Global Markets'}}</h2>
          <p>{{T.aboutCopy}}</p>
          <div class="ph-values">
            <div><ShieldCheck :size="25"/><span><b>{{T.trust1}}</b><small>{{lang==='ar'?'نهج يضع جودة المنتجات في الأولوية':lang==='tr'?'Ürün kalitesini öne alan yaklaşım':'A portfolio built with a quality-first mindset'}}</small></span></div>
            <div><Globe2 :size="25"/><span><b>{{T.trust2}}</b><small>{{lang==='ar'?'تعاون مع شركاء في أسواق متعددة':lang==='tr'?'Farklı pazarlarda iş ortaklıkları':'Relationships across diverse international markets'}}</small></span></div>
            <div><Layers3 :size="25"/><span><b>{{T.trust3}}</b><small>{{lang==='ar'?'مجموعة واسعة من فئات العناية والمكملات':lang==='tr'?'Geniş ürün kategorileri':'Multiple wellness and supplement categories'}}</small></span></div>
          </div>
          <RouterLink to="/about" class="outline-gold">{{T.aboutMore}} <ArrowRight :size="17"/></RouterLink>
        </div>
      </section>
      <section class="ph-expertise section-space">
        <div class="container">
          <div class="section-kicker"><span class="gold-line"></span>{{lang==='ar'?'ما الذي نقدمه':lang==='tr'?'UZMANLIK ALANLARIMIZ':'OUR EXPERTISE'}}</div>
          <div class="ph-expertise-head"><h2>{{lang==='ar'?'محفظة متكاملة لاحتياجات الأسواق المختلفة':lang==='tr'?'Farklı Pazarlara Uygun Kapsamlı Portföy':'A Diverse Portfolio. One Trusted Partner.'}}</h2><p>{{lang==='ar'?'من الفيتامينات والزيوت الطبيعية إلى منتجات الأطفال والجمال والعناية، نعمل على تقديم خيارات متنوعة لشركائنا.':lang==='tr'?'Vitamin, bitkisel yağ, çocuk ürünleri ve kişisel bakım alanlarında geniş bir portföy.':'From daily nutrition and botanical oils to children’s products, personal care and specialist wellness lines.'}}</p></div>
          <div class="ph-expertise-grid">
            <article><span class="ph-card-number">01 / NUTRITION</span><Pill :size="30" :stroke-width="1.4"/><h3>{{lang==='ar'?'فيتامينات ومكملات':lang==='tr'?'Vitamin ve Takviyeler':'Vitamins & Supplements'}}</h3><p>{{lang==='ar'?'منتجات متنوعة بأشكال وعبوات متعددة.':lang==='tr'?'Farklı formlarda çeşitli ürünler.':'A broad selection of formats for evolving consumer preferences.'}}</p><button @click="openCat('Vitamins & Minerals')">{{T.explore}} <ArrowUpRight :size="16"/></button></article>
            <article><span class="ph-card-number">02 / BOTANICAL</span><Leaf :size="30" :stroke-width="1.4"/><h3>{{lang==='ar'?'زيوت ومستخلصات طبيعية':lang==='tr'?'Bitkisel Yağlar':'Herbal Oils & Botanicals'}}</h3><p>{{lang==='ar'?'مجموعة من الزيوت والمنتجات المستوحاة من الطبيعة.':lang==='tr'?'Doğadan ilham alan yağlar.':'Nature-inspired formulations across the wellness portfolio.'}}</p><button @click="openCat('Herbal Oils')">{{T.explore}} <ArrowUpRight :size="16"/></button></article>
            <article><span class="ph-card-number">03 / WELLNESS</span><HeartPulse :size="30" :stroke-width="1.4"/><h3>{{lang==='ar'?'الجمال والعناية اليومية':lang==='tr'?'Güzellik ve Bakım':'Beauty & Personal Care'}}</h3><p>{{lang==='ar'?'منتجات للشعر والبشرة والعناية الشخصية.':lang==='tr'?'Saç, cilt ve kişisel bakım ürünleri.':'Thoughtful lines spanning skincare, hair care and everyday wellbeing.'}}</p><button @click="openCat('Beauty & Care')">{{T.explore}} <ArrowUpRight :size="16"/></button></article>
          </div>
        </div>
      </section>
      <section class="featured-section container section-space"><div class="section-top"><div><div class="section-kicker"><span class="gold-line"></span>{{T.featured}}</div><h2>{{T.featuredTitle}}</h2></div><RouterLink class="subtle-link" to="/products">{{T.viewAll}} <ArrowRight :size="17"/></RouterLink></div><div class="featured-grid"><RouterLink v-for="p in featured" :key="p.id" :to="`/products/${p.slug}`" class="featured-card"><img :src="asset(p.image)" :alt="p.name" loading="lazy"/><div><h3>{{p.name}}</h3><p>{{p.specification}}</p><span class="ring-arrow"><ArrowRight :size="17"/></span></div></RouterLink></div></section>
      <section class="ph-story section-space"><div class="container ph-story-inner">
        <div class="ph-story-content"><div class="section-kicker"><span class="gold-line"></span>{{lang==='ar'?'شراكات طويلة الأمد':lang==='tr'?'UZUN VADELİ İŞ ORTAKLIKLARI':'BUILT FOR PARTNERSHIPS'}}</div>
          <h2>{{lang==='ar'?'أكثر من منتجات. شراكات تتجاوز الحدود.':lang==='tr'?'Ürünlerin Ötesinde. Sınırları Aşan İş Birlikleri.':'More Than Products. Partnerships Without Borders.'}}</h2>
          <p>{{lang==='ar'?'منذ عام 2018 طورت PROHERB علاقات مع عملاء وموزعين في تركيا والخليج والعراق ولبنان والبوسنة والهرسك وجورجيا. نركّز على تنوع المنتجات وسهولة التواصل وبناء علاقات مستمرة.':lang==='tr'?'PROHERB, 2018 yılından beri Türkiye, Körfez, Irak, Lübnan, Bosna Hersek ve Gürcistan pazarlarında müşteri ve distribütörlerle ilişkiler geliştirmiştir.':'Since 2018, PROHERB has developed relationships with customers and distributors across Türkiye, the Gulf, Iraq, Lebanon, Bosnia & Herzegovina and Georgia. Our focus is on access, product variety and long-term collaboration.'}}</p>
          <div class="ph-story-points"><span><Check :size="17"/> {{lang==='ar'?'تنوع الفئات':lang==='tr'?'Ürün çeşitliliği':'Portfolio Diversity'}}</span><span><Check :size="17"/> {{lang==='ar'?'تواصل مباشر':lang==='tr'?'Kolay iletişim':'Accessible Communication'}}</span><span><Check :size="17"/> {{lang==='ar'?'شراكات دولية':lang==='tr'?'Uluslararası iş birlikleri':'International Partnerships'}}</span></div>
          <button @click="goQuote()" class="green-button">{{T.quote}} <ArrowRight :size="17"/></button>
        </div>
<div class="ph-story-image">
<img :src="asset('/images/pro2.png')" 
    alt="PROHERB - International Partnerships"
    loading="lazy"
  />


</div>

      </div></section>
      <section class="markets-band"><div class="container markets-inner"><div class="market-name"><div class="section-kicker">{{T.marketsSmall}}</div><h2>{{T.marketsTitle}}</h2></div><div class="markets-list"><div v-for="[name,iso] in markets" :key="iso"><Globe2 :size="23" stroke-width="1.4"/><span>{{name}}</span></div></div></div></section>
      <section class="home-cta"><div class="container home-cta-inner"><div><div class="section-kicker"><span class="gold-line"></span>PROHERB / PARTNERSHIPS</div><h2>{{T.ctaTitle}}</h2><p>{{T.ctaCopy}}</p></div><button @click="goQuote()" class="green-button">{{T.start}} <ArrowUpRight :size="18"/></button></div></section>
    </template>
<template v-else-if="route.name==='about'">
  <AboutLuxury
    :lang="lang"
    @quote="goQuote()"
  />
</template>
    <template v-else-if="route.name==='experience'"><section class="interior-hero experience-hero"><div class="container"><div class="section-kicker"><span class="gold-line"></span>{{T.experienceIntro}}</div><h1>{{T.experienceHeadline}}</h1><p>{{T.experiencePara}}</p></div></section><section class="experience-stats container"><div><CalendarDays/><span>2018</span><small>{{T.founded}}</small></div><div><ChartNoAxesColumnIncreasing/><span>$2.5M+</span><small>{{T.sales}}</small></div><div><Layers3/><span>20+</span><small>{{T.brandLines}}</small></div></section><div class="container muted-note">{{T.salesNote}}</div><section class="experience-markets container section-space"><div class="section-kicker"><span class="gold-line"></span>{{T.marketsSmall}}</div><h2>{{T.marketsTitle}}</h2><div class="market-chips"><span v-for="m in markets" :key="m[1]"><Globe2 :size="17"/>{{m[0]}}</span></div></section><section class="vision"><div class="container"><div class="section-kicker">{{T.vision}}</div><blockquote>“{{T.visionText}}”</blockquote><p>{{T.visionNote}}</p></div></section></template>
    <template v-else-if="route.name==='products'"><section class="interior-hero products-hero"><div class="container"><div class="section-kicker"><span class="gold-line"></span>THE PROHERB COLLECTION</div><h1>{{T.portfolio}}</h1><p>{{T.catTitle}}</p></div></section><section class="catalog container"><div class="catalog-tools"><div class="filter-group"><Search :size="19"/><input v-model="term" :placeholder="T.search"/></div><select v-model="categoryFilter" :aria-label="T.category"><option value="All">{{T.allProducts}}</option><option v-for="c in categories.slice(1)" :key="c" :value="c">{{c}}</option></select><select v-model="brandFilter" :aria-label="T.brand"><option value="All">{{T.allBrands}}</option><option v-for="b in brands" :key="b" :value="b">{{b}}</option></select></div><p class="catalog-count">{{filtered.length}} {{T.result}}</p><div v-if="filtered.length" class="catalog-grid"><RouterLink v-for="p in filtered" :key="p.id" :to="`/products/${p.slug}`" class="catalog-product"><div class="catalog-img"><img :src="asset(p.image)" :alt="p.name" loading="lazy"/></div><span class="product-overline">{{p.brand}} / {{p.category}}</span><h3>{{p.name}}</h3><p>{{p.specification}}</p><span class="catalog-arrow"><ArrowUpRight :size="19"/></span></RouterLink></div><div v-else class="empty">{{T.noResults}}</div></section></template>
    <template v-else-if="route.name==='detail'&&activeProduct"><section class="product-detail container"><div class="product-detail-art" :style="{'--accent':activeProduct.color}"><button class="detail-back" @click="router.push('/products')"><ArrowLeft :size="16"/> {{T.products}}</button><img :src="asset(activeProduct.image)" :alt="activeProduct.name"/></div><div class="detail-copy"><span class="section-kicker"><span class="gold-line"></span>{{activeProduct.brand}} / {{T.detail}}</span><h1>{{activeProduct.name}}</h1><p>{{T.disclaimer}}</p><dl><div><dt>{{T.spec}}</dt><dd>{{activeProduct.specification}}</dd></div><div><dt>{{T.category}}</dt><dd>{{activeProduct.category}}</dd></div><div><dt>{{T.brand}}</dt><dd>{{activeProduct.brand}}</dd></div></dl><button class="green-button" @click="goQuote(activeProduct.name)">{{T.ask}} <ArrowRight :size="18"/></button></div></section><section class="related container section-space"><div class="section-top"><h2>{{T.related}}</h2><RouterLink to="/products" class="subtle-link">{{T.viewAll}} <ArrowRight :size="16"/></RouterLink></div><div class="catalog-grid"><RouterLink v-for="p in related" :key="p.id" class="catalog-product" :to="`/products/${p.slug}`"><div class="catalog-img"><img :src="asset(p.image)" :alt="p.name"/></div><h3>{{p.name}}</h3><p>{{p.specification}}</p></RouterLink></div></section></template>
    <template v-else-if="route.name==='contact'"><section class="interior-hero contact-hero"><div class="container"><div class="section-kicker"><span class="gold-line"></span>CONTACT / BUSINESS PARTNERSHIPS</div><h1>{{T.contactHeadline}}</h1><p>{{T.contactCopy}}</p></div></section><section class="contact-section container"><div class="contact-side"><div class="section-kicker"><span class="gold-line"></span>PROHERB · THE NATURAL LIFE</div><h2>{{T.inquiry}}</h2><p>{{T.inquiryText}}</p><div class="contact-facts"><span><MapPin :size="20"/> Türkiye</span><span><Globe2 :size="20"/> International Markets</span></div></div><form class="quote-form" @submit.prevent="prepareEmail"><div class="quote-form-title">{{T.quote}} <ArrowUpRight :size="24"/></div><div class="form-grid"><label>{{T.name}} *<input v-model.trim="form.name" required autocomplete="name"/></label><label>{{T.company}}<input v-model.trim="form.company" autocomplete="organization"/></label><label>{{T.country}} *<input v-model.trim="form.country" required/></label><label>{{T.email}} *<input v-model.trim="form.email" required type="email" autocomplete="email"/></label><label>{{T.phone}}<input v-model.trim="form.phone" type="tel" autocomplete="tel"/></label><label>{{T.quantity}}<input v-model.trim="form.quantity"/></label></div><label>{{T.product}}<input v-model.trim="form.product"/></label><label>{{T.message}}<textarea v-model.trim="form.message" rows="5"></textarea></label><div class="form-actions"><button type="submit" class="green-button"><Mail :size="18"/> {{T.sendEmail}}</button><button type="button" class="outline-button" @click="prepareWa"><MessageCircle :size="18"/> {{T.sendWa}}</button><button type="button" class="outline-button" @click="copyInquiry"><Check v-if="copied" :size="18"/><Copy v-else :size="18"/> {{copied?T.copySuccess:T.copy}}</button></div><p class="form-disclaimer">{{T.contactMissing}}</p></form></section></template>
  </main>
  <footer class="footer"><div class="container footer-main"><div class="footer-company"><RouterLink to="/" class="footer-logo"><img :src="asset('/logo-footer.png')" alt="PROHERB"/></RouterLink><p>{{T.footerText}}</p><div class="social-line"><span aria-label="Instagram"><Instagram :size="20"/></span><span aria-label="LinkedIn"><Linkedin :size="20"/></span><span aria-label="Facebook"><Facebook :size="20"/></span><span aria-label="YouTube"><Youtube :size="20"/></span></div></div><div class="footer-column"><h3>{{T.footerCategories}}</h3><button v-for="c in tiles.slice(0,6)" :key="c.title" @click="openCat(c.category)">{{c.title}} <ArrowRight :size="15"/></button></div><div class="footer-column"><h3>{{T.quick}}</h3><RouterLink v-for="[key,path] in menu.slice(1)" :key="key" :to="path">{{T[key]}} <ArrowRight :size="15"/></RouterLink></div><div class="footer-column contact-col"><h3>{{T.contact}}</h3><span><MapPin :size="17"/> Türkiye · International</span><span><Mail :size="17"/> {{company.email||'Email to be confirmed'}}</span><span><Phone :size="17"/> {{company.phone||'Phone to be confirmed'}}</span></div><div class="footer-quote"><h3>{{T.inquiry}}</h3><p>{{T.inquiryText}}</p><button class="gold-button" @click="goQuote()">{{T.quote}} <ArrowRight :size="16"/></button></div></div><div class="footer-brand-backdrop" aria-hidden="true"><span v-for="b in brands.slice(0,12)" :key="b">{{b}}</span></div><div class="container footer-bottom"><span>© {{new Date().getFullYear()}} PROHERB®. {{T.rights}}</span><b>THE NATURAL LIFE · EST. 2018</b></div></footer>
  <button class="whatsapp-float" @click="openFloat" aria-label="WhatsApp / Request quote"><MessageCircle :size="25"/></button>
</div>
</template>
