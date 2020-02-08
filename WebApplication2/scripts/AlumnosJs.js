//precargado
Listar();
function Listar() {

    $.get("Alumno/ListarAlumnos", function (data) {
        //creo un arreglo de los elementos que van a estar dentro de la parte de arriba de la tabla
        crearListado(["Id", "Nombre", "Apellido parterno", "Apellido materno", "Telefono Padre"], data);
    });
}


$.get("Alumno/ListarSexo", function (data) {
    //recibe la funcion y lo inserta en combo
    llenarCombo(data, document.getElementById("cboSexo"), true);

});

var btnBuscar = document.getElementById("btnBuscar");
//evento al momento de buscar
btnBuscar.onclick = function () {
    //rescatar el valor que se selecion en el combobox
    var iidsexo = document.getElementById("cboSexo").value;

    if (iidsexo == "") {
        Listar();

    } else {
        //llamado del controlador 
        $.get("Alumno/FiltrarAlumnoPorSexo/?iidsexo=" + iidsexo, function (data) {
            //funcion ya creada
            crearListado(["Id", "Nombre", "Apellido parterno", "Apellido materno",
                "Telefono Padre"], data);
        });
    }

}

//boton limpiar
var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    //llamada de metodo 
    Listar();

}

function llenarCombo(data, control, primerElemento) {

    var contenido = "";

    if (primerElemento == true) {
        contenido +="<option value= ''>";
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
    for (var i = 0; i < arrayColumnas.length; i++)
    {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";
    }
    contenido += "</tr>";
    contenido += "<thead>";
    //toma del objeto de json el arreglo
   var  llaves = Object.keys(data[0]);
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