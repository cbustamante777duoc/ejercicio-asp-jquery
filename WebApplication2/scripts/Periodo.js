// cambiando a fecha chilena
$("#datepickerInicio").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);

// cambiando a fecha chilena
$("#datepickerFin").datepicker(

   {
       dateFormat: "dd/mm/yy",
       changeMonth: true,
       changeYear:true
   }
);

$.get("Periodo/ListarPeriodo", function (data) {

    crearListado(["id", "nombre", "fecha de inicio","fecha fin"], data);


});
//capturando el nombre de la vista
var nombre = document.getElementById("txtNombrePeriodo");

//evento al momento de apretar el boton
nombre.onkeyup = function () {
    var nombre = document.getElementById("txtNombrePeriodo").value;
    $.get("Periodo/BuscarPeriodoPorNombre/?nombrePeriodo=" + nombre, function (data) {

         crearListado(["id", "nombre", "fecha de inicio","fecha fin"], data);
       // crearListado(data);

    });
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
    // anadir una columna
    contenido += "<td> operaciones </td>";

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

        // agregar los iconos
        contenido += "<td>"
        contenido += "<button class='btn btn-primary' data-toggle='modal' data-target='#exampleModal' > <i class='glyphicon glyphicon-edit'> </i> </button> ";
        contenido += "<button class='btn btn-danger'> <i class='glyphicon glyphicon-trash'> </i> </button> ";
        contenido += "</td>"

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