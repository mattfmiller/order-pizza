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
  if (this.size === '18"') {
    return "$" + (18 + this.toppings.length);
  }
  else if (this.size === '15"') {
    return "$" + (15 + this.toppings.length);
  } else if (this.size === '12"') {
    return "$" + (12 + this.toppings.length);
  }
}


// USER LOGIC
$(function() {
  $("#order-form").submit(function(event){
    var orderName = $("#order-name").val();
    var orderSize = $("#order-size").val();
    var pizza = new Pizza(orderSize);
    $("input:checkbox[name=topping-option]:checked").each(function(){
      var orderTopping = $(this).val();
      pizza.toppings.push(orderTopping);
    });
    var orderTotal = pizza.total();
    $("#order-total").text(orderTotal);
    $(".no-display").fadeIn();
    event.preventDefault();
  });
});
