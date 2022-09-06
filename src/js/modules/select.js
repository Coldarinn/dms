import {Select} from "./select-plugin"

let body = document.querySelector('body')
let selectedId = body.classList.contains('ru') ? '1' : '2'
const select1 = new Select('.locale-header', {
    selectedId,
    data: [
        {id: '1', value: 'ru'},
        {id: '2', value: 'en'},
    ],
})