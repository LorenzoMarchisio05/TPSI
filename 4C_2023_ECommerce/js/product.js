
function CreateProductCard(product)
{
    const {id, name, price} = product;

    return $(`
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="box">
                <div class="option_container">
                    <div class="options">
                        <a href="" class="option1">
                            Add to Cart
                        </a>
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
    const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf("/"));
    const url = `${baseUrl}/api/products.php`;
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

    for(const product of products)
    {
        const card = CreateProductCard(product);

        products_container.append(card);
    }
}

document.addEventListener("DOMContentLoaded", CreateProductCards);