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
    navItem.innerHTML = `<li class="nav-item"><a><h2>${title}</h2></a></li>`

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
}