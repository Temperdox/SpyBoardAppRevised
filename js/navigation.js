const navContainer = document.querySelector('#home-view-nav-container'),
  sections = document.getElementsByTagName ('section'),
  sectionSelectors = document.querySelectorAll('section');

let isScrolling,
  sectionsMod = [],
  lastViewed;

function populateSideNav() {
  /*console.log("populating nav bar!!!" + " with " + sections.length + " sections!")
  for (let i = 0; i < sections.length; i++) {
    if(sectionsMod[i].id !== "") {
      sectionsMod.push(sections[i]);
      //The actual nav bar
      let navButton = document.createElement('div');
      const randomStartColor = "#"+((1<<24)*Math.random()|0).toString(16);
      const randomEndColor = "#"+((1<<24)*Math.random()|0).toString(16);
      document.documentElement.style.setProperty('--start-bg-color', randomStartColor);
      document.documentElement.style.setProperty('--end-bg-color', randomEndColor);
      navButton.classList.add('nav-button');
      navButton.classList.add('nav-button-hidden');
      navButton.id = "nav-button-" + sections[i].id;
      navButton.innerHTML = sections[i].id;
      console.log("Created navButton with ID:" + navButton.id);
      //Create a tab that is visible at all times that a user can hover over to show nav bars
      let navButtonIcon = document.createElement('div');
      navButtonIcon.classList.add('nav-button-icon');
      navButtonIcon.id = "nav-button-icon-" + sections[i].id;
      console.log("Created navButtonIcon with ID: " + navButtonIcon.id);
      navButtonIcon.onclick = function() {
        document.querySelector("#" + this.id.split('-')[1]).scrollIntoView({
          behavior: 'smooth'
        });
        document.querySelector(".nav-button-shown").classList.replace("nav-button-shown","nav-button-hidden");
        document.querySelector(".nav-button-icon-active").classList.remove('nav-button-icon-active');
        let elementId = this.id.split('-')[3];
        document.querySelector("#nav-button-" + elementId).classList.replace("nav-button-hidden", "nav-button-shown");
        document.querySelector("#" + this.id).classList.add('nav-button-icon-active');
      }
      navButtonIcon.onmouseenter = function() {
        let elementId = this.id.split('-')[3];
        document.querySelector("#nav-button-" + elementId).classList.replace("nav-button-hidden", "nav-button-shown");
      }
      navButtonIcon.onmouseleave = function() {
        let elementId = this.id.split('-')[3];
        document.querySelector("#nav-button-" + elementId).classList.replace("nav-button-shown", "nav-button-hidden");
      }
      navContainer.append(navButtonIcon);
    }*/
  const homeView = document.querySelector("#home-view");
  if(homeView){
    const sections = document.querySelectorAll("#home-view-container .section");
    const navContainer = document.querySelector("#home-view-nav-container");

    sections.forEach(section => {
      const navButtonGroup = document.createElement("div");
      navButtonGroup.id = `nav-button-group-${section.id}`;

      const redBox = document.createElement("div");
      redBox.style.backgroundColor = "red";
      redBox.style.width = "20px";
      redBox.style.height = "20px";
      redBox.style.float = "right";

      const sectionIdText = document.createElement("div");
      sectionIdText.innerText = section.id;
      sectionIdText.style.float = "left";

      navButtonGroup.appendChild(redBox);
      navButtonGroup.appendChild(sectionIdText);
      navContainer.appendChild(navButtonGroup);
    });
  }
  /*navContainer.children.item(0).classList.add('nav-button-icon-active');
  let elementId = navContainer.children.item(0).id.split('-')[3];
  document.querySelector("#nav-button-" + elementId).classList.replace("nav-button-hidden", "nav-button-shown");*/
  lastViewed = navContainer.children.item(0);
}
