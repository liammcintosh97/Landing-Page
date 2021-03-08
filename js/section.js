const activeClassName = "active"

class Section {
  constructor(_number,_nav, _content,_active) {
    this.nav = _nav;
    this.number = _number;
    this.content = _content;
    this.active = _active;
    this.contentRect = _content.getBoundingClientRect();
  }

  isInViewport() {
    //Check if any element in the section is in the viewport
    var el = this.content;

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

  SetActive(_active){
    //Sets the section as active by applying a class. This element is then styled with CSS through this class
    this.active = _active

    if(_active){
      this.content.className = activeClassName;
    }
    else{
      this.content.classList.remove(activeClassName);
    }
  }
}