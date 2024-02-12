
window.onscroll = function() {
  let scroll = window.scrollY;
  let smoothScrollElem = document.getElementsByClassName('smooth-scroll');
  for (let element in smoothScrollElem) {
    smoothScrollElem[element].style.top = '-' + scroll + 'px';
  }
}
