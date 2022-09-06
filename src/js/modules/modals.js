import {headerBurger} from './header'
import {Select} from "./select-plugin"

const phoneModalButtons = document.querySelectorAll('.phone-modal-button')
const phoneModal = document.querySelector('.phone-modal')
const OrderModalButtons = document.querySelectorAll('.order-modal-button')
const orderModal = document.querySelector('.order-modal')
const body = document.body

if (phoneModalButtons) {
    phoneModalButtons.forEach(e => {
        e.addEventListener('click', () => {
            phoneModal.classList.add('active')
            body.classList.add('lock')
            headerBurger.classList.add('active')
        })
    })

    phoneModal.addEventListener('click', (e) => {
        if (!e.target.closest('.phone-modal__body')) {
            phoneModal.classList.remove('active')
            body.classList.remove('lock')
            headerBurger.classList.remove('active')
        }
    })

    headerBurger.addEventListener('click', () => {
        phoneModal.classList.remove('active')
    })
}

if (OrderModalButtons) {
    let select2 = null
    OrderModalButtons.forEach((e, i) => {
        e.addEventListener('click', () => {
            if (select2) {
                select2.destroy()
            }
            let body = document.querySelector('body')
            let lang = body.classList.contains('ru') ? '1' : '2'
            select2 = lang === '1' ? new Select('.form-order-modal__select', {
                selectedId: `${i + 1}`,
                data: [
                    {id: '1', value: 'Разработка сайта'},
                    {id: '2', value: 'Разработка мобильного приложения'},
                    {id: '3', value: 'Дизайн и брендинг'},
                    {id: '4', value: 'Другое'},
                ],
            }) : new Select('.form-order-modal__select', {
                selectedId: `${i + 1}`,
                data: [
                    {id: '1', value: 'WEBSITE DEVELOPMENT'},
                    {id: '2', value: 'MOBILE APPLICATIONS'},
                    {id: '3', value: 'Design and branding'},
                    {id: '4', value: 'OTHER'},
                ],
            })
            orderModal.classList.add('active')
            body.classList.add('lock')
            headerBurger.classList.add('active')
        })
    })

    orderModal.addEventListener('click', (e) => {
        if (!e.target.closest('.order-modal__body')) {
            orderModal.classList.remove('active')
            body.classList.remove('lock')
            headerBurger.classList.remove('active')
        }
    })

    headerBurger.addEventListener('click', () => {
        orderModal.classList.remove('active')
    })
}