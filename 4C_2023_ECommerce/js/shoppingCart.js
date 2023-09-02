const apiBaseUrl = `${window.location.href.substring(0, window.location.href.lastIndexOf("/"))}/api`;

async function FetchCartProducts() {
    const { user_id } = await getUserId();

    const response = await fetch(`${apiBaseUrl}/cart.php`);

    if(response.status !== 200) {
        console.error("error fetching data for cart");
        return;
    }
    const products_info = (await response.json()).filter(product_info => product_info.user_id === user_id);

    const products = [];
    for(const {product_id, quantity} of products_info) {
        const product_response = await fetch(`${apiBaseUrl}/products.php?id=${product_id}`);
        const { name, price }   = (await product_response.json()).at(0);

        products.push({ id: product_id, name, price, quantity });
    }

    return products;
}

async function CreateCartProductCards() {
    const container =  $("#cart_products_container");
    const payAndOrderButton = document.getElementById("payAndOrderButton");
    const products = await FetchCartProducts();

    products.forEach(product => {
        const card = CreateCartProductCard(product);

        container.append(card);
    });

    if(products.length === 0) {
        payAndOrderButton.onclick = null;
        payAndOrderButton.setAttribute("disabled", true);
        
        const text = $("<h4></h4>").text("No products in the shopping cart")
        text.css({
            "text-align": "center", 
            "width": "100%"
        });
        container.append(text);
    }
    else 
    {
        payAndOrderButton.removeAttribute("disabled");
        payAndOrderButton.onclick = payAndOrder;
    }
}

function CreateCartProductCard(product) {
    const {id, name, price, quantity} = product;

    return $(`
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="box">
                <h6>
                    ${quantity} x ${price}$
                </h6>
                <div class="img-box">
                    <img src="images/p${id}.png" alt=""> 
                </div>
                <div class="detail-box">
                    <h5>
                        ${name}
                    </h5>
                    <h6>
                        ${quantity*price}
                    </h6>
                </div>
            </div>
        </div>
    `);
}

async function payAndOrder() {
    console.log("entra");

    const response = await fetch(`${apiBaseUrl}/cart.php`, { method: "DELETE"});
    if(response.status === 200) {
        const container =  $("#cart_products_container");
        container.html("");
        alert("order completed");
        window.location.href = "index.php";
    }
}


document.addEventListener("DOMContentLoaded", CreateCartProductCards);