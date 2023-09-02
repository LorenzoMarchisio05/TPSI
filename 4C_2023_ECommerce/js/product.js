const apiBaseUrl = `${window.location.href.substring(0, window.location.href.lastIndexOf("/"))}/api`;

function CreateProductCard(product, logged)
{
    const {id, name, price} = product;

    const addToCartButton = `
        <button class="option1" onclick="addToCart(${id})">
            Add to Cart
        </button>
        `;

    return $(`
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="box">
                <div class="option_container">
                    <div class="options">
                        ${ logged ? addToCartButton : "" }
                        <a href="" class="option2">
                            Buy Now
                        </a>
                    </div>
                </div>
                <div class="img-box">
                    <img src="images/p${id}.png" alt=""> 
                </div>
                <div class="detail-box">
                    <h5>
                        ${name}
                    </h5>
                    <h6>
                        $${price}
                    </h6>
                </div>
            </div>
        </div>
    `);
}

async function FetchProduct()
{
    const url = `${apiBaseUrl}/products.php`;
    const response = await fetch(url);
    if(response.status !== 200)
    {
        console.error("error fetching data");
        return;
    }

    const json = await response.json();

    return json;
}


async function CreateProductCards()
{
    const products_container = $("#products_container");
    const products = await FetchProduct();

    const { logged } = await getUserId();

    for(const product of products)
    {
        const card = CreateProductCard(product, logged);

        products_container.append(card);
    }
}

document.addEventListener("DOMContentLoaded", CreateProductCards);

async function addToCart(id) {
    const {user_id} = await getUserId();

    if(user_id === -1) {
        console.log("you arent logged");
        return;
    }

    const body = {
        user_id,
        quantity: 1,
        product_id: id,
    }

    const added_to_cart = await fetch(`${apiBaseUrl}/cart.php`, { 
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    console.log(await added_to_cart.text());
}