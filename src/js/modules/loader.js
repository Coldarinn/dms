const loader = document.querySelector('.loader')

if (loader) {
    document.querySelector('body').classList.add('lock')

    setTimeout(() => {
        document.body.removeChild(loader)
        document.querySelector('body').classList.remove('lock')
    }, 6300)
}