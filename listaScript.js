// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Realizar solicitud AJAX para obtener la lista de usuarios
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Procesar la respuesta JSON y mostrar la lista de usuarios
                var listaUsuarios = JSON.parse(xhr.responseText);
                mostrarLista(listaUsuarios);
            } else {
                // En caso de error en la solicitud AJAX, mostrar mensaje de error
                console.error("Error al obtener la lista de usuarios.");
            }
        }
    };
    // Enviar la solicitud AJAX
    xhr.send();
});

// Función para mostrar la lista de usuarios en la tabla
function mostrarLista(listaUsuarios) {
    var listaGrid = document.getElementById("lista-grid");

    // Crear tabla
    var table = document.createElement("table");

    // Crear fila de encabezado
    var headerRow = document.createElement("tr");
    for (var key in listaUsuarios[0]) {
        if (listaUsuarios[0].hasOwnProperty(key)) {
            var th = document.createElement("th");
            th.textContent = key.toUpperCase();
            headerRow.appendChild(th);
        }
    }
    table.appendChild(headerRow);

    // Agregar filas de datos
    listaUsuarios.forEach(function(usuario) {
        var row = document.createElement("tr");
        for (var key in usuario) {
            if (usuario.hasOwnProperty(key)) {
                var cell = document.createElement("td");
                cell.textContent = usuario[key];
                row.appendChild(cell);
            }
        }
        // Establecer clase y color de fondo según el estado de bloqueo del usuario
        row.classList.add(usuario.bloqueado === "Y" ? "bloqueado-si" : "bloqueado-no");
        table.appendChild(row);
    });

    // Agregar tabla al contenedor
    listaGrid.appendChild(table);
}
