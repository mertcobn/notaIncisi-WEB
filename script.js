// Menü toggle işlevi
document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Menü öğelerine tıklandığında menüyü kapat
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Smooth scroll için offset ayarı
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerHeight = document.querySelector('header').offsetHeight;
        
        let scrollPosition;
        if (targetId === '#anasayfa' || targetId === '#galeri') {
            const targetElement = targetId === '#galeri' ? 
                document.querySelector('.galeri-kismi') : 
                document.querySelector('.dersler-kismi');
            scrollPosition = targetElement.offsetTop - headerHeight;
        } else {
            scrollPosition = targetSection.offsetTop - headerHeight;
        }
        
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    });
});

// Aktif navigasyon öğesini işaretleme fonksiyonu
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('header').offsetHeight;
    const viewportMiddle = window.innerHeight / 2;
    let currentSection = '';

    // Galeri ve Atölyeler için kontrol
    const galeriSection = document.querySelector('.galeri-kismi');
    const derslerSection = document.querySelector('.dersler-kismi');
    const egitmenlerSection = document.querySelector('#egitmenler');
    
    if (galeriSection && derslerSection) {
        const galeriRect = galeriSection.getBoundingClientRect();
        const derslerRect = derslerSection.getBoundingClientRect();
        const egitmenlerRect = egitmenlerSection.getBoundingClientRect();
        
        // Önce galeri ve atölyeleri kontrol et
        if (galeriRect.top < viewportMiddle && galeriRect.bottom > 0 && egitmenlerRect.top > viewportMiddle) {
            currentSection = 'galeri';
        } else if (derslerRect.top < viewportMiddle && derslerRect.bottom > 0 && galeriRect.top > viewportMiddle) {
            currentSection = 'anasayfa';
        }
    }

    // Eğer galeri veya atölye seçili değilse, diğer bölümleri kontrol et
    if (!currentSection) {
        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < viewportMiddle && rect.bottom > 0) {
                const sectionId = section.getAttribute('id');
                if (sectionId !== 'anasayfa') {
                    currentSection = sectionId;
                }
            }
        });
    }
    
    // Aktif linki güncelle
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Slider fonksiyonları
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Noktaları oluştur
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
    
    // İlk slaytı göster
    slides[0].classList.add('active');
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }
    
    // Otomatik geçişi resetle
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
        resetAutoSlide();
    });
    
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
        resetAutoSlide();
    });
    
    // Slider container'a tıklama
    document.querySelector('.slider-container').addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    // Otomatik geçiş başlat
    resetAutoSlide();
}

// Sayfa yüklendiğinde ve scroll edildiğinde kontrol et
window.addEventListener('load', () => {
    setActiveNavLink();
    initSlider();
});
window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('resize', setActiveNavLink);

// Sağ tıklama ve kısayol tuşlarını engelle
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

document.addEventListener('keydown', function(e) {
    // CTRL+S / Command+S engelle
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
        e.preventDefault();
    }
    // CTRL+U / Command+U engelle
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
        e.preventDefault();
    }
    // CTRL+SHIFT+I / Command+Option+I engelle
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
    }
}); 