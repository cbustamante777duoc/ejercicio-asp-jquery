


Listar();
ListarComboxModalidad();

//funcion que llena el combobox
function ListarComboxModalidad() {
    $.get("Docente/listarModalidadContacto", function (data) {

        llenarCombo(data, document.getElementById("tipoModalidad"), true);
    });

}

var tipoModalidad = document.getElementById("tipoModalidad");

//al momento de cambiarse el combo acciona este evento
tipoModalidad.onchange = function () {
    //obtener el valor del item selecionado
    var iidmodalidad = document.getElementById("tipoModalidad").value;

    //por defecto va a dejar tal cual
    if (iidmodalidad == "") {
             Listar();
    } else {

        $.get("Docente/FiltarDocenteComboBox/?iidmodalidad=" + iidmodalidad, function (data) {

            crearListado(["id docente", "nombre", "apellido paterno",
                "apellido materno", "email"], data)
        });
    }

}

 //llamada de la funcion listar la cual tiene tambien los valores que se van a mostrar thead
function Listar() {

    $.get("Docente/listarDocente", function (data) {

        crearListado(["id docente", "nombre", "apellido paterno",
            "apellido materno", "email"], data);
    })

}


function llenarCombo(data, control, primerElemento) {

    var contenido = "";

    if (primerElemento == true) {
        contenido += "<option value= ''>";
        contenido += "--selecione--";
        contenido += "</option>";
    }



    for (var i = 0; i < data.length; i++) {
        contenido += "<option value=' " + data[i].IID + " ' >";

        contenido += data[i].NOMBRE;

        contenido += "</option>";
    }

    control.innerHTML = contenido;
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