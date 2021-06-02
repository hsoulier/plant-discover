import { gsap } from "gsap"

const cursor = document.querySelector(".cursor__inner")
const cursorOut = document.querySelector(".cursor__outer")
const cursorText = document.querySelector(".cursor__text")
const hoverEls = document.querySelectorAll("img[alt]")
let mouse = {
	x: 0,
	y: 0,
}
let pos = { ...mouse }
export class Cursor {
	constructor() {
		gsap.ticker.add(this.render)
		document.addEventListener("mousemove", this.onMouseMove)
		hoverEls.forEach((item) => {
			item.addEventListener("mouseenter", () => {
				cursorText.classList.add("visible")
				cursorText.innerHTML = item.getAttribute("alt")
			})
			item.addEventListener("mouseleave", () => {
				cursorText.classList.remove("visible")
			})
		})
	}
	onMouseMove(e) {
		mouse.x = e.clientX
		mouse.y = e.clientY
		gsap.set(cursor, {
			...mouse,
		})
		gsap.set(cursorText, {
			...mouse,
		})
	}
	render() {
		const dt = 1 - Math.pow(0.75, gsap.ticker.deltaRatio())
		pos.x += (mouse.x - pos.x) * dt
		pos.y += (mouse.y - pos.y) * dt
		gsap.set(cursorOut, {
			...pos,
		})
	}

	cleanCursor() {
		cursorText.innerHTML = ""
	}
}
