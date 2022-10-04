function createGame() {
    var idInput = document.createElement('id');
    var titleInput = document.getElementById("title");
    var yearInput = document.getElementById("year");
    var priceInput = document.getElementById("price")

    var game = {
        id: idInput.value,
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    }

    axios.post("http://localhost:3030/game", game, axiosConfig).then(response => {
        if(response.status == 200) {
            alert('Game created successfully');
        } else {
            alert('Game not created successfully');
        }
    })
}