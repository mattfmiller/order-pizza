//BUSINESS LOGIC
function Order(name, pizzas) {
  this.name = name;
  this.pizzas = [];
}

function Pizza(size, toppings) {
  this.size = size;
  this.toppings = [];
}

Pizza.prototype.total = function() {
  if (this.size === "18") {
    return "$" + (18 + this.toppings.length);
  }
  else if (this.size === "15") {
    return "$" + (15 + this.toppings.length);
  } else if (this.size === "12") {
    return "$" + (12 + this.toppings.length);
  }
}


// USER LOGIC
$(function() {
  $("#add-pizza").click(function() {
    $("#new-pizzas").append('<div class="new-pizza">' +
                              '<div class="form-group size-form">' +
                                '<label for="order-size">Size</label>' +
                                '<select class="form-control order-size">' +
                                  '<option value="18">18"</option>' +
                                  '<option value="15">15"</option>' +
                                  '<option value="12">12"</option>' +
                                '</select>' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="toppings">Toppings</label><br>' +
                                '<input type="checkbox" name="topping-option" value="pepperoni">Pepperoni<br>' +
                                '<input type="checkbox" name="topping-option" value="anchovy">Anchovy<br>' +
                                '<input type="checkbox" name="topping-option" value="artichoke">Artichoke<br>' +
                                '<input type="checkbox" name="topping-option" value="mushrooms">Mushrooms<br>' +
                                '<input type="checkbox" name="topping-option" value="sausage">Sausage<br>' +
                                '<input type="checkbox" name="topping-option" value="carmelized-onions">Carmelized Onions<br>' +
                              '</div>' +
                            '</div>')
  });

  $("#order-form").submit(function(event){
    var orderName = $("#order-name").val();
    var order = new Order(orderName);
    $(".new-pizza").each(function(){
      var orderSize = $(this).find("select.order-size").val();
      var pizza = new Pizza(orderSize);
      $(this).find("input:checkbox[name=topping-option]:checked").each(function(){
        var orderTopping = $(this).val();
        pizza.toppings.push(orderTopping);
      });
      order.pizzas.push(pizza);
    })

    // console.log(pizza);
    console.log(order);


    // var orderTotal = pizza.total();
    // $("#order-total").text(orderTotal);
    // $(".no-display").fadeIn();
    event.preventDefault();
  });
});


// var orderSize = $(".order-size").val();
// var pizza = new Pizza(orderSize);
// $("input:checkbox[name=topping-option]:checked").each(function(){
//   var orderTopping = $(this).val();
//   pizza.toppings.push(orderTopping);
// });
// order.pizzas.push(pizza);
