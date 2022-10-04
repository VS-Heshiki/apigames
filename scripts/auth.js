var axiosConfig = {
    headers : {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
}

function auth() {

    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password");

    var email = emailField.value;
    var password = passwordField.value;

    axios.post("http://localhost:3030/auth", { email, password })
    .then(res => {
        var token = res.data.token;
        localStorage.setItem("token", token);
        axiosConfig.headers.Authorization = "Bearer " + localStorage.getItem("token");
        alert("Login Success")
    }).catch(err => {
        alert("Login Failed");
    })
};