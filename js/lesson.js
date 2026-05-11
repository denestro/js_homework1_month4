const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996\d{9}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}




const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabContentItems = document.querySelectorAll('.tab_content_item')
const tabContentItemsParent = document.querySelector('.tab_content_items')

let currentIndex = 0

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })

    tabContentItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'flex'
    tabContentItems[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabContentItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {

        tabContentItems.forEach((item, index) => {

            if (event.target === item) {
                currentIndex = index

                hideTabContent()
                showTabContent(index)
            }
        })
    }
}




setInterval(() => {

    currentIndex++

    if (currentIndex >= tabContentBlocks.length) {
        currentIndex = 0
    }

    hideTabContent()
    showTabContent(currentIndex)

}, 5000)


const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = () => {

        const request = new XMLHttpRequest()
        request.open('GET', '../data/converter.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () => {

            const data = JSON.parse(request.response)

            if (element.id === 'som') {
                targetElement1.value = (element.value / data.usd).toFixed(2)
                targetElement2.value = (element.value / data.eur).toFixed(2)
            }

            if (element.id === 'usd') {
                targetElement1.value = (element.value * data.usd).toFixed(2)
                targetElement2.value = ((element.value * data.usd) / data.eur).toFixed(2)
            }

            if (element.id === 'eur') {
                targetElement1.value = (element.value * data.eur).toFixed(2)
                targetElement2.value = ((element.value * data.eur) / data.usd).toFixed(2)
            }

            if (element.value === '') {
                targetElement1.value = ''
                targetElement2.value = ''
            }
        }
    }
}

converter(somInput, usdInput, eurInput)
converter(usdInput, somInput, eurInput)
converter(eurInput, somInput, usdInput)