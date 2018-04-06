//BUSINESS LOGIC
function Pizza(name, size, toppings) {
  this.name = name;
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.total = function() {
  return "$18"
}

toppingsArray = []


// USER LOGIC
$(function() {
  $("#order-form").submit(function(event){
    var orderName = $("#order-name").val();
    var orderSize = $("#order-size").val();
    $("input:checkbox[name=topping-option]:checked").each(function(){
      var orderTopping = $(this).val();
      toppingsArray.push(orderTopping);
    });
    var pizza = new Pizza(orderName, orderSize, toppingsArray);
    var orderTotal = pizza.total();
    $("#order-total").text(orderTotal);
    $(".no-display").fadeIn();
    event.preventDefault();
  });
});
