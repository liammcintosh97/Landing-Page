let sections = [];
let main;
let navigator;
let goBackLink;
let scrollingTo = -1; //Tracks how the browser is scrolling

function Start(){
  //Initializes all the required element variables and event listeners
  main = document.getElementsByTagName("main")[0];
  window.addEventListener("scroll", OnScroll);

  navigator = new Navigator(GoToSection);

  goBackLink =  document.getElementsByClassName("go_back")[0];
  goBackLink.addEventListener("click",GoToTitle);

  GetSections();
}

function GoToTitle(){
  //Scrolls to the Navigator
  let title = document.getElementsByClassName("title-container")[0]
  title.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
  scrollingTo = 0;
}

function GetSections(){
  //Gets all the sections in the document
  let sectionElements = document.getElementsByTagName("section");

  //Loops through all the found sections and create a new section object and navigator button
  for(let i = 0; 1 < sectionElements.length; i++){
    if(sectionElements[i] === undefined) return

    const sectionHeader = sectionElements[i].getElementsByTagName("h1")[0];
    const navItem = navigator.CreateNavItem(sectionHeader.innerText);

    sections[i] = new Section(i+1,navItem,sectionElements[i],false);
  }
}

function GoToSection(event){

  let navButton = navigator.IsNavButton(event.target);

  //Return if the clicked target is NOT a navigator button
  if(!navButton){ console.log("Not a Nav Button"); return;}

  //Loop through all the sections and find the linked one. Set the clicked one as active and scroll to it
  for(section of sections){

    if(section.nav === navButton){
      section.SetActive(true);
      section.content.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
      scrollingTo = section.number;
    }
    section.SetActive(false);
  }
}

function OnScroll(){
  //Runs when the user and the system scrolls
  let activeSection = GetActiveSection();
  navigator.UpdateNavigator();

  if(scrollingTo === -1){
    /*Loops through all the sections and check if they are in the viewport and then sets them as active.
    only runs when not scrolling to the navigator*/
    for(section of sections){
      if(section.isInViewport()){
        //No active section
        if(activeSection === null){
          section.SetActive(true);
          if(section.number === scrollingTo) scrollingTo = -1;
        }
        else if(activeSection != section){ section.SetActive(false); }
      }
      //Section is not in the Viewport
      else{
        section.SetActive(false);
      }
    }
  }
  else if(isInViewport(navigator.content)){ setTimeout(function(){scrollingTo = -1;},500)}
}

function isInViewport(el) {
  //Check if any element in the passed element is in the viewport

  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

function GetActiveSection(){
  for(section of sections){
    if(section.active) return section;
  }

  return null;
}