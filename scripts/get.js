axios.get("http://localhost:3030/games", axiosConfig).then(response => {
    var games = response.data;
    var list = document.getElementById("games");

    function deleteItem(game) {
        var id = game.getAttribute("data-id");

        axios.delete("http://localhost:3030/game/" + id, axiosConfig).then(response => {
            if (response.status == 200) {
                alert("Game deleted successfully");
            } else {
                alert("Game delete failed");
            }
        });
    }

    function formEdit(game) {
        var id = game.getAttribute("data-id");
        var title = game.getAttribute("data-title");
        var year = game.getAttribute("data-year");
        var price = game.getAttribute("data-price");

        document.getElementById("idEdit").value = id;
        document.getElementById("titleEdit").value = title;
        document.getElementById("yearEdit").value = year;
        document.getElementById("priceEdit").value = price;
    }

    games.forEach((game) => {
        var item = document.createElement("li");

        item.setAttribute("data-id", game.id);
        item.setAttribute("data-title", game.title);
        item.setAttribute("data-year", game.year);
        item.setAttribute("data-price", game.price);

        item.innerHTML =
            "ID: " +
            game.id +
            "/ Title: " +
            game.title +
            "/ Price: $" +
            game.price;

        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add("btn", "btn-danger", "ms-4");
        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("btn", "btn-warning", "ms-4");

        deleteBtn.addEventListener("click", function () {
            deleteItem(item);
        });

        editBtn.addEventListener("click", function () {
            formEdit(item);
        });

        item.appendChild(editBtn);
        item.appendChild(deleteBtn);
        list.appendChild(item);
    });
});
