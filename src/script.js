const url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
const container = document.getElementById("container");
const row = document.getElementById("row");
const searchInput = document.querySelector('.search-form input');
const searchButton = document.getElementById('btn');

fetchProducts();

async function fetchProducts(products){
    
    try {
    
        if (!products) {
          sessionStorage.clear();
          //loader.classList.add("display");
    
        }
          const data = await fetch(url);
          products = await data.json();
          console.log(products);
    
          //loader.classList.remove("display");
        
    
        let currentPage = sessionStorage.getItem("currentPage");
        //console.log(currentPage);
        
        if (!currentPage) {
        
          currentPage = 1;
          sessionStorage.setItem("currentPage", currentPage);
        }
        //console.log(currentPage);
        //<p class="product-brand">${product["brand"]}</p>

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

    }
     catch (error) {
        console.log("Reloading Page. Error occurred: " + error);
        location.reload();
    }
    
}




    
     /* 

            const navigation = document.createElement("div");
    navigation.className = "navigation";

    const previous = document.createElement("button");
    previous.classList.add("button", "previous");
    previous.innerHTML = "« Previous";
    previous.addEventListener("click", function () {
      previousPage(products);
    });

    const next = document.createElement("button");
    next.classList.add("button", "next");
    next.innerHTML = "Next »";
    next.addEventListener("click", function () {
      nextPage(products);
    });

    navigation.append(previous, next);
    document.body.append(navigation);
  } catch (error) {
    console.log("Reloading Page. Error occurred: " + error);
    location.reload();
  }
}*/

