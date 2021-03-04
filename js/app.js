let sections = [];
let navigator;
let main;
let goBackLink;
let scrollingTo = -1; //Tracks how the browser is scrolling


function Start(){
  //Initializes all the required element variables and event listeners
  main = document.getElementsByTagName("main")[0];
  navigator = document.getElementsByTagName("nav")[0];
  goBackLink =  document.getElementsByClassName("go_back")[0];
  navigator.addEventListener("click",GoToSection);
  window.addEventListener("scroll", OnScroll);
  goBackLink.addEventListener("click",GoToNavigator);

}

function GoToNavigator(){
  //Scrolls to the Navigator
  navigator.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
  scrollingTo = 0;
}

function GetSections(amount){

  //Gets the amount the sections in the document as per the passed value
  for(let i = 0; i < amount; i++){
      const _sectionNav = navigator.getElementsByClassName(`sec-${i+1}`)[0];
      const _sectionContent = main.getElementsByClassName(`sec-${i+1}`)[0];

      //Creates a new Section object and stores it in an array
      sections[i] = new Section(i+1,_sectionNav,_sectionContent,false);
  }
}

function GoToSection(event){

  //Return if the clicked target is NOT a navigator button
  if(!(event.target.tagName === "A" || event.target.tagName === "H2")){ return;}

  let clickedSectionNav = event.target;
  if(clickedSectionNav.tagName === "H2") clickedSectionNav = clickedSectionNav.parentElement

  //Loop through all the sections and find the linked one. Set the clicked one as active and scroll to it
  for(section of sections){
    if(section.nav === clickedSectionNav){
      section.active = true;
      section.content.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
      scrollingTo = section.number;
    }
    else{
      section.active = false;
    }
    section.Update();
  }
}

function OnScroll(){
  //Runs when the user and the system scrolls

  if(scrollingTo != 0){
    /*Loops through all the sections and check if they are in the viewport and then sets them as active.
    only runs when not scrolling to navigator*/
    for(section of sections){
      if(section.isInViewport()){
        section.active = true;
        if(section.number === scrollingTo) scrollingTo = -1;
      }
      else section.active =  false;

      if(scrollingTo === -1) section.Update();
    }
  }
  else if(isInViewport(navigator)){ setTimeout(function(){scrollingTo = -1;},500)}
}

function isInViewport(_element) {
  //Checks if the passed element's bounds are within the viewport
  var contentRect = _element.getBoundingClientRect();

   return (
     contentRect.top >= 0 &&
     contentRect.left >= 0 &&
     contentRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
     contentRect.right <= (window.innerWidth || document.documentElement.clientWidth)
   );
 }