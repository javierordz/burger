$(function() {

    $("#add-burger").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
        burger_name: $("#new-burger").val().trim(),
        devoured: 0
        }

        $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
        }).then(
        function() {
            console.log("created new burger");
            location.reload();
        }
        );
    });

    $(".devour-burger").on("click", function (event) {
        var id = $(this).data("burger-id");
        var eaten = $(this).data("devour");
        var eatenState = {devoured: !eaten};
        
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: eatenState
        }).then(
            function () {
                console.log("devoured burger");
                location.reload();
            }
        );
    });

    $(".delete-burger").on("click", function (event) {
        var id = $(this).data("burger-id");
        
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted burger");
                location.reload();
            }
        );
    });

});