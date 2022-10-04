function updateItem() {
    var idInput = document.getElementById("idEdit");
    var titleInput = document.getElementById("titleEdit");
    var yearInput = document.getElementById("yearEdit");
    var priceInput = document.getElementById("priceEdit");

    var game = {
        id: idInput.value,
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value,
    };

    var id = idInput.value;

    axios.put("http://localhost:3030/game/" + id, game, axiosConfig).then(response => {
        if (response.status == 200) {
            alert("Game update successfully");
        } else {
            alert("Game not updated successfully");
        }
    });
}