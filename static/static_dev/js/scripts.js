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

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function (data) {
                console.log("OK");
                if (data.products_total_nmb){
                    $('#basket_total_nmb').text('('+data.products_total_nmb+')');
                    $('.basket-items ul').html("");
                    $.each(data.products, function (k, v) {
                        $('.basket-items ul').append('<li>'+v.name+' '+v.nmb+'шт. '+v.price_per_item+' рублей</li>');
                    });
                }
            },
            error: function () {
                console.log("error");
            }
        });
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
    
    function calculatingBasketPrice() {
        var total_order_price = 0;
        $('.product_in_basket_total_price').each(function () {
            total_order_price += parseFloat($(this).text());
        });
        $('.total_order_price').text(total_order_price.toFixed(2));
    };

    $(document).on('change', ".product_in_basket_nmb", function () {
        var current_nmb = $(this).val();
        var current_tr = $(this).closest('tr');
        var current_price_per_item = parseFloat(current_tr.find('.product_in_basket_price_per_item').text()).toFixed(2);
        var current_total_price = parseFloat(current_nmb * current_price_per_item).toFixed(2);
        current_tr.find('.product_in_basket_total_price').text(current_total_price);
        calculatingBasketPrice();
    });
    calculatingBasketPrice();
});