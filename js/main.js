// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}

// SLIDER BLOCK

const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
let index = 0

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.style.opacity = 0
        slide.classList.remove('active_slide')
    })
}
const showSlide = (i = 0) => {
    slides[i].style.opacity = 1
    slides[i].classList.add('active_slide')
}

hideSlide()
showSlide(index)


let sliderInterval

const startAutoSlider = () => {
    sliderInterval = setInterval(() => {
        index++
        if (index > slides.length - 1) {
            index = 0
        }
        hideSlide()
        showSlide(index)
    }, 5000)
}

startAutoSlider()

next.onclick = () => {
    index < slides.length - 1 ? index++ : index = 0
    hideSlide()
    showSlide(index)
}

prev.onclick = () => {
    index > 0 ? index-- : index = slides.length - 1
    hideSlide()
    showSlide(index)
}

const modal = document.querySelector('.modal')
const closeBtn = document.querySelector('.modal_close')

let isModalShown = false

const showModal = () => {
    modal.style.display = 'block'
}

const hideModal = () => {
    modal.style.display = 'none'
}

closeBtn.onclick = hideModal

const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight && !isModalShown) {
        showModal()
        isModalShown = true
        window.removeEventListener('scroll', handleScroll)
    }
}

window.addEventListener('scroll', handleScroll)

setTimeout(() => {
    if (!isModalShown) {
        showModal()
        isModalShown = true
    }
}, 10000)

