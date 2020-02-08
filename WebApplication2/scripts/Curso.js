$.get("Curso/listarCurso", function (data) {

    crearListado(["id","nombre","descripcion"],data);

});
//instacion del btn de la vista
var btnBuscar = document.getElementById("btnBuscar");

//evento click
btnBuscar.onclick = function () {
    var nombre = document.getElementById("txtNombre").value;
    //recoge la url del controlador y el nombre del metodo
    //data es el resultado 
    $.get("Curso/buscarCursoPorNombre/?nombre=" + nombre, function (data) {

        crearListado(["id","nombre","descripcion"],data);
    });
}

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    //devuelve la lista completa
    $.get("Curso/listarCurso", function (data) {

        crearListado(["id","nombre","descripcion"],data);

    });

    var nombre = document.getElementById("txtNombre").value = "";

}

function crearListado(arrayColumnas, data) {

    var contenido = "";
    contenido += "<table id='tablas' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";
    }

    //agregar otra columas para editar y eliminar
    contenido+= "<td> operaciones crud </td>"

    contenido += "</tr>";
    contenido += "<thead>";
    //toma del objeto de json el arreglo
    var llaves = Object.keys(data[0]);
    contenido += "<tbody>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";

        for (var j = 0; j < llaves.length; j++) {
            var valorLlaves = llaves[j];
            contenido += "<td>";
            contenido += data[i][valorLlaves];
            contenido += "</td>";
        }
        //añadir los iconos
        contenido += "<td>";
        contenido += "<button class='btn btn-primary'  data-toggle='modal' data-target='#exampleModal'> <i class='glyphicon glyphicon-edit'> </i> </button> ";
        contenido += "<button class='btn btn-danger'> <i class='glyphicon glyphicon-trash'> </i> </button> ";
        contenido += "</td>";

        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("tabla").innerHTML = contenido;
    // id de la tabla que hice arriba
    $("#tablas").dataTable({
        //el buscardor funciona solo que se va usar otro
        searching: false
    });

}