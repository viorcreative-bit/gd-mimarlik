const U = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=78`;

window.PROJECTS = [
  {
    id: 0, cat: 'konut', catLabel: 'Konut', tag: 'Yeni',
    name: 'Boğaz Manzaralı Villa', loc: 'Beykoz, İstanbul', year: '2024',
    area: '480 m²', status: 'Tamamlandı', duration: '14 Ay', type: 'Özel Konut',
    img: '1583847268964-b28dc8f51f92',
    lead: 'Doğal taş ve ahşabın modern çizgilerle buluştuğu, Boğaz siluetine açılan özel rezidans.',
    body: [
      'Boğaz manzarasına hâkim bu özel rezidans projesi, doğal taş ve ahşap detayların modern çizgilerle buluştuğu özgün bir tasarım anlayışıyla hayata geçirildi. 480 m² kullanım alanına sahip yapı, her odadan Boğaz\'ı yakalıyor.',
      'Mekânların Boğaz silüetiyle bütünleşmesi hedeflenerek büyük cam yüzeyler ve terasa açılan kayar kapı sistemleri tasarlandı. İç mekânda kullanılan doğal taş ve işleme ahşap, dış cephenin dokusuyla örtüşüyor.',
      'Aydınlatma planlaması Boğaz gün batımından maksimum verim alacak şekilde kurgulandı. Gece ise özenle tasarlanmış accent aydınlatma sistemi mekâna sıcak bir atmosfer katıyor.'
    ],
    gallery: ['1600566752355-35792bedcfea', '1600210492493-0946911123ea', '1618221195710-dd6b41faaea6', '1600607687939-ce8a6c25118c', '1600566753190-17f0baa2a6c3']
  },
  {
    id: 1, cat: 'ofis', catLabel: 'Ofis', tag: 'Ödüllü',
    name: 'Kurumsal Merkez Ofis', loc: 'Maslak, İstanbul', year: '2024',
    area: '1200 m²', status: 'Tamamlandı', duration: '8 Ay', type: 'Kurumsal Ofis',
    img: '1497366216548-37526070297c',
    lead: '200 kişilik açık ofis planı; odaklanma, iş birliği ve marka kimliği tek bir kurguda.',
    body: [
      '200 kişi kapasiteli bu kurumsal ofis projesinde açık ofis planlaması, odaklanma alanları ve kolaborasyon bölgelerinin dengeli kurgulanması esas alındı. Marka kimliği tasarımın her katmanına entegre edildi.',
      'LEED Gold hedefiyle tasarlanan projede enerji verimliliği yüksek cam sistemler, gün ışığı optimizasyonu ve akıllı bina sistemleri kullanıldı. Geri dönüştürülmüş malzemeler iç mekân tasarımının önemli bir parçası oldu.'
    ],
    gallery: ['1497366216548-37526070297c', '1524758631624-e2822e304c36', '1531971589569-0d9370cbe1e5', '1504307651254-35680f356dfd']
  },
  {
    id: 2, cat: 'fb', catLabel: 'Kafe', tag: '',
    name: 'Butik Kafe & Lounge', loc: 'Karaköy, İstanbul', year: '2023',
    area: '180 m²', status: 'Tamamlandı', duration: '4 Ay', type: 'Kafe & Lounge',
    img: '1445116572660-236099ec97a0',
    lead: 'Karaköy\'ün tarihi dokusundan ilham alan, endüstriyel ve organik dilin buluşması.',
    body: [
      'Karaköy\'ün tarihi dokusundan ilham alan bu butik kafe projesi, endüstriyel ve organik tasarım dillerini harmanlayarak özgün bir atmosfer yaratıyor. 180 m²\'lik alanda maksimum oturma konforu ve verimli bir trafik akışı sağlandı.',
      'Ham beton, pirinç aksesuarlar ve yeşil duvar uygulamalarının bir araya geldiği mekânda farklı oturma konfigürasyonları sunuluyor. Doğal ve yapay aydınlatma gün boyu farklı bir sahne kuruyor.'
    ],
    gallery: ['1556761175-5973dc0f32e7', '1556909114-f6e7ad7d3136', '1445116572660-236099ec97a0']
  },
  {
    id: 3, cat: 'konut', catLabel: 'Konut', tag: '',
    name: 'Lüks Rezidans Dairesi', loc: 'Nişantaşı, İstanbul', year: '2023',
    area: '260 m²', status: 'Tamamlandı', duration: '6 Ay', type: 'Rezidans',
    img: '1600210492493-0946911123ea',
    lead: 'Çağdaş minimalizm ile Art Deco referanslarının zarif buluşması.',
    body: [
      'Nişantaşı\'nın kalbinde konumlanan bu lüks rezidans, çağdaş minimalizm ile Art Deco referanslarını buluşturan zarif bir tasarım anlayışına sahip. Özel tasarım mobilyalar ve seçkin sanat eserleri mekânı tamamlıyor.'
    ],
    gallery: ['1618221195710-dd6b41faaea6', '1600607687939-ce8a6c25118c', '1600566753190-17f0baa2a6c3']
  },
  {
    id: 4, cat: 'fb', catLabel: 'Restoran', tag: '',
    name: 'Fine Dining Restoran', loc: 'Etiler, İstanbul', year: '2023',
    area: '320 m²', status: 'Tamamlandı', duration: '5 Ay', type: 'Fine Dining · 90 kişi',
    img: '1517248135467-4c7edcad34c4',
    lead: 'Gastronomi deneyimini bir sahne kurgusuna dönüştüren akustik ve ışık tasarımı.',
    body: [
      'Etiler\'de yer alan bu fine dining mekânı, gastronomi deneyimini bir sanat performansına dönüştüren sahne kurgusuyla tasarlandı. Akustik konfor, aydınlatma rejimi ve özel ahşap detaylar ortamın kalitesini belirliyor.'
    ],
    gallery: ['1517248135467-4c7edcad34c4', '1504307651254-35680f356dfd', '1517248135467-4c7edcad34c4']
  },
  {
    id: 5, cat: 'konut', catLabel: 'Villa', tag: 'Yeni',
    name: 'Modern Pool Villa', loc: 'Bodrum', year: '2025',
    area: '550 m²', status: 'Devam Ediyor', duration: '18 Ay', type: 'Villa',
    img: '1600566752355-35792bedcfea',
    lead: 'Sonsuzluk havuzu ve panoramik teraslarla doğayla bütünleşen yaşam alanı.',
    body: [
      'Bodrum\'un eşsiz manzarasına açılan bu modern villa, sonsuzluk havuzu ve panoramik teraslarıyla doğayla bütünleşik bir yaşam alanı sunuyor. Sürdürülebilir mimari prensipler ve yerel malzemeler esas alındı.'
    ],
    gallery: ['1583847268964-b28dc8f51f92', '1600585154340-be6161a56a0c', '1600585154340-be6161a56a0c']
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
    id: 0, cat: 'Tasarım Trendleri', date: '15 Mart 2025', read: '5 dk', img: '1503387762-592deb58ef4e',
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
    id: 1, cat: 'Proje Haberleri', date: '2 Mart 2025', read: '3 dk', img: '1583847268964-b28dc8f51f92',
    title: 'Boğaz Manzaralı Villa Projemiz Başarıyla Tamamlandı',
    excerpt: 'Beykoz\'da hayata geçirdiğimiz özel villa projemiz müşterimize teslim edildi.',
    body: [
      ['p', '14 aylık yoğun bir tasarım ve uygulama sürecinin ardından Beykoz\'daki Boğaz Manzaralı Villa projemiz tamamlanarak sahibine teslim edildi.'],
      ['h', 'Proje Süreci'],
      ['p', '480 m² kullanım alanına sahip bu özel konut projesinde, müşterimizin Boğaz manzarasını her odadan yakalama isteği tasarımın ana motorunu oluşturdu. Büyük cam yüzeyler, sürgülü kapılar ve panoramik teraslar bu hedefe hizmet etti.'],
      ['p', 'Projenin tüm görsellerine Projeler bölümünden ulaşabilirsiniz.']
    ]
  },
  {
    id: 2, cat: 'İpuçları', date: '18 Şubat 2025', read: '4 dk', img: '1524758631624-e2822e304c36',
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
