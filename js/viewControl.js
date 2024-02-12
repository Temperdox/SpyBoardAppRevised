
views = {
  //Enumerator containing the IDs for HTML objects that will fade in or out.
  splash : "splash-view",
  splashNotif : "splash-view-notification-container",
  lock : "lock-view",
  signIn : "lock-view-signin-prompt-container",
  signUp : "lock-view-signup-prompt-container",
  home : "home-view",
  homeNotif : "home-view-notification-container",
  homeSettings : "home-view-settings-container",
  loading : "loading-view"
}

let parentViewList = [];
let count = 0;
function getView(cssID, cssClass){
  //Function to get an HTML element provided a Class name or ID. ID can be null to provide class name.
  let targetEl;
  if(cssClass == null){
    targetEl = document.getElementById(cssID);
  }else{
    targetEl = document.getElementsByClassName(cssClass);
  }

  return targetEl;
}

function showElement(element){
  //Function to add css classes to provided elements to make them appear on page
  element.classList.remove('fade-out');
  element.classList.add('fade-in');
  if(element.id === views.signIn){
    getView('background').classList.add('background-resized');
  }else{
    getView('background').classList.remove('background-resized');
  }
}

function hideElement(element){
  //Function to hide a given HTML element
  element.classList.remove('fade-in');
  element.classList.add('fade-out');
  return true
}

function resetViews(){
  //Function to clear and hide all elements
  let viewedElement = getView(null, "view");
  for (let index = 0; index < viewedElement.length; index++) {
    hideElement(viewedElement[index]);
  }
}

function getParentViews(id){
  let parentView = getView(id).parentNode;
  const regexp = /view[a-z]*/g;
  if((regexp.exec(parentView.id)) !== null){
    parentViewList[count] = parentView;
    getParentViews(getView(parentView.id).parentNode.id);
    count++;
  }else{
    count = 0;
    return parentViewList;
  }

  while((regexp.exec(parentView.id)) !== null){
    parentViewList[count] = parentView;
    parentView = getView(parentView.id).parentNode;
    count++;
  }
  return parentViewList;
}

function switchView(id){
  resetViews();
  let parentViews = getParentViews(id)
  for (let pEl of parentViews) {
    showElement(pEl);
  }
  showElement(getView(id));
  getView(id).focus();
}

function resetScroll(){
  console.log("Resetting Scroll")
  getView(views.home).scrollTo(0,0);
}


