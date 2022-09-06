const linksFooterMarker = document.querySelector('.links-footer__marker')
const linksFooterItems = document.querySelectorAll('.links-footer__item')

function indicator(e) {
    if (e.classList.contains('links-footer__item--first')) {
        linksFooterMarker.classList.add('active-left')
    } else {
        linksFooterMarker.classList.remove('active-left')
    }
    if (e.classList.contains('links-footer__item--last')) {
        linksFooterMarker.classList.add('active-right')
    } else {
        linksFooterMarker.classList.remove('active-right')
    }
    linksFooterMarker.style.left = e.offsetLeft + 'px'
    linksFooterMarker.style.width = e.offsetWidth + 'px'
    linksFooterMarker.style.opacity = '1'
}

linksFooterItems.forEach(e => {
    e.addEventListener('mouseenter', (event) => {
        indicator(event.target)
    })
    e.addEventListener('mouseleave', (event) => {
        linksFooterMarker.style.opacity = '0'
    })
})