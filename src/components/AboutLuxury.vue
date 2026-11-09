<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowUpRight, ArrowRight, ArrowDown, Globe2, ShieldCheck,
  Layers3, Leaf, FlaskConical, Handshake, Sparkles,
  MapPin, Award, HeartPulse, Check, MoveUpRight
} from 'lucide-vue-next'
const asset = (path) =>
  import.meta.env.BASE_URL + path.replace(/^\/+/, '')
const props = defineProps({ lang: { type: String, default: 'en' } })
const emit = defineEmits(['quote'])
const pageRef = ref(null)
let observer
const content = {
  en: {
    eyebrow: 'OUR COMPANY · ESTABLISHED 2018', titleA: 'Rooted in Nature.', titleB: 'Driven by Possibility.',
    intro: 'A diverse wellness company connecting product innovation, quality-minded thinking and international business relationships.',
    discover: 'Discover Our Story', quote: 'Become a Partner', scroll: 'DISCOVER PROHERB',
    storyEyebrow: '01 / THE PROHERB STORY', storyTitle: 'Where Natural Inspiration Meets Global Ambition.',
    storyA: 'Founded in 2018, PROHERB has developed a broad and diverse portfolio of nutritional supplements, herbal oils, vitamins, minerals, and personal care products, connecting customers and distribution partners across Türkiye and international markets.</p><p><strong>Our journey began with a clear ambition:</strong> to make quality-focused wellness products more accessible while building a company known for product diversity, reliable communication, and lasting business relationships.</p><p>From everyday vitamins and essential nutrients to botanical oils, collagen, childrens supplements, sports nutrition, and specialized personal care solutions, our portfolio reflects the evolving needs of different consumers and markets.Inspired by nature and guided by opportunity, we continue to expand our product offering, bringing together multiple brands and wellness categories under the PROHERB name Over the years, PROHERB has established commercial relationships across the Gulf countries, Iraq, Bosnia & Herzegovina, Lebanon, Georgia, and Türkiye. These connections reflect our commitment to understanding different markets and developing meaningful, long-term partnerships For us, growth is not simply about introducing more products. It is about creating opportunities, simplifying communication, supporting our partners, and building relationships founded on mutual trust.Our ambition is to connect natural inspiration with international opportunities — creating a future where product diversity, quality, and trusted partnerships move forward together.',
    storyB: 'Our growth has been shaped by product diversity, accessible communication and a commitment to building long-term business relationships.',
    since: 'EST. 2018', philosophyEyebrow: '02 / OUR PHILOSOPHY', philosophyTitle: 'A Considered Approach to Wellness.',
    philosophyText: 'From ingredient-led inspiration to the products on the shelf, we believe every detail should support clarity, quality and confidence.',
    value1: 'Quality-Minded Approach', value1Text: 'A product portfolio developed with attention to quality and responsible communication.',
    value2: 'Nature-Inspired Portfolio', value2Text: 'Herbal oils, vitamins and modern formulations across a broad range of categories.',
    value3: 'Partnership First', value3Text: 'Accessible collaboration and relationships built to create long-term value.',
    journeyEyebrow: '03 / OUR JOURNEY', journeyTitle: 'Progress Built Over Time.',
    journey1: 'PROHERB was founded in Türkiye with a focus on nutritional supplements and wellness products.',
    journey2: 'The portfolio expanded across distinct product and personal care lines.',
    journey3: 'Commercial relationships developed across Türkiye, the Gulf and additional international markets.',
    journey4: 'A growing product family and continued focus on international partnerships.',
    portfolioEyebrow: '04 / DIVERSE BY DESIGN', portfolioTitle: 'One Company. Many Possibilities.',
    portfolioText: 'A broad portfolio designed to serve different preferences, categories and market needs.',
    segment1: 'Vitamins & Minerals', segment2: 'Herbal Oils & Softgels', segment3: 'Beauty & Personal Care', segment4: 'Kids & Family', segment5: 'Sports Nutrition', segment6: 'Gummies & Specialized Lines',
    viewPortfolio: 'Explore the Product Portfolio',
    reachEyebrow: '05 / INTERNATIONAL REACH', reachTitle: 'Relationships That Cross Borders.',
    reachText: 'PROHERB reports commercial relationships with customers and distributors across Türkiye, Gulf countries, Iraq, Bosnia & Herzegovina, Lebanon and Georgia.',
    markets: 'MARKETS & PARTNERS', founded: 'FOUNDED', sales: 'REPORTED CUMULATIVE SALES', brands: 'BRAND LINES',
    claimNote: 'Sales figures are company-reported and have not been independently verified here.',
    partnershipEyebrow: '06 / GROWING TOGETHER', partnershipTitle: 'More Than Products. Partnerships Without Borders.',
    partnershipText: 'We see distribution as a relationship, not just a transaction. Let’s explore how the PROHERB portfolio could support your market.',
    contact: 'Start a Partnership Conversation', closing: 'THE NATURAL LIFE · PROHERB'
  },
  ar: {
    eyebrow:'شركتنا · تأسست عام 2018',titleA:'جذورنا من الطبيعة.',titleB:'وطموحنا بلا حدود.',intro:'شركة متنوعة في عالم العناية والمكملات، تجمع بين المنتجات والعلاقات التجارية الدولية والتفكير المرتكز على الجودة.',discover:'اكتشف قصتنا',quote:'كن شريكاً لنا',scroll:'اكتشف بروهيرب',
    storyEyebrow:'01 / قصتنا',storyTitle:'حيث يلتقي الإلهام الطبيعي بالطموح العالمي.',storyA:'تأسست PROHERB عام 2018، وطورت محفظة واسعة من المكملات الغذائية والزيوت الطبيعية ومنتجات العناية الشخصية للعملاء وشركاء التوزيع في تركيا وخارجها.',storyB:'يعتمد نمونا على تنوع المنتجات وسهولة التواصل وبناء علاقات تجارية طويلة الأمد.',since:'منذ 2018',
    philosophyEyebrow:'02 / فلسفتنا',philosophyTitle:'نهج مدروس في عالم العناية.',philosophyText:'من استلهام المكونات إلى المنتج النهائي، نؤمن بأن التفاصيل تصنع الثقة والجودة والوضوح.',value1:'الاهتمام بالجودة',value1Text:'محفظة متنوعة مع اهتمام بالجودة والتواصل المسؤول.',value2:'منتجات مستوحاة من الطبيعة',value2Text:'زيوت نباتية وفيتامينات وتركيبات متنوعة لاحتياجات مختلفة.',value3:'الشراكة أولاً',value3Text:'تعاون مرن وعلاقات تسعى إلى قيمة طويلة الأمد.',
    journeyEyebrow:'03 / رحلتنا',journeyTitle:'خطوات تطور مستمرة.',journey1:'انطلقت PROHERB من تركيا في مجال المكملات الغذائية ومنتجات العناية.',journey2:'توسعت المحفظة لتشمل خطوط منتجات وعناية متعددة.',journey3:'تطورت العلاقات التجارية في تركيا والخليج وأسواق دولية أخرى.',journey4:'عائلة متنامية من المنتجات وتركيز مستمر على الشراكات الدولية.',
    portfolioEyebrow:'04 / تنوع المنتجات',portfolioTitle:'شركة واحدة. إمكانيات متعددة.',portfolioText:'محفظة واسعة تلبي تفضيلات وفئات واحتياجات أسواق مختلفة.',segment1:'الفيتامينات والمعادن',segment2:'الزيوت والكبسولات',segment3:'الجمال والعناية',segment4:'الأطفال والعائلة',segment5:'التغذية الرياضية',segment6:'العلكات والخطوط المتخصصة',viewPortfolio:'استكشف جميع المنتجات',
    reachEyebrow:'05 / حضورنا الدولي',reachTitle:'شراكات تتجاوز الحدود.',reachText:'بحسب بيانات الشركة، تربط PROHERB علاقات تجارية بعملاء وموزعين في تركيا ودول الخليج والعراق والبوسنة والهرسك ولبنان وجورجيا.',markets:'الأسواق والشركاء',founded:'تأسست',sales:'المبيعات التراكمية المعلنة',brands:'خطوط العلامات',claimNote:'أرقام المبيعات مقدمة من الشركة ولم يتم تدقيقها بشكل مستقل هنا.',
    partnershipEyebrow:'06 / ننمو معاً',partnershipTitle:'أكثر من منتجات. شراكات بلا حدود.',partnershipText:'التوزيع بالنسبة إلينا علاقة ممتدة، وليس مجرد صفقة. دعنا نستكشف فرص التعاون في سوقك.',contact:'ابدأ الحديث عن الشراكة',closing:'الحياة الطبيعية · PROHERB'
  },
  tr: {
    eyebrow:'ŞİRKETİMİZ · 2018’DEN BERİ',titleA:'Köklerimiz Doğada.',titleB:'Hedefimiz Dünyada.',intro:'Ürün çeşitliliğini, kalite odaklı yaklaşımı ve uluslararası iş ilişkilerini buluşturan bir wellness markası.',discover:'Hikâyemizi Keşfet',quote:'İş Ortağımız Olun',scroll:'PROHERB’İ KEŞFEDİN',
    storyEyebrow:'01 / HİKÂYEMİZ',storyTitle:'Doğal İlham, Küresel Hedeflerle Buluşuyor.',storyA:'2018 yılında kurulan PROHERB, Türkiye ve uluslararası pazarlardaki müşterileri ve dağıtım ortakları için takviye edici gıda, bitkisel yağ ve kişisel bakım ürünlerinden oluşan geniş bir portföy geliştirmiştir.',storyB:'Büyümemiz ürün çeşitliliği, kolay iletişim ve uzun vadeli iş ilişkilerine odaklanma ile şekillendi.',since:'2018’DEN BERİ',
    philosophyEyebrow:'02 / FELSEFEMİZ',philosophyTitle:'Sağlıklı Yaşama Özenli Yaklaşım.',philosophyText:'İçeriklerden son ürüne kadar her ayrıntının güven, kalite ve açıklığı desteklemesi gerektiğine inanıyoruz.',value1:'Kalite Odaklı Yaklaşım',value1Text:'Kaliteye ve sorumlu iletişime önem veren bir ürün portföyü.',value2:'Doğadan İlham Alan Ürünler',value2Text:'Çeşitli kategorilerde bitkisel yağlar, vitaminler ve modern formüller.',value3:'Önce İş Ortaklığı',value3Text:'Uzun vadeli değer yaratmayı amaçlayan açık ve erişilebilir iş birliği.',
    journeyEyebrow:'03 / YOLCULUĞUMUZ',journeyTitle:'Zamanla Güçlenen Bir Gelişim.',journey1:'PROHERB, Türkiye’de takviye ve wellness ürünlerine odaklanarak kuruldu.',journey2:'Portföy farklı ürün ve kişisel bakım serileriyle genişledi.',journey3:'Türkiye, Körfez ve başka uluslararası pazarlarda ticari ilişkiler gelişti.',journey4:'Büyüyen ürün ailesi ve uluslararası iş ortaklıklarına sürekli odaklanma.',
    portfolioEyebrow:'04 / ÜRÜN ÇEŞİTLİLİĞİ',portfolioTitle:'Tek Şirket. Sayısız Olanak.',portfolioText:'Farklı pazar ihtiyaçlarına ve tercihlere yanıt veren geniş bir portföy.',segment1:'Vitaminler ve Mineraller',segment2:'Bitkisel Yağlar ve Kapsüller',segment3:'Güzellik ve Kişisel Bakım',segment4:'Çocuklar ve Aile',segment5:'Sporcu Beslenmesi',segment6:'Gummy ve Özel Seriler',viewPortfolio:'Ürün Portföyünü Keşfet',
    reachEyebrow:'05 / ULUSLARARASI ERİŞİM',reachTitle:'Sınırları Aşan İş İlişkileri.',reachText:'PROHERB, Türkiye, Körfez ülkeleri, Irak, Bosna Hersek, Lübnan ve Gürcistan’da müşteri ve distribütörlerle ticari ilişkiler bildirmektedir.',markets:'PAZARLAR VE ORTAKLAR',founded:'KURULUŞ',sales:'BİLDİRİLEN TOPLAM SATIŞ',brands:'MARKA SERİLERİ',claimNote:'Satış rakamları şirket beyanıdır ve burada bağımsız olarak doğrulanmamıştır.',
    partnershipEyebrow:'06 / BİRLİKTE BÜYÜYELİM',partnershipTitle:'Ürünlerden Daha Fazlası. Sınır Tanımayan Ortaklıklar.',partnershipText:'Dağıtımı yalnızca işlem değil, kalıcı bir ilişki olarak görüyoruz. Pazarınızdaki iş birliği olanaklarını birlikte keşfedelim.',contact:'İş Ortaklığı Görüşmesi Başlat',closing:'THE NATURAL LIFE · PROHERB'
  }
}
import { computed } from 'vue'
const t = computed(() => content[props.lang] || content.en)
const brands = ['Pro Thera','Pro Active','Pro Like','Pro Muscle','Pro Collagen','Pro Vit','Pro Honey','Pro Sifa','Pro Slim','Pro Med','Pro Fresh','Pro LYT']
const markets = ['Türkiye', 'Gulf Countries', 'Iraq', 'Bosnia & Herzegovina', 'Lebanon', 'Georgia']
const productLines = [
 {key:'segment1',img:'/products/p13.webp',slug:'Vitamins & Minerals'},
 {key:'segment2',img:'/products/p32.webp',slug:'Herbal Oils'},
 {key:'segment3',img:'/products/p26.webp',slug:'Beauty & Care'},
 {key:'segment4',img:'/products/p06.webp',slug:'Kids & Family'},
 {key:'segment5',img:'/products/p22.webp',slug:'Sports & Energy'},
 {key:'segment6',img:'/products/p25.webp',slug:'Gummies'}
]
onMounted(() => {
 if (!pageRef.value || !('IntersectionObserver' in window)) return
 observer = new IntersectionObserver(entries => {
   entries.forEach(entry => {
     if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
   })
 }, { threshold: 0.12, rootMargin:'0px 0px -25px 0px' })
 pageRef.value.querySelectorAll('.about-reveal').forEach(el => observer.observe(el))
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
 <div ref="pageRef" class="about-luxury" :class="{ 'about-rtl': lang === 'ar' }">
  <section class="ab-hero">
   <div class="ab-hero-media"><img :src="asset('/images/pro3.png')"alt="Bright professional laboratory with botanical ingredients" /></div>
   <div class="ab-hero-overlay"></div>
   <div class="container ab-hero-content">
    <span class="ab-kicker ab-light"><i></i>{{t.eyebrow}}</span>
    <h1>{{t.titleA}}<br/><em>{{t.titleB}}</em></h1>
    <p>{{t.intro}}</p>
    <div class="ab-actions"><a href="#about-story" class="ab-btn ab-btn-gold">{{t.discover}} <ArrowUpRight :size="18"/></a><button class="ab-btn ab-btn-glass" @click="emit('quote')">{{t.quote}} <ArrowRight :size="18"/></button></div>
    <a href="#about-story" class="ab-scroll">{{t.scroll}} <ArrowDown :size="18"/></a>
   </div>
   <span class="ab-hero-index">PROHERB <b>®</b> / 2018</span>
  </section>

  <section id="about-story" class="ab-story container ab-section">
   <div class="ab-story-copy about-reveal"><span class="ab-kicker"><i></i>{{t.storyEyebrow}}</span><h2>{{t.storyTitle}}</h2><p>{{t.storyA}}</p><p>{{t.storyB}}</p><span class="ab-since"><Leaf :size="21"/> {{t.since}}</span></div>
   <div class="ab-story-visual about-reveal"><img :src="asset('/images/pro4.png')"  loading="lazy" alt="Botanical extraction in an advanced laboratory"/></div>
  </section>

  <section class="ab-philosophy ab-section">
   <div class="container"><div class="ab-center-head about-reveal"><span class="ab-kicker"><i></i>{{t.philosophyEyebrow}}</span><h2>{{t.philosophyTitle}}</h2><p>{{t.philosophyText}}</p></div>
    <div class="ab-values">
     <article class="about-reveal"><div class="ab-value-icon"><ShieldCheck :size="29" :stroke-width="1.5"/></div><span>01 / PROHERB</span><h3>{{t.value1}}</h3><p>{{t.value1Text}}</p></article>
     <article class="about-reveal"><div class="ab-value-icon"><Leaf :size="29" :stroke-width="1.5"/></div><span>02 / PROHERB</span><h3>{{t.value2}}</h3><p>{{t.value2Text}}</p></article>
     <article class="about-reveal"><div class="ab-value-icon"><Handshake :size="29" :stroke-width="1.5"/></div><span>03 / PROHERB</span><h3>{{t.value3}}</h3><p>{{t.value3Text}}</p></article>
    </div>
   </div>
  </section>

  <section class="ab-journey ab-section container">
   <div class="ab-journey-head about-reveal"><span class="ab-kicker"><i></i>{{t.journeyEyebrow}}</span><h2>{{t.journeyTitle}}</h2></div>
   <div class="ab-timeline">
    <article class="about-reveal"><b>2018</b><p>{{t.journey1}}</p></article>
    <article class="about-reveal"><b>GROWTH</b><p>{{t.journey2}}</p></article>
    <article class="about-reveal"><b>GLOBAL</b><p>{{t.journey3}}</p></article>
    <article class="about-reveal"><b>{{new Date().getFullYear()}}</b><p>{{t.journey4}}</p></article>
   </div>
  </section>

  <section class="ab-portfolio ab-section">
   <div class="container"><div class="ab-split-heading about-reveal"><div><span class="ab-kicker"><i></i>{{t.portfolioEyebrow}}</span><h2>{{t.portfolioTitle}}</h2></div><p>{{t.portfolioText}}</p></div>
    <div class="ab-product-grid">
     <article v-for="(line,i) in productLines" :key="line.key" class="ab-product-card about-reveal"><span class="ab-card-index">0{{i+1}} / COLLECTION</span><img :src="line.img" :alt="t[line.key]" loading="lazy"/><h3>{{t[line.key]}}</h3></article>
    </div>
    <RouterLink to="/products" class="ab-portfolio-link">{{t.viewPortfolio}} <ArrowUpRight :size="19"/></RouterLink>
   </div>
  </section>

  <section class="ab-reach ab-section">
   <div class="container ab-reach-grid"><div class="ab-reach-intro about-reveal"><span class="ab-kicker ab-light"><i></i>{{t.reachEyebrow}}</span><h2>{{t.reachTitle}}</h2><p>{{t.reachText}}</p><div class="ab-markets"><span v-for="market in markets" :key="market"><MapPin :size="16"/>{{market}}</span></div></div>
   <div class="ab-reach-stat about-reveal"><div class="ab-stat"><small>{{t.founded}}</small><strong>2018</strong></div><div class="ab-stat"><small>{{t.sales}}</small><strong>$2.5M+</strong></div><div class="ab-stat"><small>{{t.brands}}</small><strong>20+</strong></div><small class="ab-note">{{t.claimNote}}</small></div></div>
   <div class="ab-marquee" aria-hidden="true"><div><span v-for="(brand,i) in [...brands,...brands]" :key="i">{{brand}}</span></div></div>
  </section>

  <section class="ab-partnership ab-section container"><div class="ab-partnership-photo about-reveal"><img :src="asset('/images/about-partners.webp')" loading="lazy" alt="Business partners shaking hands"/></div><div class="ab-partnership-copy about-reveal"><span class="ab-kicker"><i></i>{{t.partnershipEyebrow}}</span><h2>{{t.partnershipTitle}}</h2><p>{{t.partnershipText}}</p><button class="ab-btn ab-btn-dark" @click="emit('quote')">{{t.contact}} <ArrowUpRight :size="18"/></button></div></section>

 </div>
</template>
