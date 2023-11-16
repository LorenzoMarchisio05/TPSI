const items_signup = [
    {
        control: '<input type="email" class="form-control">',
        label: "EMail",
        id: "Email",
        name: "mail",
        grid: "col-md-4",
        icon: "contact_mail",
    },
    {
        control: '<input type="password" class="form-control">',
        label: "Password",
        id: "password",
        name: "password",
        grid: "col-md-4",
        icon: "password",
    },
    {
        control: '<input type="password" class="form-control">',
        label: "Confirm Password",
        id: "confirm",
        name: "",
        grid: "col-md-4",
        icon: "password",
        onchange:
            'confirm.setCustomValidity(confirm.value != password.value ? confirm.value="" : "")',
    },
    {
        control: '<input type="text" class="form-control">',
        label: "First Name",
        id: "firstName",
        name: "firstName",
        grid: "col-md-4",
        icon: "person",
    },
    {
        control: '<input type="text" class="form-control">',
        label: "Last Name",
        id: "lastName",
        name: "lastName",
        grid: "col-md-4",
        icon: "person_2",
    },
    {
        control: '<input type="date" class="form-control">',
        label: "Birth Date",
        id: "birthDate",
        name: "birthDate",
        grid: "col-md-4",
        icon: "event_available",
    },
    {
        control: '<input type="text" class="form-control">',
        label: "Address",
        id: "address",
        name: "address",
        grid: "col-md-3",
        icon: "person_pin_circle",
    },
    {
        control: '<select class="form-select"></select>',
        label: "Region",
        id: "region",
        name: "region",
        grid: "col-md-3",
        icon: "place",
    },
    {
        control: '<select class="form-select"></select>',
        label: "Province",
        id: "province",
        name: "province",
        grid: "col-md-3",
        icon: "place",
    },
    {
        control: '<select class="form-select"></select>',
        label: "City",
        id: "city",
        name: "city",
        grid: "col-md-3",
        icon: "place",
    },
    {
        control: '<input class="form-check-input" type="checkbox" required>',
        label: "Remember Me",
        id: "rememberCheck",
        grid: "col-md-6",
        icon: "",
    },
];

const items_login = [
    {
        control: '<input type="email" class="form-control">',
        label: "EMail",
        id: "loginEmail",
        name: "mail",
        grid: "col-md-6",
        icon: "contact_mail",
    },
    {
        control: '<input type="password" class="form-control">',
        label: "Password",
        id: "loginPassword",
        name: "password",
        grid: "col-md-6",
        icon: "password",
    },
    {
        control: '<input type="checkbox" class="form-check-input">',
        label: "Agree to terms and conditions",
        id: "invalidCheck",
        name: "agree",
        grid: "col-md-6",
        icon: "",
    },
];

const items_collapse = [
    {
        name: "Login",
        idForm: "login",
        idCollapse: "loginCollapse",
        visible: "show",
        controls: items_login,
    },
    {
        name: "SignUp",
        idForm: "signup",
        idCollapse: "signupCollapse",
        visible: "",
        controls: items_signup,
    },
];

//------------------------------------------------------------------------------------------------------

function loginSignPage(place){
    addButtonLogin(makeNavbar(place));

    $.each(items_collapse, (index,item)=>{
        const collapse = makeCollapse(item);
        const form = collapse.find('form');
        $.each(item['controls'], (index,item)=>{
            form.append(makeControl(item));  
        });
        form
            .append('<div class="col-md-6"><button class="btn btn-primary" type="submit">Submit</button></div>')
            .append('<div class="col-md-12"><div class="alert" role="alert" style="text-align:center;"></div></div>');
        place.append(collapse);
    });

    //const callback = [register, login];
    //red[index](event);

    const callback = {"signup": register, "login": login};
    const forms = document.getElementsByClassName('needs-validation');
    $.each(forms, function(index, form){
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // interrompere l'evento di submit
            //event.stopPropagation();// evitare bubbling
            if (form.checkValidity()) {callback[form.id](event);}
            form.classList.add('was-validated');
        }, false);
    });

    readJsonIstat({"query":1},0);
    $("select[name=region]").on('change',function(event){
        readJsonIstat({"query":2,"region":event.target.value},1);
    });
    $("select[name=province]").on('change',function(event){
        readJsonIstat({"query":3, "province":event.target.value},2);
    });
}

function login(event) {
    try {
        console.log( $(event.target).serialize());
        $.ajax({
            async: true,
            method: "POST",
            url: "http://localhost/php/Music/PHP/login/",
            data: $(event.target).serialize(),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
        })
            .done(function(info) {
                //console.log(info['data']['class']);
                //$("#login div[role='alert']").addClass(info['data']['class']).html(info['data']['message']);
                window.sessionStorage.setItem("mail", info['data']['mail']);
                compilation({'query':'2','mail':info['data']['mail']});    
            })
            .fail(function(e){console.log('Error:' + e.status);})
            .always(function(data){console.log(data);});
    }
    catch(error) {
        console.error(error);
    }
}

function register(event){
    try {
        $.ajax({
            async: true,
            method: "POST",
            url: "http://localhost/php/Music/PHP/register/", //crea problemi se non si inserisce l'ultimo backslash
            data: $(event.target).serialize(),
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        })
            .done(function(info) {
                $("#signup div[role='alert']").addClass(info['data']['class']).html(info['data']['message']);
            })
            .fail(function(e){console.log('Error:' + e.status);})
            .always(function(data){console.log(data);});
    }
    catch (error) {
        console.error(error);
    }
}

function readJsonIstat(params, key) {
    try
    {
        const form = $("form");
        form
            .find("select")
            .slice(key)
            .html(`<option></option>`);
        $.ajax({
            async: true,
            method: "POST",
            url: "http/127.0.0.1/istat/",
            data: params,
            dataType: "json",
            contentType: "application/x-www-form-urlencode; charset-UTF-8",
        })
        .done((data) => {
            $.each(data, (i, element) => {
                $("<option></option>")
                    .appendTo( form
                        .find("select")
                        .eq(key) )
                    .text(element);
            });
        })
        .fail((e) => console.log("Error" + e.status))
        .always(console.log);
    }
    catch(err)
    {
        console.error(err);
    }
}

function makeCollapse(item){
    let border = $('<div class="p-1 m-1 bg-light border rounded text-center"></div>')
        .text(item['name'])
    let col = $('<div class="col-md-12 "></div>')
        .append(border);
    let form = $('<form class="row m-3 g-3 needs-validation" novalidate>')
    .attr('id',item['idForm'])
        .append(col);
    let card = $('<div class="card card-body container shadow p-2  bg-body rounded"></div>')
        .append(form);
    let collapse = $('<div class="m-3 collapse multi-collapse"></div>')
    .attr('id',item['idCollapse'])
    .addClass(item['visible'])  
    .append(card);
    return collapse
}
//------------------------------------------------------------------------------------------------------
function makeControl(item){
    let valid = $('<div class="valid-feedback">Verified</div>')
    let invalid = $('<div class="invalid-feedback"></div>')
        .text('Please provide a valid ' + item['label']);
    let control =$(item['control'])
        .prop('required',true)
        .attr('onchange',item['onchange'])
        .attr('id',item['id'])
        .attr('name',item['name'])
        .attr('placeholder',item['label'])
        .attr('aria-describedby','inputGroupPrepend');
    let span_prepend = $('<span class="input-group-text material-icons"></span>')
        .text(item['icon']);    
    let prepend = $('<div class="input-group-prepend"></div>')
        .append(span_prepend)
    let group = $('<div class="input-group has-validation">')
        .append(prepend)
        .append(control)
        .append(invalid)
        .append(valid);
    let label = $('<label></label>')
        .attr('for',item['id'])
        .text(item['label']);
    let col = $('<div></div>')
        .addClass(item['grid'])
        .append(label)
        .append(group)
    return col            
}
//------------------------------------------------------------------------------------------------------

export {
    loginSignPage,
    makeCollapse,
    makeControl
}
