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
                                '<label for="order-size">Size</label>' +
                                '<select class="order-size">' +
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
    console.log(order);
    order.total();
    $("#order-name-output").text(orderName);
    $("#order-total").text(orderTotal);
    for (var i = 0; i < order.pizzas.length; i++) {
      $("#pizza-list").append("<li>" + order.pizzas[i].size + '"' + "</li>");
      $("#price-list").append("<li>$" + order.pizzas[i].price()) + "<li>";
    }
    $(".no-display").fadeIn();
    orderTotal = 0;
    $(".form-group").hide();
    event.preventDefault();
  });
});
