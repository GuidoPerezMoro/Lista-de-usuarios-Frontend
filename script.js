// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencia al formulario de inicio de sesión
    var loginForm = document.getElementById("login-form");

    // Agregar evento submit al formulario
    loginForm.addEventListener("submit", function(event) {
        // Evitar el envío del formulario
        event.preventDefault();

        // Obtener los valores de usuario y contraseña ingresados por el usuario
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Crear URL de la solicitud AJAX con los parámetros de usuario y contraseña
        var url = "http://168.194.207.98:8081/tp/login.php?user=" + encodeURIComponent(username) + "&pass=" + encodeURIComponent(password);

        // Realizar solicitud AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Procesar la respuesta JSON
                    var response = JSON.parse(xhr.responseText);
                    // Mostrar el mensaje al usuario
                    alert(response.mje);
                    // Verificar la respuesta del servidor
                    if (response.respuesta === "OK") {
                        // Redirigir a la página "lista.html"
                        window.location.href = "lista.html";
                    }
                } else {
                    // En caso de error en la solicitud AJAX, mostrar mensaje de error
                    alert("Error al realizar la solicitud.");
                }
            }
        };
        // Enviar la solicitud AJAX
        xhr.send();
    });
});
