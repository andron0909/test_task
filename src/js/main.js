if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

//  Tabs

const tabLinks = document.querySelectorAll(".menu_item");
const dropbtn = document.querySelectorAll(".js_drop_open");
const dropmenu = document.getElementById("js_tab_menu");

tabLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    const targetTab = document.querySelector(id);
    if (targetTab.classList.contains("active")) return;

    const activeLink = document.querySelectorAll(".menu_item.active");
    const activeTab = document.querySelector(".tab.active");

    activeLink.forEach((link) => {
      link.classList.remove("active");
    });

    tabLinks.forEach((link) => {
      if (link.children[0].getAttribute("href") === id) {
        link.classList.add("active");
      }
    });

    activeTab.classList.remove("active");
    targetTab.classList.add("active");
  });
});

dropbtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    dropmenu.classList.toggle("opened");
    dropbtn[1].classList.toggle("opened");
  });
});

//  Slider

function slider(element) {
  const _slides = element.querySelectorAll("img");
  if (_slides.length <= 1) return;
  const outer = document.createElement("div");
  const _dots = document.createElement("div");
  element.appendChild(outer).classList.add("img_slider_outer");
  element.appendChild(_dots).classList.add("img_slider_dots");
  _slides.forEach((img, index) => {
    outer.appendChild(img);
    img.setAttribute("class", "slider_item");
    img.setAttribute("data-img", index);
    const dot = document.createElement("button");
    _dots.appendChild(dot).classList.add("dot_btn");
    dot.setAttribute("data-dot", index);
    if (index == 0) {
      img.classList.add("active");
      dot.classList.add("active");
    }
  });

  const dots = _dots.querySelectorAll("button");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const activeDot = dot.getAttribute("data-dot");
      const activeSlide = outer.querySelector(".active");
      let animation;
      activeDot > activeSlide.getAttribute("data-img")
        ? (animation = "slideInLeft")
        : (animation = "slideInRight");
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });
      dot.classList.add("active");
      _slides.forEach((slide) => {
        // slide.getAttribute("data-img") == activeDot
        //   ? slide.classList.add(animation, "active")
        //   : slide.classList.remove("active", "slideInLeft", "slideInRight");
        if (slide.getAttribute("data-img") == activeDot) {
          slide.classList.add(animation);
          slide.classList.add("active");
        } else {
          slide.classList.remove("active", "slideInLeft", "slideInRight");
        }
      });
    });
  });
}

const sliderItem_1 = document.querySelector(".img_slider");
const sliderItem_2 = document.querySelector(".img_slider2");
const sliderItem_3 = document.querySelector(".img_slider3");

slider(sliderItem_1);
slider(sliderItem_2);
slider(sliderItem_3);
