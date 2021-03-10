const stickyClassName = "sticky"

class Navigator{
  constructor(onClick){
    this.navItems = [];
    this.content = document.getElementsByTagName("nav")[0];
    this.content.addEventListener("click",onClick);
    this.navList = this.content.getElementsByClassName("nav-list")[0];
  }

  CreateNavItem(title){
    /*Creates a new navigator button and appends it to the navigator*/
    let navItem = document.createElement("li");
    navItem.innerHTML = `<a><h2>${title}</h2></a>`
    navItem.className = "nav-item"

    this.navItems.push(navItem);
    this.navList.appendChild(navItem);

    return navItem
  }

  IsNavButton(element){
    /*Checks if the passed element is a navigator button*/
    for(let item of this.navItems){
      if(item.contains(element)) return item;
    }

    return false;
  }

  UpdateNavigator(){

    if(window.pageYOffset < 125){
      this.content.classList.remove(stickyClassName);
      return
    }

    if (window.pageYOffset > this.content.offsetTop) {
      this.content.classList.add(stickyClassName);
    } else {
      this.content.classList.remove(stickyClassName);
    }
  }
}