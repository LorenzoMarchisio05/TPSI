function MakeNavBar(place)
{
    const collapse = $(
        `<div class="collapse navbar-collapse" 
            id="navbarNavAltMarkup">

            <div class="navbar navbar-nav">

            </div>
        </div>
    `);

    const span = $("<span></span>")
        .addClass("navbar-toggler-icon");
    
    const navbar_toggler = $(
        `<button 
            type="button" 
            data-bs-toggler="collapse" 
            data-bs-toggle="#navbarNavAltMarkup" 
            aria-expanded="false"
            aria-label="Toggle navigation
            class="navbar-toggler"
            >
        </button>
    `)
    .append(span);

    const navbar_brand = $("<a></a>")
        .addClass("navbar-brand")
        .attr("href", "#")
        .text("Navbar");

    const container = $(`<div class="container-fluid"></div>`)
        .append(navbar_toggler)
        .append(navbar_brand)
        .append(collapse);

    const navbar_expanded = $("<nav></nav>")
        .addClass("navbar navbar-expanded-lg navbar-light bg-light")
        .append(container);

    place.append(navbar_expanded);

    return collapse.children().eq(0);
}


function MakeAlert()
{
    
}