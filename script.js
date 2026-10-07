const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();


const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('.dot'));
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  let currentIndex = 0;
  let autoPlay;

  function renderCarousel(index){
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentIndex = index;
  }

  function nextSlide(){
    renderCarousel((currentIndex + 1) % slides.length);
  }

  function prevSlide(){
    renderCarousel((currentIndex - 1 + slides.length) % slides.length);
  }

  function startAutoPlay(){
    autoPlay = setInterval(nextSlide, 8000);
  }

  function resetAutoPlay(){
    clearInterval(autoPlay);
    startAutoPlay();
  }

  nextBtn?.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
  prevBtn?.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { renderCarousel(index); resetAutoPlay(); });
  });

  renderCarousel(0);
  startAutoPlay();
}
