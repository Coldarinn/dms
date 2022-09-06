import Swiper, {Pagination, Navigation, Mousewheel, Thumbs, EffectFade} from 'swiper'

const hieroglyphs = document.querySelector('.hieroglyphs')
export const office = document.querySelector('.office')
const officeContainer = document.querySelector('.office__container')
const officeFooter = document.querySelector('.footer-office')
const aboutBody = document.querySelector('.about__body')
export const headerServicesItem = document.querySelector('.header-services-link')
export const headerAboutItem = document.querySelector('.header-about-link')

export let newGalleryOfficeSlider
export let sliderPackages
export let sliderCategoriesTechnology
export let sliderTechnologyTechnology
export let sliderVacancy

Swiper.use([Pagination, Mousewheel, Navigation, Thumbs, EffectFade])

export let mainSlider
if (window.innerWidth > 768) {
    mainSlider = new Swiper(".slider", {
        speed: 1000,
        mousewheel: true,
        simulateTouch: false,
        pagination: {
            el: ".swiper-scrollbar",
            type: "progressbar",
        },
        on: {
            slideChange() {
                if (this.isEnd) {
                    hieroglyphs.classList.add('translate')
                } else {
                    hieroglyphs.classList.remove('translate')
                }
                if (this.snapIndex >= 1) {
                    document.querySelector('.slider .swiper-wrapper').style.zIndex = '1'
                    hieroglyphs.classList.add('scrolled')
                }
                if (this.snapIndex === 0) {
                    hieroglyphs.classList.remove('scrolled')
                    setTimeout(() => {
                        document.querySelector('.slider .swiper-wrapper').style.zIndex = '-1'
                    }, 1000)
                }
            }
        },
        breakpoints: {
            320: {
                direction: 'vertical',
                simulateTouch: true,
            },
            769: {
                direction: 'horizontal',
            }
        }
    })
    if (officeContainer) {
        officeContainer.addEventListener('mouseenter', () => {
            mainSlider.mousewheel.disable()
        })
        officeContainer.addEventListener('mouseleave', () => {
            mainSlider.mousewheel.enable()
        })
        officeFooter.addEventListener('mouseenter', () => {
            mainSlider.mousewheel.disable()
        })
        officeFooter.addEventListener('mouseleave', () => {
            mainSlider.mousewheel.enable()
        })
    }
    if (aboutBody) {
        aboutBody.addEventListener('mouseenter', () => {
            mainSlider.mousewheel.disable()
        })
        aboutBody.addEventListener('mouseleave', () => {
            mainSlider.mousewheel.enable()
        })
    }
}

let galleryOfficeThumbs = new Swiper(".gallery-office__thumbs", {
    spaceBetween: 10,
    slidesPerView: 3,
    slidesPerGroup: 3,
    pagination: {
        el: '.gallery-office__pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            return '0' + current + '/' + '0' + (total);
        }
    },
    navigation: {
        nextEl: ".gallery-office__btn--next",
        prevEl: ".gallery-office__btn--prev",
    },
})
let galleryOfficeSlider = new Swiper(".gallery-office__slider", {
    effect: "fade",
    thumbs: {
        swiper: galleryOfficeThumbs,
    }
});

if (window.innerWidth < 993) {
    if (document.querySelector('.gallery-office__thumbs')) {
        galleryOfficeSlider.destroy()
    }
    newGalleryOfficeSlider = new Swiper(".gallery-office__slider", {
        slidesPerView: "auto",
        spaceBetween: 20
    })
    sliderCategoriesTechnology = new Swiper('.slider-categories-technology', {
        slidesPerView: 'auto',
        spaceBetween: 50,
    })
    sliderTechnologyTechnology = new Swiper('.slider-technology-technology', {
        slidesPerView: 'auto',
        spaceBetween: 18,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        loop: false
    })
}

new Swiper(".portfolio__slider", {
    direction: "vertical",
    navigation: {
        nextEl: ".nav-portfolio__arrow--next",
        prevEl: ".nav-portfolio__arrow--prev",
    },
    pagination: {
        el: ".nav-portfolio__pagination",
        type: "fraction",
    },
});

if (window.innerWidth < 1141) {
    sliderPackages = new Swiper('.slider-packages', {
        slidesPerView: "auto",
        spaceBetween: 40,
    })
    sliderVacancy = new Swiper('.slider-vacancy', {
        slidesPerView: "auto",
        spaceBetween: 40,
    })
}

if (window.innerWidth > 768) {
    headerServicesItem.addEventListener('click', (e) => {
        e.preventDefault()
        if (document.querySelector('.slider')) {
            mainSlider.slideTo(1);
        }
    })

    headerAboutItem.addEventListener('click', (e) => {
        e.preventDefault()
        if (document.querySelector('.slider')) {
            mainSlider.slideTo(4);
        }
    })
}
