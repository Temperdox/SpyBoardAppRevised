
/*let pinHandler = require('pinHandler')*/

function registerListeners(){
  //Handle pin input on the login page
  document.getElementById(views.signIn).addEventListener('keyup', handleChange, false);
  getView(views.splash).addEventListener('keyup', test, false);
  getView(views.home).addEventListener('scroll', parallaxBg, false);
  getView(views.home).addEventListener("visibilitychange", populateSideNav, false)
}

function test(event){
  alert(event.key)
}

function getOffset( el ) {
  let _x = 0;
  let _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

function parallaxBg(e){
  console.log("test")
  let scrolled = document.getElementById('home-view').scrollTop;
  let smoothScrollElem = document.getElementsByClassName('smooth-scroll');
  let sections = document.getElementsByClassName('section');
  let lastSection = sections[sections.length -1];
  console.log(getOffset(lastSection).top)
  if(getOffset(lastSection).top < 0) {
    console.log("Too far")
    scrolled = (scrolled - Math.abs(getOffset(lastSection).top));
    getView(views.home).scrollTo(0, scrolled);
    e.preventDefault();
    e.stopPropagation();

  }
  for (let i = 0; i < smoothScrollElem.length; i++) {
    getView(views.home).scrollTo(0, scrolled);
    smoothScrollElem[i].style.top = '-' + (scrolled / .75) + 'px';
  }
//S

  /*if(getOffset(lastSection).top < 0) {
    scrolled = (sections[0].offsetHeight+101);
    getView(views.home).onscroll = function() {
      console.log("Too far!!! Going back")
      /!*lastSection.scrollIntoView();*!/
      getView(views.home).scrollTo(0, (sections[0].offsetHeight+101));
    }
  }else{
    getView(views.home).onscroll = function() {
      for (let i = 0; i < smoothScrollElem.length; i++) {
        getView(views.home).scrollTo(0, scrolled);
        smoothScrollElem[i].style.top = '-' + (scrolled / .75) + 'px';
      }
    }
  }*/

  /*getView(views.home).onscroll = function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    /!*console.log(sections[0].offsetHeight);
    console.log(document.getElementById("home-view-container").offsetHeight - (sections[0].offsetHeight-1));
    console.log(scrolled > document.getElementById("home-view-container").offsetHeight - (sections[0].offsetHeight-1));*!/
    console.log(
      "scrolled: " + scrolled + ", Distance: " +
      (getOffset(lastSection).top)
      + ", Bool: " +
      (getOffset(lastSection).top < 0)
    )
    console.log("Still going")
    for (let i = 0; i < smoothScrollElem.length; i++) {
      getView(views.home).scrollTo(0, scrolled);
      smoothScrollElem[i].style.top = '-' + (scrolled / .75) + 'px';
    }
  };*/

}

function handleChange(event) {
  if (event.key === 'Escape') {
    {
      //Go back to the notification page, and clear the pin entered.
      resetPin();
      switchView(views.splash);
    }
  } else if (event.key === 'Enter') {
    {
      //Log the user into the site
      validateUser();
    }
  } else if (event.key === 'Backspace') {
    {
      //Backspace a single digit value from the pin
      decrementPin();
    }
  } else if (!isNaN(Number(event.key))) {
    {
      //Add a single digit value to the pin
      console.log("Adding to pin: " + !isNaN(Number(event.key)));
      incrementPin(event.key);
    }
  }
}
