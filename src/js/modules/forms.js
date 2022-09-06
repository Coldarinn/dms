// $("#phone").mask('+7 (999) 999 - 99 - 99');

$('.form-phone-modal').submit(function (e) {
    e.preventDefault();
    let th = $(this);
    let formThank = $('.phone-modal__thank');
    th.addClass('sending');
    $.ajax({
        url: "mail.php",
        type: "POST",
        data: th.serialize(),
        success: function (data) {
            if (data == 1) {
                th.removeClass('sending');
                alert('Введите корректный Email!');
                return false;
            } else {
                th.removeClass('sending');
                formThank.addClass('active');
                th.trigger('reset');
                setTimeout(function () {
                    formThank.removeClass('active');
                }, 2500)
            }
        }, error: function () {
            th.removeClass('sending');
            alert('Ошибка отправки :(')
        }
    })
    return false;
})

$('.form-order-modal').submit(function (e) {
    e.preventDefault();
    let th = $(this);
    let formThank = $('.order-modal__thank');
    th.addClass('sending');
    let formOrderModalCategoryInput = $('.form-order-modal__category');
    let formOrderModalCategorySelect = th.find('.select span');
    let categoryValue = formOrderModalCategorySelect.text();
    formOrderModalCategoryInput.val(categoryValue);
    $.ajax({
        url: "mailsec.php",
        type: "POST",
        data: th.serialize(),
        success: function (data) {
            if (data == 1) {
                th.removeClass('sending');
                alert('Введите корректный Email!');
                return false;
            } else {
                th.removeClass('sending');
                formThank.addClass('active');
                th.trigger('reset');
                setTimeout(function () {
                    formThank.removeClass('active');
                }, 2500)
            }
        }, error: function () {
            th.removeClass('sending');
            alert('Ошибка отправки :(')
        }
    })
    return false;
})