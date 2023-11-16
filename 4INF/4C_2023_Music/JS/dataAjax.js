function compilation(parameters) {
    try
    {
        const callCompilation = $.ajax({
            async: true,
            method: 'POST',
            url: "http://localhost/4C/Music/PHP/compilation",
            data: parameters,
            contentType: "application/x-www-form-urlencoded; charset-UTF-8",
        })
        .done((data) => {
            if(data["data"]["err"]) {
                $("body").append(makeAlert("alert-warning", data["err"]["message"]));
            }
        })
    }
    catch(e)
    {
        console.log(e);
    }
}


