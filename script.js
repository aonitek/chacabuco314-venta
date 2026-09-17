(function(){
  var track = document.getElementById('officeCarousel');
  var dotsWrap = document.getElementById('carouselDots');
  if(!track || !dotsWrap) return;
  var slides = track.children;
  for(var i=0;i<slides.length;i++){
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i===0 ? ' active' : '');
    dot.setAttribute('aria-label','Ir a foto ' + (i+1));
    dot.addEventListener('click', (function(idx){
      return function(){ goToSlide(idx); };
    })(i));
    dotsWrap.appendChild(dot);
  }
  function updateDots(){
    var idx = Math.round(track.scrollLeft / track.clientWidth);
    var dots = dotsWrap.children;
    for(var j=0;j<dots.length;j++){
      dots[j].classList.toggle('active', j===idx);
    }
  }
  function goToSlide(idx){
    track.scrollTo({left: idx * track.clientWidth, behavior:'smooth'});
  }
  window.carouselMove = function(dir){
    var idx = Math.round(track.scrollLeft / track.clientWidth) + dir;
    idx = Math.max(0, Math.min(slides.length - 1, idx));
    goToSlide(idx);
  };
  track.addEventListener('scroll', function(){
    window.clearTimeout(track._t);
    track._t = window.setTimeout(updateDots, 80);
  });
})();