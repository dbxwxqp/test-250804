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

/* < Плавное перемещение по странице */
{
    document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault()

            const targetId = e.target.getAttribute('href').replace('/', '')
            const targetElement= document.querySelector(targetId)
            if (!targetElement) return

            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
            const startPosition = window.scrollY
            const distance = targetPosition - startPosition
            const duration = 800
            let startTime = null

            const easeInOutQuad = (t, b, c, d) => {
                t /= d/2
                if (t < 1) return c/2*t*t + b
                t--

                return -c/2 * (t*(t-2) - 1) + b
            }

            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime
                const timeElapsed = currentTime - startTime
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
                window.scrollTo(0, run)
                if (timeElapsed < duration) requestAnimationFrame(animation)
            }

            requestAnimationFrame(animation)
        })
    })
}
/* > Плавное перемещение по странице */

/* < participants */
carousel = document.querySelector('.participants')
const carouselContainer = carousel.querySelector('.participants__wrapper')
const carouselTrack = carouselContainer.querySelector('.participants__carousel')
const prevBtn = carouselContainer.querySelector('.buttons__prev')
const nextBtn = carouselContainer.querySelector('.buttons__next')

const slides = [
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
    {
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
]
let totalSlides = slides.length
let currentIndex = 0
let slidesPerPage = 0


const createPages = () => {
    const pages = Math.ceil(slides.length / slidesPerPage)
    let page = Math.ceil(currentIndex / slidesPerPage)
    if (page > pages) {
        page = 1
    } else if (page < 1) {
        page = pages
    }
    document.querySelector('.participants__pagination').innerHTML = page + ` <span>/ ${pages}</span>`
}

const createCarouselBody = () => {
    carouselTrack.innerHTML = ''

    slides.forEach((slide) => {
        const carouselItem = document.createElement('div')
        carouselItem.classList.add('carousel__item')
        carouselItem.style.minWidth = `calc(100% / ${slidesPerPage})`

        const picture = document.createElement('img')
        picture.alt = slide.name
        picture.src = slide.picture ?? 'images/sections/participant.webp'

        const name = document.createElement('strong')
        name.textContent = slide.name

        const role = document.createElement('p')
        role.textContent = slide.role

        const link = document.createElement('a')
        link.classList.add('notice')
        link.target = '_blank'
        link.href = `/?participant=${slide.name}`
        link.textContent = 'Подробнее'

        carouselItem.append(picture, name, role, link)

        carouselTrack.append(carouselItem)
    })

    const allSlides = document.querySelectorAll('.carousel__item')
    const slidesCount = allSlides.length
    for (let i = 0; i < slidesPerPage; i++) {
        const clone = allSlides[i].cloneNode(true)
        clone.classList.add('clone')
        carouselTrack.appendChild(clone)
    }
    for (let i = slidesCount - slidesPerPage; i < slidesCount; i++) {
        const clone = allSlides[i].cloneNode(true)
        clone.classList.add('clone')
        carouselTrack.insertBefore(clone, carouselTrack.firstChild)
    }
    totalSlides = document.querySelectorAll('.carousel__item').length

    //currentIndex = slidesPerPage

    const slideWidth = 100 / slidesPerPage
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`

    createPages()
}

const setCarouselBody = () => {
    slidesPerPage = 3
    let mq = window.matchMedia('(max-width: 1220px)')
    if (mq.matches) slidesPerPage = 2
    mq = window.matchMedia('(max-width: 740px)')
    if (mq.matches) slidesPerPage = 1

    createCarouselBody()
}

const nextSlide = () => {
    currentIndex += slidesPerPage
    carouselTrack.style.transition = 'transform .4s ease'
    createCarouselBody()

    if (currentIndex >= totalSlides - slidesPerPage) {
        setTimeout(() => {
            carouselTrack.style.transition = 'none'
            currentIndex = slidesPerPage
            createCarouselBody()
        }, 400)
    }
}
let sI = setInterval(nextSlide, 4000)
carousel.addEventListener('mouseover', () => {
    if (sI) clearInterval(sI)
})
carousel.addEventListener('mouseout', () => {
    clearInterval(sI)
    sI = setInterval(nextSlide, 4000)
})
nextBtn.addEventListener('click', nextSlide)

const prevSlide = () => {
    currentIndex -= slidesPerPage
    carouselTrack.style.transition = 'transform .4s ease'
    createCarouselBody()

    if (currentIndex <= 0) {
        setTimeout(() => {
            carouselTrack.style.transition = 'none'
            currentIndex = totalSlides - 2 * slidesPerPage
            createCarouselBody()
        }, 400)
    }
}
prevBtn.addEventListener('click', prevSlide)


/* mobile */
let touchStartX = 0
let touchEndX = 0

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX
}, { passive: true })

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
}, { passive: true })

const handleSwipe = () => {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
        nextSlide()
    } else if (touchEndX > touchStartX + threshold) {
        prevSlide()
    }
}
/* > participans */

/* < stages */
{
    const slider = document.querySelector('.stages__list')
    const slides = document.querySelectorAll('.slide')
    const prevBtn = document.querySelector('.slider-arrow.prev')
    const nextBtn = document.querySelector('.slider-arrow.next')
    const dots = document.querySelectorAll('.slider-dots')

    let currentSlide = 0
    const slideCount = slides.length

    const updateSlider = () => {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`

        dots.forEach(dot => dot.classList.remove('active'))
        dots[currentSlide].classList.add('active')
    }

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slideCount
        updateSlider()
    }
    nextBtn.addEventListener('click', nextSlide)

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount
        updateSlider()
    }
    prevBtn.addEventListener('click', prevSlide)

    function goToSlide(index) {
        currentSlide = index
        updateSlider()
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(this.getAttribute('data-index'))
            goToSlide(slideIndex)
        })
    })

    updateSlider()
}
/* > stages */


window.addEventListener('resize', () => {
    setMarqueeListsWidth()
    setCarouselBody()
}, true)
document.addEventListener('DOMContentLoaded', () => {
    setCarouselBody()
})