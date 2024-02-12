$(document).ready(function(){
  registerListeners();
  resetViews();
  resetPin();
  switchView(views.splash);
  getSunTimesWithLocale();
});



