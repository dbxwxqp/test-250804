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
const marqueeLists= document.querySelectorAll('.marquee__list')

const animationTime = 10 * 1000 // css animation time
const gap = 12 // css gap

const cloneChildrens = (removeOff = true) => {
    const headerItems = marqueeLists[0].querySelectorAll('.marquee__item')
    for(let i = 0; i < 3; i++) {
        Array.from(marqueeLists).forEach((marqueeList) => {
            const cloneItem = headerItems[i].cloneNode(true)
            marqueeList.append(cloneItem)

            const marqueeListItems = marqueeList.querySelectorAll('.marquee__item')
            if(removeOff) marqueeListItems[0].parentNode.removeChild(marqueeListItems[0])
        })
    }
}
for(let i = 0; i < 9; i++){
    cloneChildrens(false)
}
setInterval(cloneChildrens, animationTime)

const setMarqueeListsWidth = () => {
    const items = marqueeLists[0].querySelectorAll('.marquee__item')

    let totalElementsWidth = 0
    for(let i = 0; i < 3; i++) {
        totalElementsWidth += items[i].offsetWidth + gap
    }

    Array.from(marqueeLists).forEach((marqueeList) => {
        marqueeList.style.width = totalElementsWidth + 'px'
    })
}
setMarqueeListsWidth()
window.addEventListener('resize', setMarqueeListsWidth, true)
/* < marquees */