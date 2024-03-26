// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Realizar solicitud AJAX para obtener la lista de usuarios
    cargarListaUsuarios();

    // Manejar clic en el botón de búsqueda
    var searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", function() {
        var searchText = document.getElementById("search-input").value;
        buscarUsuario(searchText);
    });
});

// Función para cargar la lista de usuarios
function cargarListaUsuarios() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var listaUsuarios = JSON.parse(xhr.responseText);
                mostrarLista(listaUsuarios);
            } else {
                console.error("Error al obtener la lista de usuarios.");
            }
        }
    };
    xhr.send();
}

// Función para buscar un usuario
function buscarUsuario(textoBusqueda) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=" + encodeURIComponent(textoBusqueda), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var resultadoBusqueda = JSON.parse(xhr.responseText);
                if (resultadoBusqueda.length > 0) {
                    mostrarLista(resultadoBusqueda);
                } else {
                    mostrarMensaje("No se encontraron resultados.");
                }
            } else {
                console.error("Error al realizar la búsqueda.");
            }
        }
    };
    xhr.send();
}

// Función para mostrar la lista de usuarios en la tabla
function mostrarLista(listaUsuarios) {
    var listaGrid = document.getElementById("lista-grid");
    listaGrid.innerHTML = ""; // Limpiar contenido anterior

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

// Función para mostrar un mensaje al usuario
function mostrarMensaje(mensaje) {
    var listaGrid = document.getElementById("lista-grid");
    listaGrid.innerHTML = "<p>" + mensaje + "</p>";
}
