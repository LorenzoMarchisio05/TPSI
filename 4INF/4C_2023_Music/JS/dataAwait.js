async function perforRequest_jqueryAsync(url, param)
{
    return await $.ajax({
        async: true,
        method: 'POST',
        url,
        data: param,
        dataType: 'json'
    });
}