const U = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=78`;

window.PROJECTS = [
  {
    id: 0, cat: "konut", catLabel: "Villa", tag: '',
    feat: 1, name: "Göl Mahal Malikaneleri", loc: "Göl Mahal, İstanbul", type: "Lüks Villa",
    img: "assets/projects/gol-mahal/01.jpg",
    lead: "Şömineli salon, çalışma odası ve gardırop koridoruyla uçtan uca tasarlanmış, uygulaması tamamlanmış malikâne.",
    body: ["Göl Mahal Malikaneleri, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir lüks villa projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/gol-mahal/01.jpg", "assets/projects/gol-mahal/02.jpg", "assets/projects/gol-mahal/03.jpg", "assets/projects/gol-mahal/04.jpg", "assets/projects/gol-mahal/05.jpg", "assets/projects/gol-mahal/06.jpg"]
  },
  {
    id: 1, cat: "konut", catLabel: "Villa", tag: '',
    feat: 1, name: "Alkent 2000 Göl Malikaneleri – Z. House", loc: "Alkent 2000, İstanbul", type: "Lüks Villa",
    img: "assets/projects/alkent-z-house/03.jpg",
    lead: "Avizeler, çift yükseklikli salon ve spiral merdivenle klasik çizgilerin zarif yorumu.",
    body: ["Alkent 2000 Göl Malikaneleri – Z. House, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir lüks villa projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/alkent-z-house/03.jpg", "assets/projects/alkent-z-house/01.jpg", "assets/projects/alkent-z-house/02.jpg", "assets/projects/alkent-z-house/04.jpg", "assets/projects/alkent-z-house/05.jpg", "assets/projects/alkent-z-house/06.jpg"]
  },
  {
    id: 2, cat: "konut", catLabel: "Konut", tag: '',
    name: "Ataköy Konakları – 1. Ev", loc: "Ataköy, İstanbul", type: "Rezidans Dairesi",
    img: "assets/projects/atakoy-konaklari-1/03.jpg",
    lead: "Eski seramikli banyo ve koridorların baştan tasarlandığı, küvetli banyosu ve ahşap detaylarıyla yenilenen rezidans daire.",
    body: ["Ataköy Konakları'ndaki bu dairede banyolar ve koridor baştan yenilendi. Eski kahverengi seramikler ve dar, yıpranmış hacimler; açık tonlu kaplamalar, bakır-altın armatürler, ahşap lavabo dolabı ve ayaklı küvetle sıcak ve sade bir banyoya dönüştü.","Aşağıda projenin sonrasını, hemen altında ise yenileme öncesi hâlini görebilirsiniz."],
    gallery: ["assets/projects/atakoy-konaklari-1/03.jpg", "assets/projects/atakoy-konaklari-1/05.jpg", "assets/projects/atakoy-konaklari-1/06.jpg", "assets/projects/atakoy-konaklari-1/08.jpg", "assets/projects/atakoy-konaklari-1/09.jpg"],
    before: ["assets/projects/atakoy-konaklari-1/02.jpg", "assets/projects/atakoy-konaklari-1/07.jpg", "assets/projects/atakoy-konaklari-1/04.jpg", "assets/projects/atakoy-konaklari-1/01.jpg"]
  },
  {
    id: 3, cat: "konut", catLabel: "Konut", tag: '',
    name: "Alkent Konut", loc: "Alkent, İstanbul", type: "Özel Konut",
    img: "assets/projects/konut-alkent/02.jpg",
    lead: "Koyu tonlar, raflı salon kurgusu ve karakterli sanat dokunuşlarıyla modern konut.",
    body: ["Alkent Konut, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir özel konut projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/konut-alkent/02.jpg", "assets/projects/konut-alkent/01.jpg", "assets/projects/konut-alkent/03.jpg", "assets/projects/konut-alkent/04.jpg", "assets/projects/konut-alkent/05.jpg", "assets/projects/konut-alkent/06.jpg"]
  },
  {
    id: 4, cat: "konut", catLabel: "Konut", tag: '',
    name: "Akbatı Koru Konut", loc: "Akbatı, İstanbul", type: "Özel Konut",
    img: "assets/projects/akbati-koru/03.jpg",
    lead: "TV ünitesi, yemek alanı ve yatak odasında bütünlüklü, sakin bir iç mekân dili.",
    body: ["Akbatı Koru Konut, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir özel konut projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/akbati-koru/03.jpg", "assets/projects/akbati-koru/01.jpg", "assets/projects/akbati-koru/02.jpg", "assets/projects/akbati-koru/04.jpg", "assets/projects/akbati-koru/05.jpg", "assets/projects/akbati-koru/06.jpg"]
  },
  {
    id: 5, cat: "konut", catLabel: "Konut", tag: '',
    name: "Göktürk 55 Konut", loc: "Göktürk, İstanbul", type: "Özel Konut",
    img: "assets/projects/gokturk-55/01.jpg",
    lead: "Salon, mutfak ve merdiven hacmini tek bir kurguda buluşturan aydınlık konut.",
    body: ["Göktürk 55 Konut, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir özel konut projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/gokturk-55/01.jpg", "assets/projects/gokturk-55/02.jpg", "assets/projects/gokturk-55/03.jpg", "assets/projects/gokturk-55/04.jpg", "assets/projects/gokturk-55/05.jpg", "assets/projects/gokturk-55/06.jpg"]
  },
  {
    id: 6, cat: "konut", catLabel: "Konut", tag: '',
    name: "Halkalı – Tema İstanbul", loc: "Halkalı, İstanbul", type: "Daire",
    img: "assets/projects/halkali-tema/05.jpg",
    lead: "Giriş, yatak odası, yemek alanı ve salonuyla dengeli ve rahat bir yaşam alanı.",
    body: ["Halkalı – Tema İstanbul, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir daire projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/halkali-tema/05.jpg", "assets/projects/halkali-tema/01.jpg", "assets/projects/halkali-tema/02.jpg", "assets/projects/halkali-tema/03.jpg", "assets/projects/halkali-tema/04.jpg", "assets/projects/halkali-tema/06.jpg"]
  },
  {
    id: 7, cat: "konut", catLabel: "Konut", tag: '',
    name: "Kemer Country Su Evleri", loc: "Kemer Country, İstanbul", type: "Su Evi",
    img: "assets/projects/kemer-country/02.jpg",
    lead: "Mutfak, bar, giriş holü ve giyinme odasıyla özenle detaylandırılmış su evi iç mekânı.",
    body: ["Kemer Country Su Evleri, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir su evi projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/kemer-country/02.jpg", "assets/projects/kemer-country/01.jpg", "assets/projects/kemer-country/03.jpg", "assets/projects/kemer-country/04.jpg", "assets/projects/kemer-country/05.jpg", "assets/projects/kemer-country/06.jpg"]
  },
  {
    id: 8, cat: "konut", catLabel: "Konut", tag: '',
    name: "Marin 24 – Mimaroba Konut Projesi", loc: "Mimaroba, İstanbul", type: "Konut Projesi",
    img: "assets/projects/marin-24/02.jpg",
    lead: "Salon, bilardo odası ve yatak odalarıyla geniş bir yaşam kurgusu.",
    body: ["Marin 24 – Mimaroba Konut Projesi, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir konut projesi projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/marin-24/02.jpg", "assets/projects/marin-24/01.jpg", "assets/projects/marin-24/03.jpg", "assets/projects/marin-24/04.jpg", "assets/projects/marin-24/05.jpg", "assets/projects/marin-24/06.jpg"]
  },
  {
    id: 9, cat: "ofis", catLabel: "Ofis", tag: '',
    feat: 1, name: "Antplato Vend Ofisi", loc: "Antplato, İstanbul", type: "Kurumsal Ofis",
    img: "assets/projects/ofis-antplato/02.jpg",
    lead: "Ahşap tavan detayları, karşılama alanı ve toplantı mekânlarıyla uygulaması tamamlanmış ofis.",
    body: ["Antplato Vend Ofisi, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir kurumsal ofis projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/ofis-antplato/02.jpg", "assets/projects/ofis-antplato/01.jpg", "assets/projects/ofis-antplato/03.jpg", "assets/projects/ofis-antplato/04.jpg", "assets/projects/ofis-antplato/05.jpg", "assets/projects/ofis-antplato/06.jpg"]
  },
  {
    id: 10, cat: "ofis", catLabel: "Ofis", tag: '',
    name: "Beyoğlu Çikolata – Kilis Fabrika", loc: "Kilis", type: "Fabrika Ofisi & Lobi",
    img: "assets/projects/beyoglu-cikolata-kilis/05.jpg",
    lead: "Marka kimliğini lobiden yönetici ofisine taşıyan kurumsal tasarım.",
    body: ["Beyoğlu Çikolata – Kilis Fabrika, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir fabrika ofisi & lobi projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/beyoglu-cikolata-kilis/05.jpg", "assets/projects/beyoglu-cikolata-kilis/01.jpg", "assets/projects/beyoglu-cikolata-kilis/02.jpg", "assets/projects/beyoglu-cikolata-kilis/03.jpg", "assets/projects/beyoglu-cikolata-kilis/04.jpg", "assets/projects/beyoglu-cikolata-kilis/06.jpg"]
  },
  {
    id: 11, cat: "ticari", catLabel: "Ticari", tag: '',
    name: "Beyoğlu Çikolata – Dünya Ticaret Merkezi", loc: "Dünya Ticaret Merkezi, İstanbul", type: "Ofis & Mağaza",
    img: "assets/projects/beyoglu-cikolata-dtm/04.jpg",
    lead: "Camlı bölmeler, kemerli detaylar ve marka dokunuşlarıyla ticari alan tasarımı.",
    body: ["Beyoğlu Çikolata – Dünya Ticaret Merkezi, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir ofis & mağaza projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/beyoglu-cikolata-dtm/04.jpg", "assets/projects/beyoglu-cikolata-dtm/01.jpg", "assets/projects/beyoglu-cikolata-dtm/02.jpg", "assets/projects/beyoglu-cikolata-dtm/03.jpg", "assets/projects/beyoglu-cikolata-dtm/05.jpg", "assets/projects/beyoglu-cikolata-dtm/06.jpg"]
  },
  {
    id: 12, cat: "ticari", catLabel: "Ticari", tag: '',
    feat: 1, name: "Hush – Sistem Kozmetik", loc: "Düsseldorf, Almanya", type: "Showroom & Akademi",
    img: "assets/projects/hush-dusseldorf/04.jpg",
    lead: "Showroom, akademi ve eğitim salonuyla yurt dışında hayata geçen ticari proje.",
    body: ["Hush – Sistem Kozmetik, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir showroom & akademi projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/hush-dusseldorf/04.jpg", "assets/projects/hush-dusseldorf/01.jpg", "assets/projects/hush-dusseldorf/02.jpg", "assets/projects/hush-dusseldorf/03.jpg", "assets/projects/hush-dusseldorf/05.jpg", "assets/projects/hush-dusseldorf/06.jpg"]
  },
  {
    id: 13, cat: "ticari", catLabel: "Güzellik Merkezi", tag: '',
    name: "Güzellik Estetik Merkezi – Nişantaşı", loc: "Nişantaşı, İstanbul", type: "Estetik Merkezi",
    img: "assets/projects/guzellik-nisantasi/04.jpg",
    lead: "Yeşil duvar ve sıcak bekleme alanlarıyla huzurlu bir klinik deneyimi.",
    body: ["Güzellik Estetik Merkezi – Nişantaşı, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir estetik merkezi projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/guzellik-nisantasi/04.jpg", "assets/projects/guzellik-nisantasi/01.jpg", "assets/projects/guzellik-nisantasi/02.jpg", "assets/projects/guzellik-nisantasi/03.jpg", "assets/projects/guzellik-nisantasi/05.jpg", "assets/projects/guzellik-nisantasi/06.jpg"]
  },
  {
    id: 14, cat: "ticari", catLabel: "Güzellik Merkezi", tag: '',
    name: "Güzellik Estetik Merkezi – Özbekistan", loc: "Özbekistan", type: "Estetik Merkezi",
    img: "assets/projects/guzellik-ozbekistan/01.jpg",
    lead: "Kemerli siyah cam bölmeler ve karşılama alanıyla uluslararası bir güzellik merkezi.",
    body: ["Güzellik Estetik Merkezi – Özbekistan, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir estetik merkezi projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/guzellik-ozbekistan/01.jpg", "assets/projects/guzellik-ozbekistan/02.jpg", "assets/projects/guzellik-ozbekistan/03.jpg", "assets/projects/guzellik-ozbekistan/04.jpg", "assets/projects/guzellik-ozbekistan/05.jpg", "assets/projects/guzellik-ozbekistan/06.jpg"]
  },
  {
    id: 15, cat: "ticari", catLabel: "Otel", tag: '',
    feat: 1, name: "Casa de Port Otel", loc: "Karaköy, İstanbul", type: "Butik Otel",
    img: "assets/projects/otel-karakoy/03.jpg",
    lead: "Aydınlatmalı yatak başlığı ve özenli banyo detaylarıyla Karaköy’de butik otel odaları.",
    body: ["Casa de Port Otel, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir butik otel projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/otel-karakoy/03.jpg", "assets/projects/otel-karakoy/01.jpg", "assets/projects/otel-karakoy/02.jpg", "assets/projects/otel-karakoy/04.jpg", "assets/projects/otel-karakoy/05.jpg", "assets/projects/otel-karakoy/06.jpg"]
  },
  {
    id: 16, cat: "ticari", catLabel: "Kuaför", tag: '',
    name: "Galata No:5 Kuaför", loc: "Galata, İstanbul", type: "Kuaför Salonu",
    img: "assets/projects/kuafor-galata/03.jpg",
    lead: "Endüstriyel çizgide, yeşil duvarlı karşılama alanına sahip kuaför salonu.",
    body: ["Galata No:5 Kuaför, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir kuaför salonu projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/kuafor-galata/03.jpg", "assets/projects/kuafor-galata/01.jpg", "assets/projects/kuafor-galata/02.jpg", "assets/projects/kuafor-galata/04.jpg", "assets/projects/kuafor-galata/05.jpg", "assets/projects/kuafor-galata/06.jpg"]
  },
  {
    id: 17, cat: "fb", catLabel: "Restoran", tag: '',
    feat: 1, name: "Restoran Projesi – Tacikistan", loc: "Tacikistan", type: "Restoran",
    img: "assets/projects/restoran-tacikistan/03.jpg",
    lead: "Palmiyeler, mavi banketler ve dikey bahçelerle zengin bir restoran atmosferi.",
    body: ["Restoran Projesi – Tacikistan, GD Mimarlık imzasıyla tasarlanmış ve hayata geçirilmiş bir restoran projesidir. Aşağıdaki galeriden projenin farklı mekânlarını inceleyebilirsiniz."],
    gallery: ["assets/projects/restoran-tacikistan/03.jpg", "assets/projects/restoran-tacikistan/01.jpg", "assets/projects/restoran-tacikistan/02.jpg", "assets/projects/restoran-tacikistan/04.jpg", "assets/projects/restoran-tacikistan/05.jpg", "assets/projects/restoran-tacikistan/06.jpg"]
  }
];

window.SERVICES = [
  { n: '01', t: 'Konut & Villa Tasarımı', d: 'Yaşam alanlarınızı kişiliğinize özel, estetik ve işlevsel mekânlara dönüştürüyoruz.', img: '1600607687939-ce8a6c25118c', checks: ['Yaşam tarzınıza özel plan', 'Doğal malzeme ve doku'] },
  { n: '02', t: 'Ofis & Ticari Alan', d: 'Çalışanların verimliliğini artıran, marka kimliğini yansıtan kurumsal mekânlar tasarlıyoruz.', img: '1497366216548-37526070297c', checks: ['Marka kimliğine uygun mekân', 'Verimli çalışma düzeni'] },
  { n: '03', t: 'Kafe & Restoran', d: 'Müşteri deneyimini merkeze alan, özgün konsept ve atmosferlerle F&B mekânları oluşturuyoruz.', img: '1517248135467-4c7edcad34c4', checks: ['Özgün konsept ve atmosfer', 'Akıcı müşteri deneyimi'] },
  { n: '04', t: 'Proje Yönetimi', d: 'Tasarımdan teslimata kadar tüm süreci şeffaf ve profesyonel biçimde yönetiyoruz.', img: '1503387762-592deb58ef4e' },
  { n: '05', t: '3D Görselleştirme', d: 'Projenizi hayata geçirmeden önce fotorealistik görseller ve sanal tur imkânı sunuyoruz.', img: '1618221195710-dd6b41faaea6' },
  { n: '06', t: 'Tadilat & Dekorasyon', d: 'Mevcut mekânlarınıza yeni bir soluk getiriyor, malzeme seçiminden uygulamaya destek sağlıyoruz.', img: '1600210492493-0946911123ea' }
];

window.NEWS = [
  {
    id: 0, cat: 'Tasarım Trendleri', date: '15 Mart 2025', read: '5 dk', img: 'assets/projects/guzellik-nisantasi/04.jpg',
    title: '2025 Mimari Tasarım Trendleri: Doğallık ve Sürdürülebilirlik Ön Planda',
    excerpt: 'Bu yıl mimarlık dünyasında doğal malzemeler, biyofilik tasarım ve sürdürülebilir çözümler öne çıkıyor.',
    body: [
      ['p', '2025 yılı mimarlık ve iç mimarlık dünyasında köklü bir dönüşümün habercisi. Bu yılın en belirgin eğilimi doğallık, sürdürülebilirlik ve biyofilik tasarım anlayışı.'],
      ['h', 'Doğal Malzemelerin Yükselişi'],
      ['p', 'Ham taş, işlenmemiş ahşap ve toprak tonları tasarımın merkezinde yer alıyor. Fabrikasyon ürünlerin yerini giderek daha fazla zanaat ürünleri ve yerel malzemeler alıyor.'],
      ['h', 'Biyofilik Tasarım'],
      ['p', 'İnsanın doğayla olan bağını yapılı çevreye taşıyan biyofilik tasarım ana akım bir yaklaşım haline geliyor: dikey bahçeler, iç avlular, doğal havalandırma ve bol gün ışığı alan açık planlar.'],
      ['p', 'GD Mimarlık olarak bu trendleri projelerimize entegre ederek hem estetiği hem de kullanıcı refahını ön planda tutmaya devam ediyoruz.']
    ]
  },
  {
    id: 1, cat: 'Proje Haberleri', date: '2 Mart 2025', read: '3 dk', img: 'assets/projects/gol-mahal/01.jpg',
    title: 'Göl Mahal Malikaneleri Projemiz Yayında',
    excerpt: 'Göl Mahal Malikaneleri projemizin uygulama fotoğraflarını portföyümüze ekledik.',
    body: [
      ['p', 'Göl Mahal Malikaneleri projemizin uygulama sonrası fotoğraflarını portföyümüze ekledik.'],
      ['h', 'Proje'],
      ['p', 'Şömineli salon, çalışma odası, gardırop koridoru ve merdiven hacmiyle baştan sona tasarladığımız malikânenin farklı mekânlarını Projeler bölümünden inceleyebilirsiniz.'],
      ['p', 'Portföyümüzdeki diğer konut, ofis ve ticari projelere de aynı sayfadan ulaşabilirsiniz.']
    ]
  },
  {
    id: 2, cat: 'İpuçları', date: '18 Şubat 2025', read: '4 dk', img: 'assets/projects/halkali-tema/03.jpg',
    title: 'Küçük Alanları Büyük Göstermenin 7 Yolu',
    excerpt: 'Sınırlı metrekareleri ferah ve işlevsel mekânlara dönüştüren pratik mimari çözümler.',
    body: [
      ['p', 'Küçük mekânlar doğru tasarım kararlarıyla hem ferah hem işlevsel hale gelebilir. Mimarlık pratiğimizden derlediğimiz temel ilkeler:'],
      ['h', '1. Renk ve Işık'],
      ['p', 'Açık renkler ve bol doğal ışık mekânı olduğundan büyük gösterir. Stratejik konumdaki aynalar ışığı çoğaltır.'],
      ['h', '2. Çok İşlevli Mobilya'],
      ['p', 'Açılır yemek masaları, depolamalı koltuklar ve katlanır çalışma masaları küçük mekânların en iyi dostudur.'],
      ['h', '3. Dikey Alanı Kullanın'],
      ['p', 'Tavana kadar uzanan raflar ve dolaplar depolama sorununu çözer, gözü yukarı çekerek tavan yüksekliği hissini artırır.']
    ]
  }
];

window.PROCESS = [
  ['Keşif', 'İhtiyaçlarınızı, bütçenizi ve mekânın potansiyelini birlikte netleştiriyoruz.'],
  ['Konsept', 'Fikir eskizleri, malzeme paleti ve mekân kurgusunu sunuyoruz.'],
  ['Tasarım', 'Detaylı mimari proje, 3D görseller ve uygulama çizimlerini hazırlıyoruz.'],
  ['Uygulama', 'Şantiye koordinasyonu, kalite kontrol ve süreç yönetimini üstleniyoruz.'],
  ['Teslim', 'Her ayrıntı tamamlanır; mekânınız anahtar teslim kullanıma hazır olur.']
];
