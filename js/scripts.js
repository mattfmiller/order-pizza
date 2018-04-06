//BUSINESS LOGIC
function Pizza(name, size, toppings) {
  this.name = name;
  this.size = size;
  this.toppings = toppings;
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
    console.log(toppingsArray);

    var pizza = new Pizza(orderName, orderSize, toppingsArray);

    console.log(pizza);
    event.preventDefault();
  });
});
