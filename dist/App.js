window.onload = function () {
    App.asignarManejadores();
};
var App = (function () {
    function App() {
    }
    App.asignarManejadores = function () {
        $("#btnGetPersonajes").on("click", function (event) {
            if (event.target.getAttribute("aria-disabled")) {
                event.preventDefault();
            }
            else {
                App.traerPersonajes();
            }
        });
        $("#btnAltaPersonaje").on("click", function (event) {
            if (event.target.getAttribute("aria-disabled")) {
                event.preventDefault();
            }
            else {
                App.altaPersonaje();
            }
        });
        $("#btnEditarPersonaje").on("click", function (event) {
            if (event.target.getAttribute("aria-disabled")) {
                event.preventDefault();
            }
            else {
                App.editarPersonaje();
            }
        });
    };
    App.traerPersonajes = function () {
        App.habilitarMenu($("#btnGetPersonajes"));
        App.activarMenu($("#btnGetPersonajes"));
        $("#info").empty();
        var personajes = App.cargarArrayPersonajes();
        App.crearFiltros(personajes);
        App.crearTabla(personajes);
        App.crearFormulario(personajes);
        App.habilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
    };
    App.activarMenu = function (elemento) {
        elemento.parent().addClass("active");
    };
    App.desactivarMenu = function (elemento) {
        elemento.parent().removeClass("active");
    };
    App.habilitarMenu = function (elemento) {
        elemento.removeClass("disabled");
        elemento.parent().removeClass("disabled");
        elemento.css("cursor", "");
        elemento.removeAttr("aria-disabled");
    };
    App.deshabilitarMenu = function (elemento) {
        elemento.addClass("disabled");
        elemento.parent().addClass("disabled");
        elemento.css("cursor", "not-allowed");
        elemento.attr("aria-disabled", "true");
    };
    App.cargarArrayPersonajes = function () {
        var personajes = [];
        var storage = JSON.parse(localStorage.getItem("personajes"));
        if (storage == null || storage[0] == undefined) {
            personajes[0] = new Heroe();
        }
        else {
            for (var i = 0; i < storage.length; i++) {
                personajes[i] = new Heroe(storage[i]["id"], storage[i]["nombre"], storage[i]["edad"], storage[i]["alias"], storage[i]["poder"], storage[i]["tipo"]);
            }
        }
        return personajes;
    };
    App.cargarPersonajeSeleccionado = function () {
        var storage = JSON.parse(localStorage.getItem("personajeSeleccionado"));
        var personajeSeleccionado = new Heroe(storage["id"], storage["nombre"], storage["edad"], storage["alias"], storage["poder"], storage["tipo"]);
        return personajeSeleccionado;
    };
    App.altaPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.deshabilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        App.desactivarMenu($("#btnGetPersonajes"));
        $("#tablaPersonajes").css("display", "none");
        $("#divFiltrosPersonajes").css("display", "none");
        $("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes);
    };
    App.editarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.deshabilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        App.desactivarMenu($("#btnGetPersonajes"));
        $("#tablaPersonajes").css("display", "none");
        $("#divFiltrosPersonajes").css("display", "none");
        $("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes, App.cargarPersonajeSeleccionado());
    };
    App.crearFiltros = function (personajes) {
        var div = $("#info");
        div.append("<div id=divFiltrosPersonajes>");
        var divFiltroPersonajes = $("#divFiltrosPersonajes");
        divFiltroPersonajes.append("<div id=divFilaFiltros1>");
        var divFilaFiltros1 = $("#divFilaFiltros1");
        divFilaFiltros1.addClass("row bg-danger");
        divFilaFiltros1.append("<h5 id=TituloFiltros>");
        $("#TituloFiltros").addClass("col-sm-12 text-center");
        $("#TituloFiltros").text("Filtros");
        divFiltroPersonajes.append("<div id=divFilaFiltros2>");
        var divFilaFiltros2 = $("#divFilaFiltros2");
        divFilaFiltros2.addClass("row bg-danger");
        divFilaFiltros2.append("<div id=divFiltroTipo>");
        var divFiltroTipo = $("#divFiltroTipo");
        divFiltroTipo.addClass("col-sm-6");
        divFiltroTipo.append("<label id=labelFiltroTipo>");
        var labelFiltroTipo = $("#labelFiltroTipo");
        labelFiltroTipo.attr("for", "filtroTipo");
        labelFiltroTipo.text("Filtrar por");
        divFiltroTipo.append("<select id=filtroTipo>");
        var filtroTipo = $("#filtroTipo");
        filtroTipo.addClass("form-control-inline col-sm-6");
        filtroTipo.append("<option id=opcionTodos>");
        filtroTipo.on("change", function () {
            var personajesFiltrados = App.filtrarPersonajes(App.cargarArrayPersonajes());
            $("#tablaPersonajes").empty();
            App.crearTabla(personajesFiltrados);
        });
        $("#opcionTodos").text("Todos");
        for (var unHeroe in EHeroe) {
            if (isNaN(Number(unHeroe))) {
                filtroTipo.append("<option id=opcion" + unHeroe + ">");
                $("#opcion" + unHeroe).text(unHeroe);
            }
        }
        divFilaFiltros2.append("<div id=divPromedioEdad>");
        var divPromedioEdad = $("#divPromedioEdad");
        divPromedioEdad.addClass("col-sm-6");
        divPromedioEdad.append("<label id=labelPromedioEdad>");
        var labelPromedioEdad = $("#labelPromedioEdad");
        labelPromedioEdad.attr("for", "promedioEdad");
        labelPromedioEdad.text("Promedio de Edad");
        divPromedioEdad.append("<input id=promedioEdad>");
        var promedioEdad = $("#promedioEdad");
        promedioEdad.attr("type", "text");
        promedioEdad.prop("readonly", true);
        promedioEdad.append("<option id=opcionTodos>");
        divFiltroPersonajes.append("<div id=divFilaCampos1>");
        var divFilaCampos1 = $("#divFilaCampos1");
        divFilaCampos1.addClass("row bg-warning");
        divFilaCampos1.append("<h5 id=TituloCampos>");
        $("#TituloCampos").addClass("col-sm-12 text-center");
        $("#TituloCampos").text("Campos mostrados (tildar los campos a mostrar)");
        divFiltroPersonajes.append("<div id=divFilaCampos2>");
        var divFilaCampos2 = $("#divFilaCampos2");
        divFilaCampos2.addClass("row bg-warning");
        personajes[0].getAtributos().forEach(function (value) {
            divFilaCampos2.append("<div id=divCampo" + value + ">");
            var divCampo = $("#divCampo" + value);
            divCampo.addClass("col-sm-1");
            divCampo.append("<input id=campo" + value + ">");
            var campo = $("#campo" + value);
            campo.attr("type", "checkbox");
            campo.attr("value", value);
            campo.prop("checked", true);
            campo.on("change", function () {
                var personajesFiltrados = App.filtrarPersonajes(App.cargarArrayPersonajes());
                $("#tablaPersonajes").empty();
                App.crearTabla(personajesFiltrados);
            });
            divCampo.append("<label id=etiquetaCampo" + value + ">");
            var etiquetaCampo = $("#etiquetaCampo" + value);
            etiquetaCampo.attr("for", value);
            etiquetaCampo.text(value);
        });
    };
    App.crearTabla = function (personajes) {
        var puedeCrearDetalle = true;
        var div = $("#info");
        div.append("<div id=divTablaPersonajes>");
        $("#divTablaPersonajes").append("<table id=tablaPersonajes>");
        var tablaPersonajes = $("#tablaPersonajes");
        $("#tablaPersonajes").addClass("tablaPersonajes");
        $("#tablaPersonajes").addClass("table");
        $("#tablaPersonajes").addClass("table-striped");
        $("#tablaPersonajes").addClass("table-bordered");
        $("#tablaPersonajes").addClass("table-hover");
        if (personajes[0].getId() == null) {
            puedeCrearDetalle = false;
        }
        App.crearCabecera(personajes, tablaPersonajes);
        if (puedeCrearDetalle) {
            App.crearDetalle(tablaPersonajes, personajes);
        }
    };
    App.crearFormulario = function (personajes) {
        var div = $("#info");
        div.append("<div id=infoForm>");
        $("#infoForm").addClass("container");
        $("#infoForm").append("<form id=formularioPersonajes>");
        var formulario = $("#formularioPersonajes");
        formulario.css("display", "none");
        formulario.on("submit", function (event) {
            event.preventDefault();
            if ($("#btnAgregar").css("display") !== "none") {
                App.opcionAgregarPersonaje();
            }
            else if ($("#btnModificar").css("display") !== "none") {
                App.opcionModificarPersonaje();
            }
        });
        personajes[0].getAtributos().forEach(function (value) {
            switch (value) {
                case "tipo":
                    formulario.append("<fieldset id=grupoTipo>");
                    var grupoTipo = $("#grupoTipo");
                    grupoTipo.addClass("form-group");
                    grupoTipo.append("<div id=grupoTipo2>");
                    var grupoTipo2 = $("#grupoTipo2");
                    grupoTipo2.addClass("row");
                    grupoTipo2.append("<legend id=leyendaTipo>");
                    var leyendaTipo = $("#leyendaTipo");
                    leyendaTipo.addClass("col-form-label col-sm-2 pt-0");
                    leyendaTipo.text("Tipo");
                    grupoTipo2.append("<div id=grupoTipo3>");
                    var grupoTipo3 = $("#grupoTipo3");
                    grupoTipo3.addClass("col-sm-10");
                    grupoTipo.addClass("grupoInterno");
                    for (var unTipo in EHeroe) {
                        if (isNaN(Number(unTipo))) {
                            grupoTipo3.append("<div id=grupoTipo" + unTipo + ">");
                            var grupoTipo4 = $("#grupoTipo" + unTipo);
                            grupoTipo4.addClass("form-check");
                            grupoTipo4.append("<input id=opt" + unTipo + ">");
                            var optButton = $("#opt" + unTipo);
                            grupoTipo4.append("<label id=etiqueta" + unTipo + ">");
                            var etiquetaTipo = $("#etiqueta" + unTipo);
                            etiquetaTipo.attr("for", "opt" + unTipo);
                            etiquetaTipo.text(unTipo);
                            etiquetaTipo.addClass("form-check-label");
                            optButton.attr("type", "radio");
                            optButton.attr("name", "tipo");
                            optButton.attr("value", unTipo);
                            optButton.addClass("form-check-input");
                        }
                    }
                    break;
                default:
                    formulario.append("<div id=grupo" + value + ">");
                    var grupo = $("#grupo" + value);
                    grupo.addClass("form-group row");
                    var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    grupo.append("<label id=etiqueta" + value + ">");
                    var etiqueta = $("#etiqueta" + value);
                    etiqueta.addClass("col-sm-2 col-form-label");
                    etiqueta.attr("for", "txt" + atributoCapitalizado);
                    etiqueta.text(atributoCapitalizado);
                    grupo.append("<div id=grupoInput" + value + ">");
                    var grupoInput = $("#grupoInput" + value);
                    grupoInput.addClass("col-sm-10");
                    grupoInput.append("<input id=txt" + atributoCapitalizado + ">");
                    var cuadroTexto = $("#txt" + atributoCapitalizado);
                    if (value === "edad") {
                        cuadroTexto.attr("type", "number");
                    }
                    else {
                        cuadroTexto.attr("type", "text");
                    }
                    cuadroTexto.prop("required", true);
                    cuadroTexto.attr("placeholder", "Ingrese " + value);
                    cuadroTexto.addClass("form-control");
                    if (value === "id") {
                        cuadroTexto.attr("readonly", "");
                    }
                    break;
            }
        });
        formulario.append("<button id=btnAgregar>");
        var btnAgregar = $("#btnAgregar");
        formulario.append("<button id=btnModificar>");
        var btnModificar = $("#btnModificar");
        formulario.append("<button id=btnBorrar>");
        var btnBorrar = $("#btnBorrar");
        formulario.append("<button id=btnCancelar>");
        var btnCancelar = $("#btnCancelar");
        btnAgregar.attr("type", "submit");
        btnAgregar.text("Agregar");
        btnAgregar.addClass("btn btn-primary");
        btnAgregar.css("margin", "2px");
        btnModificar.attr("type", "submit");
        btnModificar.text("Modificar");
        btnModificar.addClass("btn btn-primary");
        btnModificar.css("margin", "2px");
        btnBorrar.attr("type", "button");
        btnBorrar.text("Borrar");
        btnBorrar.addClass("btn btn-danger");
        btnBorrar.css("margin", "2px");
        btnBorrar.on("click", App.opcionBorrarPersonaje);
        btnCancelar.attr("type", "button");
        btnCancelar.text("Cancelar");
        btnCancelar.addClass("btn btn-secondary");
        btnCancelar.css("margin", "2px");
        btnCancelar.on("click", App.ocultarFormulario);
    };
    App.mostrarFormulario = function (personajes, personajeSeleccionado) {
        if (personajeSeleccionado !== undefined) {
            $("#btnAgregar").css("display", "none");
            $("#btnModificar").css("display", "initial");
            $("#btnBorrar").css("display", "initial");
        }
        else {
            $("#btnAgregar").css("display", "initial");
            $("#btnModificar").css("display", "none");
            $("#btnBorrar").css("display", "none");
        }
        personajes[0].getAtributos().forEach(function (value) {
            var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            switch (value) {
                case "tipo":
                    if (personajeSeleccionado !== undefined) {
                        for (var unTipo in EHeroe) {
                            if (isNaN(Number(unTipo))) {
                                if (unTipo == personajeSeleccionado.getTipo()) {
                                    $("#opt" + unTipo).prop("checked", true);
                                }
                                else {
                                    $("#opt" + unTipo).prop("checked", false);
                                }
                            }
                        }
                    }
                    else {
                        for (var unTipo in EHeroe) {
                            if (isNaN(Number(unTipo))) {
                                if (unTipo == EHeroe.Avenger) {
                                    $("#opt" + unTipo).prop("checked", true);
                                }
                                else {
                                    $("#opt" + unTipo).prop("checked", false);
                                }
                            }
                        }
                    }
                    break;
                default:
                    if (personajeSeleccionado !== undefined) {
                        $("#txt" + atributoCapitalizado).val(personajeSeleccionado.getDinamico(value));
                    }
                    else {
                        if (value === "id") {
                            $("#txt" + atributoCapitalizado).val(Heroe.getProximoId());
                        }
                        else {
                            $("#txt" + atributoCapitalizado).val("");
                        }
                    }
                    break;
            }
        });
    };
    App.ocultarFormulario = function () {
        App.habilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        App.blanquearFila();
        $("#tablaPersonajes").css("display", "table");
        $("#divFiltrosPersonajes").css("display", "block");
        $("#formularioPersonajes").css("display", "none");
        App.activarMenu($("#btnGetPersonajes"));
    };
    App.crearCabecera = function (personajes, tablaPersonajes) {
        tablaPersonajes.append("<thead id=thead1>");
        $("#thead1").append("<tr id=filaCabecera>");
        var fila = $("#filaCabecera");
        personajes[0].getAtributos().forEach(function (value) {
            if (personajes[0].getDinamico(value) != undefined) {
                fila.append("<th id=ColumnaCabecera" + value + ">" + value);
            }
        });
    };
    App.crearDetalle = function (tablaPersonajes, datos) {
        var filaDetalle;
        tablaPersonajes.append("<tbody id=tbody1>");
        var _loop_1 = function (i) {
            $("#tbody1").append("<tr id=filaDetalle" + datos[i].getId() + ">");
            filaDetalle = $("#filaDetalle" + datos[i].getId());
            filaDetalle.on("click", App.seleccionarFila);
            datos[i].getAtributos().forEach(function (value) {
                if (datos[i].getDinamico(value) != undefined) {
                    filaDetalle.append("<td id=ColumnaDetalle" + value + datos[i].getId() + ">" + datos[i].getDinamico(value));
                    $("#ColumnaDetalle" + value + datos[i].getId()).addClass(value);
                }
            });
        };
        for (var i = 0; i < datos.length; i++) {
            _loop_1(i);
        }
    };
    App.filtrarPersonajes = function (datos) {
        var datosFilter = datos.filter(function (value) {
            return (value.getTipoStr() == $("#filtroTipo").val() || $("#filtroTipo").val() == "Todos");
        }).map(function (value) {
            var id = null;
            var nombre = null;
            var edad = null;
            var alias = null;
            var poder = null;
            var tipo = null;
            if ($("#campoid").prop("checked")) {
                id = value.getId();
            }
            if ($("#camponombre").prop("checked")) {
                nombre = value.getNombre();
            }
            if ($("#campoedad").prop("checked")) {
                edad = value.getEdad();
            }
            if ($("#campoalias").prop("checked")) {
                alias = value.getAlias();
            }
            if ($("#campopoder").prop("checked")) {
                poder = value.getPoder();
            }
            if ($("#campotipo").prop("checked")) {
                tipo = value.getTipo();
            }
            return new Heroe(id, nombre, edad, alias, poder, tipo);
        });
        if (datosFilter.length == 0) {
            datosFilter[0] = new Heroe();
        }
        return datosFilter;
    };
    App.blanquearFila = function () {
        $("#filaSeleccionada").removeClass("table-primary");
        $("#filaSeleccionada").removeAttr("id");
        localStorage.removeItem("personajeSeleccionado");
    };
    App.seleccionarFila = function () {
        var filaActual = $(this);
        var personajeSeleccionado = new Heroe();
        App.habilitarMenu($("#btnEditarPersonaje"));
        App.blanquearFila();
        filaActual.attr("id", "filaSeleccionada");
        filaActual.addClass("table-primary");
        filaActual.children().each(function () {
            personajeSeleccionado.setDinamico($(this).attr("class"), $(this).text());
        });
        localStorage.setItem("personajeSeleccionado", JSON.stringify(personajeSeleccionado));
    };
    App.opcionAgregarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.agregarPersonaje(personajes, App.personajeEditado(personajes));
    };
    App.opcionBorrarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.borrarPersonaje(personajes, App.cargarPersonajeSeleccionado());
    };
    App.opcionModificarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.modificarPersonaje(personajes, App.cargarPersonajeSeleccionado(), App.personajeEditado(personajes));
    };
    App.agregarPersonaje = function (personajes, personaje) {
        var nuevoPersonaje = [];
        personaje.setId(Heroe.getProximoId());
        nuevoPersonaje.push(personaje);
        App.ocultarFormulario();
        App.crearDetalle($("#tablaPersonajes"), nuevoPersonaje);
        if (personajes[0].getId() == null) {
            personajes[0] = personaje;
        }
        else {
            personajes.push(personaje);
        }
        localStorage.setItem("personajes", JSON.stringify(personajes));
        Heroe.setProximoId();
    };
    App.borrarPersonaje = function (personajes, personaje) {
        if (confirm("¿Confirma el borrado del Heroe?\n\n" + personaje.toString())) {
            var posicion_1 = -1;
            personajes.forEach(function (value, index) {
                if (value.getId() == personaje.getId()) {
                    posicion_1 = index;
                }
            });
            if (posicion_1 != -1) {
                personajes.splice(posicion_1, 1);
                alert("Heroe:\n\n" + personaje.toString() + "\n\nfue borrada de la tabla");
                $("#filaSeleccionada").remove();
            }
            App.ocultarFormulario();
            localStorage.setItem("personajes", JSON.stringify(personajes));
        }
    };
    App.modificarPersonaje = function (personajes, personaPre, personaPost) {
        if (confirm("¿Confirma la modificacion del Heroe?\n\n" + personaPre.toString() + "\n\na\n\n" + personaPost.toString())) {
            var posicion_2 = -1;
            personajes.forEach(function (value, index) {
                if (value.getId() == personaPost.getId()) {
                    posicion_2 = index;
                }
            });
            if (posicion_2 != -1) {
                personajes.splice(posicion_2, 1);
                personajes.push(personaPost);
                alert("Heroe:\n\n" + personaPre.toString() + "\n\nfue modificada a:\n\n" + personaPost.toString());
                App.modificarFilaSeleccionada(personaPost);
            }
            App.ocultarFormulario();
            localStorage.setItem("personajes", JSON.stringify(personajes));
        }
    };
    App.modificarFilaSeleccionada = function (datos) {
        var filaSeleccionada = $("#filaSeleccionada");
        filaSeleccionada.children().each(function () {
            $(this).text(datos.getDinamico($(this).attr("class")));
        });
    };
    App.personajeEditado = function (personajes) {
        var personaje = new Heroe();
        personajes[0].getAtributos().forEach(function (value) {
            switch (value) {
                case "tipo":
                    var valor2 = String($('input[name="tipo"]:checked').val());
                    personaje.setTipoStr(valor2);
                    break;
                default:
                    var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    personaje.setDinamico(value, $("#txt" + atributoCapitalizado).val());
                    break;
            }
        });
        return personaje;
    };
    return App;
}());
