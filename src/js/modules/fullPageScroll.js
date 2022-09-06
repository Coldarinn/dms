import {swiperScrollbarItem} from "./header";

if (document.querySelector('.fullpage')) {
    if ($(window).width() < 769) {
        $('.fullpage').fullpage({
            scrollOverflow: true,
            dragAndMove: true,
            onLeave: function (index, nextIndex, direction) {
                if (swiperScrollbarItem) {
                    swiperScrollbarItem.style.height = `${nextIndex * 25}%`
                }
            }
        });
    }
}