//BUSINESS LOGIC
var orderTotal = 0

function Order(name, pizzas) {
  this.name = name;
  this.pizzas = [];
}

function Pizza(size, toppings) {
  this.size = size;
  this.toppings = [];
}

Pizza.prototype.price = function() {
  if (this.size === "18") {
    return 18 + this.toppings.length;
  } else if (this.size === "15") {
    return 15 + this.toppings.length;
  } else if (this.size === "12") {
    return 12 + this.toppings.length;
  }
}

Order.prototype.total = function() {
  for (var i = 0; i < this.pizzas.length; i++) {
    orderTotal += this.pizzas[i].price();
  }
}


// USER LOGIC
$(function() {
  $("#add-pizza").click(function() {
    $("#new-pizzas").append('<div class="new-pizza col">' +
                              '<div class="form-group size-form">' +
                                '<label for="order-size">Size ($1 per inch)</label><br>' +
                                '<select class="order-size">' +
                                  '<option value="18">18"</option>' +
                                  '<option value="15">15"</option>' +
                                  '<option value="12">12"</option>' +
                                '</select>' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="toppings">Toppings ($1 each)</label><br>' +
                                '<input type="checkbox" name="topping-option" value="Pepperoni">Pepperoni<br>' +
                                '<input type="checkbox" name="topping-option" value="Anchovy">Anchovy<br>' +
                                '<input type="checkbox" name="topping-option" value="Artichoke">Artichoke<br>' +
                                '<input type="checkbox" name="topping-option" value="Mushrooms">Mushrooms<br>' +
                                '<input type="checkbox" name="topping-option" value="Sausage">Sausage<br>' +
                                '<input type="checkbox" name="topping-option" value="Carmelized-Onions">Carmelized Onions<br>' +
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
    order.total();
    $("#order-name-output").text(orderName);
    for (var i = 0; i < order.pizzas.length; i++) {
      $("#pizza-list").append('<div class = "pizza-list-item">' +
                                '<h6 class="float-left link">' + order.pizzas[i].size + '"' + ' Pizza</h6>' +
                                '<h6 class="float-right">$' + order.pizzas[i].price() + '</h6><br>' +
                                '<p class="no-display">Toppings: ' + order.pizzas[i].toppings.toString().replace(",", ", ") +
                                '<p>');
    }
    $("#order-total").text(orderTotal);
    $("#final-order").fadeIn();
    $("#order-form").hide();
    $(".pizza-list-item").click(function() {
      $(this).find(".no-display").slideToggle();
    });
    orderTotal = 0;
    event.preventDefault();
  });
});
