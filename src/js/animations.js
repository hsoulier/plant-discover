import { gsap } from "gsap"

export const revealImg = (el) => {
    const tl = gsap.timeline()
    tl.to(el.querySelector("img"), {
        opacity: 1,
        scale: 1,
        duration: 0.8,
    })
    return tl
}

export const openHome = () => {
    console.log(this)
}
