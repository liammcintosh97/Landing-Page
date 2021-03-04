class Section {
  constructor(_number,_nav, _content,_active) {
    this.nav = _nav;
    this.number = _number;
    this.content = _content;
    this.active = _active;
    this.contentRect = _content.getBoundingClientRect();
    this.sectionBall = _content.getElementsByClassName("section-ball")[0]
    this.lightPeriwinkle = window.getComputedStyle(this.content).getPropertyValue("--light-periwinkle");
    this.independence = window.getComputedStyle(this.content).getPropertyValue("--independence");
  }

  Update(){
    //Updates the visuals of the section based on it's state
    if(this.active === true){
      this.sectionBall.style.backgroundColor = this.independence;
      this.sectionBall.style.borderColor = this.independence;
    }
    else{
      this.sectionBall.style.backgroundColor = this.lightPeriwinkle;
      this.sectionBall.style.borderColor = this.lightPeriwinkle;
    }
  }

  isInViewport() {
   //Checks if the section is in view
   var contentRect = this.content.getBoundingClientRect();

    return (
      contentRect.top >= 0 &&
      contentRect.left >= 0 &&
      contentRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      contentRect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}