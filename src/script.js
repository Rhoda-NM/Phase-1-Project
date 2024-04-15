const url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
const container = document.getElementById("container");
const row = document.getElementById("row");
const search = document.querySelector("form");
const searchInput = document.querySelector('.search-form ');
//const searchButton = document.getElementById('btn');

fetchProducts();
async function fetchProducts(products){
    try {
        if (!products) {
          sessionStorage.clear();
        }
          const data = await fetch(url);
          products = await data.json();
          console.log(products);

        let currentPage = sessionStorage.getItem("currentPage");
        //console.log(currentPage);
        if (!currentPage) {
          currentPage = 1;
          sessionStorage.setItem("currentPage", currentPage);
        }
        //console.log(currentPage);
        products
        .slice((currentPage - 1) * 15, currentPage * 15)// Render 15 elements in the product array to the current page
        .forEach((product) => {
            const card = `
              <div class="card col-6 col-sm-4">
                  <img class="product-image" src='${product["api_featured_image"]}' alt='${product["name"]}'>
                  <h3 class="product-name">${product["name"]}</h3>
                  <div class="card-content">
                  
                    <div class="product-description ">
                        <p>${product["description"]}</p>
                    </div>
                    <div class="card-footer">
                      <p class="product-price">USD${product["price"]}</p>
                      <a class="button" href='${product["product_link"]}' target="_blank">BUY</a>
                    </div>
                  </div>
              </div>
              `;
              row.insertAdjacentHTML("beforeend", card)
              
              const cardEventListener = document.querySelector(".card-content");
              cardEventListener.addEventListener('click', function(){
                showDescription(this);
              })
              
      
              const button = document.querySelector(".card:last-child .button");
              button.onclick = (event) => {
              event.stopPropagation();
              return true;

              };
        });
        //Adding navigation to the page
        const navElement = document.createElement("div");
        navElement.classList.add("row", "navigation");
        const next = document.createElement("button");
        next.classList.add("next", "btn");
        const previous = document.createElement("button");
        previous.classList.add("prev", "btn");
        next.innerHTML = ">>>";
        next.addEventListener('click', function() {
            nextPage(products);
        });
        previous.innerHTML = "<<<";
        previous.addEventListener('click', function() {
            previousPage(products);
        });
        navElement.append(next, previous);
        container.append(navElement);

        //Defining search button event listener
        search.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('I was clicked')
            const searchName = searchInput.value.toLowerCase();
                  //renderFilteredProducts(filteredProducts);

            if(searchName === ""){
                console.log("Enter product name")
            }
            else{
                clearPage();
                fetchFilteredProducts(products);
            }
            
          });
          

    }
     catch (error) {
        console.log("Reloading Page. Error occurred: " + error);
        location.reload();
    }
    
}



async function fetchFilteredProducts(products){
    try {
        if (!products) {
          sessionStorage.clear();
        }
          const data = await fetch(`url/${searchName}`);
          products = await data.json();
          console.log(products);
          /*const filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchName);
          })*/

        let currentPage = sessionStorage.getItem("currentPage");
        //console.log(currentPage);
        if (!currentPage) {
          currentPage = 1;
          sessionStorage.setItem("currentPage", currentPage);
        }
        //console.log(currentPage);
        
        products
        .slice((currentPage - 1) * 15, currentPage * 15)// Render 15 elements in the product array to the current page
        .forEach((product) => {
            const card = `
              <div class="card col-6 col-sm-4">
                  <img class="product-image" src='${product["api_featured_image"]}' alt='${product["name"]}'>
                  <h3 class="product-name">${product["name"]}</h3>
                  <div class="card-content">
                  
                    <div class="product-description hidden">
                        <p>${product["description"]}</p>
                    </div>
                    <div class="card-footer">
                      <p class="product-price">USD${product["price"]}</p>
                      <a class="button" href='${product["product_link"]}' target="_blank">BUY</a>
                    </div>
                  </div>
              </div>
              `;
              row.insertAdjacentHTML("beforeend", card)
              
              const cardEventListener = document.querySelector(".card-content");
              cardEventListener.addEventListener('click', function(){
                showDescription(this);
              })
              
      
              const button = document.querySelector(".card:last-child .button");
              button.onclick = (event) => {
              event.stopPropagation();
              return true;

              };
        });
    }
    catch (error) {
        console.log("Reloading Page. Error occurred: " + error);
        location.reload();
    }
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
//Function to toggle description in the card element
function showDescription() {
    const description = document.querySelector(".product-description");
    description.classList.toggle('hidden');
}
//function to scroll to next product page
function nextPage(products) {
    const next = document.querySelector(".next");
    const currentPage = Number(sessionStorage.getItem("currentPage"));
    const totalPages = Math.ceil(products.length / 15); ///rounds off to the next number
    if (currentPage < totalPages) {
      clearPage();
      sessionStorage.setItem("currentPage", currentPage + 1);
      fetchProducts(products);
      scrollToTop();
    } else {
      disableButton(next);
    }
  }
  //function to scroll to previous product page
function previousPage(products) {
    const previous = document.querySelector(".prev");
    const currentPage = Number(sessionStorage.getItem("currentPage"));
  
    if (currentPage > 1) {
      clearPage();
  
      sessionStorage.setItem("currentPage", currentPage - 1);
      fetchProducts(products);
      scrollToTop();
    } else {
      disableButton(previous);
    }
}
//Disable hover effect of the next or previous button
function disableButton(button) {
    button.style.pointerEvents = "none";
    button.style.opacity = "0.2";
}
//Clear the current products displayinmg while navigating to next page
function clearPage() {
    const row= document.querySelector(".row");
    const navigation = document.querySelector(".navigation");
  
    row.innerHTML = "";
    navigation.remove();
}

//Function to render searched products
function renderFilteredProducts(products) {
    //sessionStorage.clear();
    let currentPage = Number(sessionStorage.getItem("currentPage"));
    currentPage = sessionStorage.setItem("currentPage", 1);
        console.log(currentPage);
    clearPage();
    products
        .slice((currentPage - 1) * 15, currentPage * 15)
        .forEach((product) => {
            const card = `
              <div class="card col-6 col-sm-4">
                  <img class="product-image" src='${product["api_featured_image"]}' alt='${product["name"]}'>
                  <h3 class="product-name">${product["name"]}</h3>
                  <div class="card-content">
                  
                    <div class="product-description hidden">
                        <p>${product["description"]}</p>
                    </div>
                    <div class="card-footer">
                      <p class="product-price">USD${product["price"]}</p>
                      <a class="button" href='${product["product_link"]}' target="_blank">BUY</a>
                    </div>
                  </div>
              </div>
              `;
              row.insertAdjacentHTML("beforeend", card)
              
              const cardEventListener = document.querySelector(".card-content");
              cardEventListener.addEventListener('click', function(){
                showDescription(this);
              })
              
      
              const button = document.querySelector(".card:last-child .button");
              button.onclick = (event) => {
              event.stopPropagation();
              return true;

              };
          });
}
