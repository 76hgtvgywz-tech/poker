// Основные скрипты для сайта PokerDom

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация слайдера
    initSlider();
    
    // Инициализация аккордеона FAQ
    initAccordion();
    
    // Создание анимации падающих долларов
    initDollarAnimation();
    
    // Обработка кликов по кнопкам с партнерской ссылкой
    initAffiliateLinks();
    
    // Плавная прокрутка для якорных ссылок
    initSmoothScroll();
    
    // Выделение активной страницы в меню
    highlightActivePage();
});

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainMenu = document.getElementById('mainMenu');
    
    if (mobileMenuBtn && mainMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        const menuLinks = mainMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(event) {
            if (!mainMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// Слайдер
function initSlider() {
    const slider = document.getElementById('imageSlider');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!slider || dots.length === 0) return;
    
    const slides = slider.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;
    
    // Функция показа определенного слайда
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Обработчики для точек слайдера
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            resetSlideInterval();
        });
    });
    
    // Функция для автоматического переключения слайдов
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    // Сброс интервала при ручном переключении
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Инициализация
    showSlide(0);
    startSlideInterval();
    
    // Остановка автоматического переключения при наведении
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Возобновление автоматического переключения при уходе курсора
    slider.addEventListener('mouseleave', () => {
        startSlideInterval();
    });
}

// Аккордеон для FAQ
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Закрытие всех открытых элементов аккордеона
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключение текущего элемента
            item.classList.toggle('active');
        });
    });
}

// Анимация падающих долларов
function initDollarAnimation() {
    const dollarBackground = document.getElementById('dollarBackground');
    
    if (!dollarBackground) return;
    
    // Создание одного доллара
    function createDollar() {
        const dollar = document.createElement('div');
        dollar.classList.add('dollar');
        dollar.textContent = '$';
        
        // Случайная позиция по горизонтали
        dollar.style.left = Math.random() * 100 + 'vw';
        
        // Случайный размер
        const size = Math.random() * 20 + 15;
        dollar.style.fontSize = size + 'px';
        
        // Случайная прозрачность
        dollar.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Случайная скорость падения
        const duration = Math.random() * 5 + 3;
        dollar.style.animationDuration = duration + 's';
        
        // Случайная задержка начала анимации
        dollar.style.animationDelay = Math.random() * 2 + 's';
        
        dollarBackground.appendChild(dollar);
        
        // Удаление элемента после завершения анимации
        setTimeout(() => {
            if (dollar.parentNode === dollarBackground) {
                dollarBackground.removeChild(dollar);
            }
        }, (duration + 2) * 1000);
    }
    
    // Создание начальных долларов
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createDollar(), i * 300);
    }
    
    // Создание новых долларов с интервалом
    setInterval(createDollar, 300);
    
    // Создание дополнительных долларов при движении мыши
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.97) {
            createDollar();
        }
    });
}

// Обработка партнерских ссылок
function initAffiliateLinks() {
    const affiliateLinks = document.querySelectorAll('a[href*="pdmlinktwo.xyz"]');
    
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Для внутренних страниц обрабатываем нормально
            if (this.getAttribute('href').includes('.html')) {
                return;
            }
            
            // Для внешних ссылок показываем подтверждение и открываем в новом окне
            e.preventDefault();
            
            const isBonusLink = this.textContent.includes('бонус') || this.classList.contains('btn');
            const message = isBonusLink 
                ? 'Вы будете перенаправлены на официальный сайт PokerDom для получения бонуса'
                : 'Вы будете перенаправлены на официальный сайт PokerDom';
            
            if (confirm(message)) {
                window.open(this.href, '_blank');
            }
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрытие мобильного меню после клика
                const mainMenu = document.getElementById('mainMenu');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                
                if (mainMenu && mainMenu.classList.contains('active')) {
                    mainMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
}

// Выделение активной страницы
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('nav a');
    
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (linkPage === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        }
    });
}

// Валидация форм
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4757';
                    
                    // Создание сообщения об ошибке
                    let errorMsg = field.nextElementSibling;
                    
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#ff4757';
                        errorMsg.style.fontSize = '0.9rem';
                        errorMsg.style.marginTop = '5px';
                        field.parentNode.appendChild(errorMsg);
                    }
                    
                    errorMsg.textContent = 'Это поле обязательно для заполнения';
                } else {
                    field.style.borderColor = '';
                    
                    // Удаление сообщения об ошибке
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля');
            }
        });
    });
}

// Обратный отсчет для акций
function initCountdown() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements.forEach(element => {
        const endDate = new Date(element.getAttribute('data-end')).getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = endDate - now;
            
            if (timeLeft < 0) {
                element.innerHTML = '<span class="countdown-ended">Акция завершена</span>';
                return;
            }
            
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            element.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-value">${days}</span>
                    <span class="countdown-label">дней</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${hours}</span>
                    <span class="countdown-label">часов</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${minutes}</span>
                    <span class="countdown-label">минут</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${seconds}</span>
                    <span class="countdown-label">секунд</span>
                </div>
            `;
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
}