import Scrollbar from '../../../node_modules/smooth-scrollbar'
import {headerBurger} from './header'

const tabs = document.querySelectorAll("._tabs")
const tabsMoreButtons = document.querySelectorAll('.tab-portfolio__btn')
const tabsMoreModal = document.querySelector('.modal-portfolio')
const navPortfolioItems = document.querySelectorAll('.nav-portfolio__item')
const portfolioTabs = document.querySelectorAll('.portfolio__tab')
const body = document.body

let srcPath = ''

if (portfolioTabs.length > 0) {
    Scrollbar.initAll()
    if (window.innerWidth > 768) {
        if (localStorage.activeTabIdx !== 0) {
            portfolioTabs.forEach((e, idx) => {
                e.classList.remove('active')
            })
            portfolioTabs[localStorage.activeTabIdx].classList.add('active')
            navPortfolioItems.forEach((e, idx) => {
                e.classList.remove('active')
            })
            navPortfolioItems[localStorage.activeTabIdx].classList.add('active')
        }
        for (let index = 0; index < tabs.length; index++) {
            let tab = tabs[index];
            let tabs_items = tab.querySelectorAll("._tabs-item");
            let tabs_blocks = tab.querySelectorAll("._tabs-block");
            for (let index = 0; index < tabs_items.length; index++) {
                let tabs_item = tabs_items[index];
                tabs_item.addEventListener("click", function (e) {
                    localStorage.setItem('activeTabIdx', index)
                    for (let index = 0; index < tabs_items.length; index++) {
                        let tabs_item = tabs_items[index];
                        tabs_item.classList.remove('active');
                        tabs_blocks[index].classList.remove('active');
                    }
                    document.querySelector('.scroll-content').style.transform = 'translate3d(0,0,0)'
                    tabs_item.classList.add('active');
                    tabs_blocks[index].classList.add('active');
                    e.preventDefault();
                });
            }
        }
    }
    tabsMoreButtons.forEach(e => {
        e.addEventListener('click', () => {
            headerBurger.classList.add('active')
            srcPath = e.getAttribute('data-src-path')
            let tabsMoreModalIframe = tabsMoreModal.querySelector('iframe')
            tabsMoreModalIframe.setAttribute('src', `https://drive.google.com/file/d/${srcPath}/preview`)
            tabsMoreModal.classList.add('active')
            body.classList.add('lock')
        })
    })
    tabsMoreModal.addEventListener('click', (e) => {
        if (e.target.tagName !== 'iframe') {
            tabsMoreModal.classList.remove('active')
            body.classList.remove('lock')
        }
    })
    headerBurger.addEventListener('click', () => {
        if (tabsMoreModal.classList.contains('active')) {
            tabsMoreModal.classList.remove('active')
            headerBurger.classList.remove('active')
            body.classList.remove('lock')
        }
    })
}