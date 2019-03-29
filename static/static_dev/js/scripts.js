$(document).ready(function () {
    var form = $('#form_buying_product');
    form.on('submit', function (e) {
        e.preventDefault();
        var nmb = $('#number').val();
        var submit_btn = $('#submit_btn');
        var product_id = submit_btn.data("product-id");
        var product_name = submit_btn.data("name");
        var product_price = submit_btn.data("price");
        var order_price = product_price * nmb;

        var data = {};
        data.product_id = product_id;
        data.nmb = nmb;
        var csrf_token = $('#form_buying_product [name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;
        var url = form.attr("action");
        console.log(data);

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function (data) {
                console.log("OK");
                console.log(data.products_total_nmb);
                if (data.products_total_nmb){
                    $('#basket_total_nmb').text('('+data.products_total_nmb+')');
                }
            },
            error: function () {
                console.log("error");
            }
        });

        $('.basket-items ul').append('<li>'+product_name+' '+nmb+'шт. '+order_price+' рублей ' +
            '<a class="delete-item" href="">x</a></li>');
    });

    function shovingBasket(){
        $('.basket-items').toggleClass('hidden');
    }

    $('.basket-container').mouseover(function () {
        shovingBasket();
    });
    $('.basket-container').mouseout(function () {
        shovingBasket();
    });
    $(document).on('click', '.delete-item', function (e) {
        e.preventDefault();
        $(this).closest('li').remove();
    });
});