import {headerBody, headerBurger} from "./header";
import {
    mainSlider,
    newGalleryOfficeSlider,
    sliderPackages,
    sliderCategoriesTechnology,
    sliderTechnologyTechnology,
    sliderVacancy
} from "./slider";

const header = document.querySelector('.header')
const mainTabs = document.querySelectorAll('.main-tab')
const navPortfolioItems = document.querySelectorAll('.nav-portfolio__item')
const tabsPortfolio = document.querySelectorAll('.tab-portfolio')
const hashItems = document.querySelectorAll('[data-hash]')
const swiperScrollbar = document.querySelector('.swiper-scrollbar')
const hieroglyphs = document.querySelectorAll('.hieroglyphs')

const reSliders = () => {
    if (window.innerWidth < 993) {
        newGalleryOfficeSlider.update()
        sliderCategoriesTechnology.update()
        sliderTechnologyTechnology.update()
    }
    if (window.innerWidth > 768) {
        mainSlider.update()
    }
    if (window.innerWidth < 769) {
        sliderPackages.update()
        sliderVacancy.update()
    }
}

const redirect = () => {
    let initHash = window.location.hash
    switch (initHash) {
        case '' :
            tabsDisplay(mainTabs[0])
            swiperScrollbar.style.display = 'block'
            break
        case '#portfolio':
            tabsDisplay(mainTabs[1])
            swiperScrollbar.style.display = 'none'
            break
        case '#vacancy':
            tabsDisplay(mainTabs[2])
            swiperScrollbar.style.display = 'none'
            break
        default:
            tabsDisplay(mainTabs[0])
            swiperScrollbar.style.display = 'block'
            break
    }
}

const tabsDisplay = (activeTab) => {
    mainTabs.forEach(tab => {
        tab.style.display = 'none'
    })
    activeTab.style.display = 'block'
    reSliders()
}

window.onload = () => {
    redirect()
    hieroglyphs.forEach(el => {
        el.classList.add('show')
        setTimeout(() => {
            el.classList.remove('show')
        }, 9000)
    })
    swiperScrollbar.classList.add('show')
    setTimeout(() => {
        swiperScrollbar.classList.remove('show')
    }, 7200)

}

window.onhashchange = () => {
    redirect()
}

if (!localStorage.activeTabIdx) {
    localStorage.setItem('activeTabIdx', 0)
}

hashItems.forEach(item => {
    item.addEventListener('click', () => {
        header.classList.remove('active')
        headerBody.classList.remove('active')
        headerBurger.classList.remove('active')
        headerBurger.classList.remove('hide')
        document.body.classList.remove('lock')
        if (item.classList.contains('item-info-intro')) {
            localStorage.setItem('activeTabIdx', item.getAttribute('data-idx'))
            navPortfolioItems.forEach((item, idx) => {
                item.classList.remove('active')
                tabsPortfolio[idx].classList.remove('active')
            })
            navPortfolioItems[localStorage.activeTabIdx].classList.add('active')
            tabsPortfolio[localStorage.activeTabIdx].classList.add('active')
            console.log(localStorage.activeTabIdx)
        }
        window.location.hash = item.getAttribute('data-hash')
    })
})