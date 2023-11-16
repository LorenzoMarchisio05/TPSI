//------------------------------------------------------------------------------------------------------
function addButtonLogin(place){
    const navlink_active = $('<a aria-current="page">Home</a>')
        .addClass('nav-link active')
        .attr('href',"#")
        .text('Home');
    const navlink =$('<a aria-expanded="false" aria-controls="loginCollapse signupCollapse"></a>')
        .addClass('nav-link')
        .attr('data-bs-toggle',"collapse")
        .attr('data-bs-target',".multi-collapse")
        .attr('href',"#signupCollapse")
        .text('Login - Sign Up');
    place
        .append(navlink_active)
        .append(navlink);      
}
//------------------------------------------------------------------------------------------------------
function addButtonData(place){
    const navlink_active = $('<a></a>')
        .addClass('nav-link active')
        .attr('aria-current',"page")
        .attr('href',"#")
        .text('Home');
    place
        .append(navlink_active);  
        
    const menu = {
        Collection:
        [
            {label:'Add Collection', cb:{}},
            {label:'Modify Collection', cb:{}},
            {label:'Deconste Collection', cb:{}},
        ],
        Song:
        [
            {label:"Add Song", cb:{}},
            {label:"Modify Song", cb:{}},
            {label:"Deconste Song", cb:{}},
        ]
    }
    $.each(menu,function(index,item){
        ;
        const dropDownMenu = $('<ul></ul>')
            .addClass("dropdown-menu")
        $.each(item,function(index,item){
            const addButton = $('<a></a>')
                .addClass("dropdown-item")
                .attr('href',"#")
                .html(item['label']);
                $('<li></li>')
                    .append(addButton)
                    .appendTo(dropDownMenu);                
        });
        const dropDownToggle = $('<a></a>')
            .addClass("nav-link dropdown-toggle")
            .attr('aria-expanded',"false")
            .attr('href',"#" )
            .attr('data-bs-toggle',"dropdown")
            .attr('role',"button")
            .html(index);
        const navItem =$('<li></li>')
            .addClass("nav-item dropdown")
            .append(dropDownToggle)
            .append(dropDownMenu);
        place.
            append(navItem)
    });
}    
//--------------------------------------------------------------------------------------------------------
function makeNavbar(place){    
    const navbar_nav = $('<div class="navbar-nav"></div>')
    const collapse = $('<div class="collapse navbar-collapse" id="navbarNavAltMarkup"></div>')
        .append(navbar_nav);
    const span = $('<span></span>')
        .addClass("navbar-toggler-icon");    
    const navbar_toggler = $('<button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"></button>')        
        .addClass("navbar-toggler")
        .append(span);
    const navbar_brand = $('<a></a>')
        .addClass("navbar-brand")
        .attr('href',"#")
        .text('NavBar');
    const container = $('<div class="container-fluid"></div>')
        .append(navbar_toggler)
        .append(navbar_brand)
        .append(collapse);
    const navbar_expand = $('<nav></nav>')
        .addClass("navbar navbar-expand-lg navbar-light bg-light")
        .append(container);
    place.append(navbar_expand);    
    return navbar_nav;    
}
//-------------------------------------------------------------------------------------------------
function makeAlert(typeAlert,message){
    return $("<div></div>")
        .addClass("container m-3")
        .addClass("alert")
        .addClass(typeAlert)
        .attr('role','alert')
        .html(message);
}

export {
    addButtonLogin,
    addButtonData,
    makeNavbar,
    makeAlert
};