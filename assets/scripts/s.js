/*
    fetch(`/rest.php`, {
        method: 'post',
        data: {
            userId
        }
    })
    .then(response => response.json())
    .then((json__response) => {
        console.log('json__response', json__response)
    })
    .catch((error) => console.log('error', error))
*/

/* < marquee */

const marqueeLists = document.querySelectorAll('.marquee__list')

const animationTime = 30 * 1000 // css animation time
const gap = 12 // css gap

const cloneChildrens = (removeOff = true) => {
    const headerItems = marqueeLists[0].querySelectorAll('.marquee__item')
    for (let i = 0; i < 3; i++) {
        Array.from(marqueeLists).forEach((marqueeList) => {
            const cloneItem = headerItems[i].cloneNode(true)
            marqueeList.append(cloneItem)

            const marqueeListItems = marqueeList.querySelectorAll('.marquee__item')
            if (removeOff) marqueeListItems[0].parentNode.removeChild(marqueeListItems[0])
        })
    }
}
for (let i = 0; i < 9; i++) {
    cloneChildrens(false)
}
setInterval(cloneChildrens, animationTime)

const setMarqueeListsWidth = () => {
    const items = marqueeLists[0].querySelectorAll('.marquee__item')

    let totalElementsWidth = 0
    for (let i = 0; i < 3; i++) {
        totalElementsWidth += items[i].offsetWidth + gap
    }

    Array.from(marqueeLists).forEach((marqueeList) => {
        marqueeList.style.width = totalElementsWidth + 'px'
    })
}
setMarqueeListsWidth()

/* < marquees */

/* < logotype */
{
    const logotype = document.querySelector('.logotype')
    const horse = logotype.querySelector('svg')
    for(let i = 0; i < 3; i++){
        logotype.prepend( horse.cloneNode(true) )
    }
}
/* > logotype */

/* < participants */
{
    const slider = document.querySelector('.participants__slider')

    const aParticipants = [
        {
            name: 'Хозе-Рауль Капабланка',
            role: 'Чемпион мира по шахматам'
        },
        {
            name: 'Эммануил Ласкер',
            role: 'Чемпион мира по шахматам'
        },
        {
            name: 'Александр Алехин',
            role: 'Чемпион мира по шахматам'
        },
/*        {
            name: 'Арон Нимцович',
            role: 'Чемпион мира по шахматам'
        },
        {
            name: 'Рихард Рети',
            role: 'Чемпион мира по шахматам'
        },
        {
            name: 'Остап Бендер',
            role: 'Гроссмейстер'
        }
*/  ]

    aParticipants.forEach((participant) => {
        const sliderItem = document.createElement('div')
        sliderItem.classList.add('slider__item')

        const picture = document.createElement('img')
        picture.alt = participant.name
        picture.src = participant.picture ?? 'images/sections/participant.png'

        const name = document.createElement('strong')
        name.textContent = participant.name

        const role = document.createElement('p')
        role.textContent = participant.role

        const link = document.createElement('a')
        link.classList.add('notice')
        link.target = '_blank'
        link.href = `/?participant=${participant.name}`
        link.textContent = 'Подробнее'

        sliderItem.append(picture, name, role, link)

        slider.append(sliderItem)
    })
}
/* > participants */

/* < Плавное перемещение */
{
    const smoothScroll = (targetId) => {
        let targetElement= document.getElementById(targetId)

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
            block: 'center'
        })
    }

    document.querySelectorAll('a[href^="/#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault()

            const targetId = e.target.href.split('#').pop()

            if(targetId) smoothScroll(targetId)
        })
    })
}
/* > Плавное перемещение */


window.addEventListener('resize', setMarqueeListsWidth, true)