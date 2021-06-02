import "../style/main.scss";
import { onResize } from "./utils";
import { Cursor } from "./utils/Cursor";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.min.css";
import barba from "@barba/core";
import { openHome, revealImg } from "./animations";

gsap.registerPlugin(ScrollTrigger);
class App {
  constructor() {
    window.addEventListener("resize", onResize);
    onResize();
    window.addEventListener("load", () => {
      this.scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      });
      document.querySelector("[data-barba-namespace=home]") &&
        this.initObserver();
      this.initBarba();
      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.cursor = new Cursor();
      } else {
        [...document.querySelectorAll("[class*=cursor]")].forEach((item) => {
          item.classList.add("hide");
        });
      }
    });
  }

  initObserver() {
    this.observer = new IntersectionObserver(this.onIntersection);
    [...document.querySelectorAll(".img-block")].forEach((el) => {
      this.observer.observe(el);
    });
  }
  initBarba() {
    barba.hooks.after(({ next }) => {
      this.scroll.update();
      this.scroll.scrollTo(
        document.querySelector("[data-scroll-id=start-page]")
      );
      if (next.namespace === "home") {
        this.initObserver();
      } else {
        this.observer.disconnect();
      }
      this.cursor.cleanCursor();
    });

    barba.hooks.before(({ next }) => {
      console.log(next);
    });

    barba.init({
      debug: true,
      transitions: [
        {
          name: "opacity-transition",
          once({ next }) {
            console.log(next);
          },
          leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0,
            });
          },
          enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0,
            });
          },
        },
      ],
    });
  }

  onIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        revealImg(entry.target);
      }
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
});
