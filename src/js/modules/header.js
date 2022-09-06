import {headerServicesItem, headerAboutItem} from './slider'

const header = document.querySelector('.header')
const headerOverlay = document.querySelector('.header__overlay')
export const headerBurger = document.querySelector('.header__burger')
export const headerBody = document.querySelector('.header__body')
export const swiperScrollbarItem = document.querySelector('.swiper-scrollbar__item')


const setHeight = () => {
    swiperScrollbarItem.style.height = '25%'
}

setTimeout(() => {
    const selectItems = document.querySelector('.locale-header').querySelectorAll('.select__item')
    selectItems.forEach((e) => {
        e.addEventListener("click", () => {
            if (e.getAttribute("data-id") === '1') {
                document.location.pathname = '/'
            }
            if (e.getAttribute("data-id") === '2') {
                document.location.pathname = '/index-en.html'
            }
        })
    })
})


function removeClasses() {
    header.classList.remove('active')
    headerBody.classList.remove('active')
    headerBurger.classList.remove('active')
    headerBurger.classList.remove('hide')
    document.body.classList.remove('lock')
}

headerBurger.addEventListener('click', () => {
    if (headerBurger.classList.contains('active')) {
        removeClasses()
    } else {
        header.classList.add('active')
        headerBody.classList.add('active')
        headerBurger.classList.add('active')
        headerBurger.classList.add('hide')
        document.body.classList.add('lock')
    }
})

if (window.innerWidth < 769) {
    if (swiperScrollbarItem) {
        setHeight()
    }
    headerServicesItem.addEventListener('click', (e) => {
        e.preventDefault()
        if (swiperScrollbarItem) {
            removeClasses()
            $('.fullpage').fullpage.moveTo(2, 0);
        }
    })
    headerAboutItem.addEventListener('click', (e) => {
        e.preventDefault()

        if (swiperScrollbarItem) {
            removeClasses()
            $('.fullpage').fullpage.moveTo(4, 0);
        }
    })

    if (swiperScrollbarItem) {
        window.addEventListener('scroll', () => {
            setHeight()
        })
    }
    headerOverlay.addEventListener('click', () => {
        removeClasses()
    })
}