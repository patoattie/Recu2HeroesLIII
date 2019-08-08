//npm i @types/jquery
//import $ from "jquery";

window.onload = () => 
{
    App.asignarManejadores();
};
//$("document").ready(App.asignarManejadores);

class App
{
    //Al dispararse el evento load cuando se termina de cargar la página web, 
    //se instancian los manejadores del evento click de los tres botones del menú.
    public static asignarManejadores():void
    {
        /*$("#btnGetPersonajes").on("click", App.traerPersonajes);
        $("#btnAltaPersonaje").on("click", App.altaPersonaje);
        $("#btnEditarPersonaje").on("click", App.editarPersonaje);*/

        //Si el elemento está deshabilitado (tiene el atributo aria-disabled) entonces bloqueo el evento click
        $("#btnGetPersonajes").on("click", function(event)
        {
            if(event.target.getAttribute("aria-disabled"))
            {
                event.preventDefault();
            }
            else
            {
                App.traerPersonajes()
            }
        });
        $("#btnAltaPersonaje").on("click", function(event)
        {
            if(event.target.getAttribute("aria-disabled"))
            {
                event.preventDefault();
            }
            else
            {
                App.altaPersonaje();
            }
        });
        $("#btnEditarPersonaje").on("click", function(event)
        {
            if(event.target.getAttribute("aria-disabled"))
            {
                event.preventDefault();
            }
            else
            {
                App.editarPersonaje();
            }
        });
        $("#btnLimpiar").on("click", function(event)
        {
            if(event.target.getAttribute("aria-disabled"))
            {
                event.preventDefault();
            }
            else
            {
                localStorage.setItem("ID", "20000");
                localStorage.setItem("personajes", "[{}]");
                localStorage.removeItem("personajeSeleccionado");
            }
        });
    }

    //Llama a la función traerPersonajes del localStorage, luego con los datos devueltos se crean en el DOM la tabla y el formulario de edición.
    public static traerPersonajes():void
    {
        App.habilitarMenu($("#btnGetPersonajes"));
        App.activarMenu($("#btnGetPersonajes"));
        //$("#info").html("");
        $("#info").empty();
    
        let personajes:Heroe[] = App.cargarArrayPersonajes();

        App.crearFiltros(personajes);
        App.crearTabla(personajes);
        App.crearFormulario(personajes);
    
        //$("#btnGetPersonajes").css("pointer-events", "auto");
        //$("#btnAltaPersonaje").css("pointer-events", "auto");
        App.habilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        App.calcularPromedio(personajes);
    }
    
    public static activarMenu(elemento:JQuery<HTMLElement>):void
    {        
        elemento.parent().addClass("active");
    }

    public static desactivarMenu(elemento:JQuery<HTMLElement>):void
    {        
        elemento.parent().removeClass("active");
    }

    public static habilitarMenu(elemento:JQuery<HTMLElement>):void
    {        
        elemento.removeClass("disabled");
        elemento.parent().removeClass("disabled");
        elemento.css("cursor", "");
        elemento.removeAttr("aria-disabled");
    }
    
    //https://css-tricks.com/how-to-disable-links/
    public static deshabilitarMenu(elemento:JQuery<HTMLElement>):void
    {        
        elemento.addClass("disabled");
        elemento.parent().addClass("disabled");
        elemento.css("cursor", "not-allowed");
        elemento.attr("aria-disabled", "true");
    }

    public static cargarArrayPersonajes():Heroe[]
    {
        let personajes:Heroe[] = [];
        let storage:Heroe[] = JSON.parse(localStorage.getItem("personajes"));
    
        if(storage == null || storage[0] == undefined) //Si el servidor no trae nada creo la estructura vacía.
        {
            personajes[0] = new Heroe();
        }
        else
        {
            for(let i:number = 0; i < storage.length; i++)
            {
                personajes[i] = new Heroe(storage[i]["id"], storage[i]["nombre"], storage[i]["edad"], storage[i]["alias"], storage[i]["poder"], storage[i]["tipo"]);
            }
        }
    
        return personajes;
    }

    public static cargarPersonajeSeleccionado():Heroe
    {
        let storage:Heroe = JSON.parse(localStorage.getItem("personajeSeleccionado"));
        let personajeSeleccionado:Heroe = new Heroe(storage["id"], storage["nombre"], storage["edad"], storage["alias"], storage["poder"], storage["tipo"]);
    
        return personajeSeleccionado;
    }

    //Oculta la tabla de personajes, y muestra el formulario invocando la función pertinente
    //sin parámetro. Lo invoca la opción de Alta del menú
    public static altaPersonaje():void
    {
        let personajes:Heroe[] = App.cargarArrayPersonajes();

        //App.activarMenu($("#btnAltaPersonaje"));

        //$("#btnAltaPersonaje").css("pointer-events", "none");
        //$("#btnEditarPersonaje").css("pointer-events", "none");
        App.deshabilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        App.desactivarMenu($("#btnGetPersonajes"));

        $("#tablaPersonajes").css("display","none");
        $("#divFiltrosPersonajes").css("display","none");
        $("#formularioPersonajes").css("display","initial");

        App.mostrarFormulario(personajes);
    }

    //Oculta la tabla de personajes, y muestra el formulario invocando la función pertinente
    //pasándole por parámetro la personaje que se quiere editar. Lo invoca la opción de Editar del menú
    public static editarPersonaje():void
    {
        let personajes:Heroe[] = App.cargarArrayPersonajes();

        //App.activarMenu($("#btnEditarPersonaje"));

        //$("#btnAltaPersonaje").css("pointer-events", "none");
        //$("#btnEditarPersonaje").css("pointer-events", "none");
        App.deshabilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        App.desactivarMenu($("#btnGetPersonajes"));

        $("#tablaPersonajes").css("display","none");
        $("#divFiltrosPersonajes").css("display","none");
        $("#formularioPersonajes").css("display","initial");

        App.mostrarFormulario(personajes, App.cargarPersonajeSeleccionado());
    }

    public static crearFiltros(personajes:Heroe[]):void
    {
        let div:JQuery<HTMLElement> = $("#info");

        div.append("<div id=divFiltrosPersonajes>");
        let divFiltroPersonajes:JQuery<HTMLElement> = $("#divFiltrosPersonajes");

        //Titulo Filtro Tipo
        divFiltroPersonajes.append("<div id=divFilaFiltros1>");
        let divFilaFiltros1:JQuery<HTMLElement> = $("#divFilaFiltros1");
        divFilaFiltros1.addClass("row bg-danger");
        divFilaFiltros1.append("<h5 id=TituloFiltros>");
        $("#TituloFiltros").addClass("col-sm-12 text-center");
        $("#TituloFiltros").text("Filtros");

        divFiltroPersonajes.append("<div id=divFilaFiltros2>");
        let divFilaFiltros2:JQuery<HTMLElement> = $("#divFilaFiltros2");
        divFilaFiltros2.addClass("row bg-danger");

        //Filtro de Tipo
        divFilaFiltros2.append("<div id=divFiltroTipo>");
        let divFiltroTipo:JQuery<HTMLElement> = $("#divFiltroTipo");
        divFiltroTipo.addClass("col-sm-6");

        divFiltroTipo.append("<label id=labelFiltroTipo>");
        let labelFiltroTipo:JQuery<HTMLElement> = $("#labelFiltroTipo");
        labelFiltroTipo.attr("for", "filtroTipo");
        labelFiltroTipo.text("Filtrar por");

        divFiltroTipo.append("<select id=filtroTipo>");
        let filtroTipo:JQuery<HTMLElement> = $("#filtroTipo");
        filtroTipo.addClass("form-control-inline col-sm-6");
        filtroTipo.append("<option id=opcionTodos>");
        filtroTipo.on("change", function()
        {
            let personajesFiltrados:Heroe[] = App.filtrarPersonajes(App.cargarArrayPersonajes());
            $("#tablaPersonajes").empty();
            App.crearTabla(personajesFiltrados);
        });
        $("#opcionTodos").text("Todos");

        for(let unHeroe in EHeroe)
        {
            if(isNaN(Number(unHeroe))) //Para que no traiga los índices
            {
                filtroTipo.append("<option id=opcion" + unHeroe + ">");
                $("#opcion" + unHeroe).text(unHeroe);
            }
        }

        //Promedio de Edad
        divFilaFiltros2.append("<div id=divPromedioEdad>");
        let divPromedioEdad:JQuery<HTMLElement> = $("#divPromedioEdad");
        divPromedioEdad.addClass("col-sm-6");

        divPromedioEdad.append("<label id=labelPromedioEdad>");
        let labelPromedioEdad:JQuery<HTMLElement> = $("#labelPromedioEdad");
        labelPromedioEdad.attr("for", "promedioEdad");
        labelPromedioEdad.text("Promedio de Edad");

        divPromedioEdad.append("<input id=promedioEdad>");
        let promedioEdad:JQuery<HTMLElement> = $("#promedioEdad");
        promedioEdad.attr("type", "text");
        //promedioEdad.addClass("form-control-inline");
        promedioEdad.prop("readonly", true);
        promedioEdad.append("<option id=opcionTodos>");

        //Titulo Filtro Campos
        divFiltroPersonajes.append("<div id=divFilaCampos1>");
        let divFilaCampos1:JQuery<HTMLElement> = $("#divFilaCampos1");
        divFilaCampos1.addClass("row bg-warning");
        divFilaCampos1.append("<h5 id=TituloCampos>");
        $("#TituloCampos").addClass("col-sm-12 text-center");
        $("#TituloCampos").text("Campos mostrados (tildar los campos a mostrar)");

        divFiltroPersonajes.append("<div id=divFilaCampos2>");
        let divFilaCampos2:JQuery<HTMLElement> = $("#divFilaCampos2");
        divFilaCampos2.addClass("row bg-warning");

        //Filtro de Campos
        personajes[0].getAtributos().forEach(function(value:string):void
        {
            divFilaCampos2.append("<div id=divCampo" + value + ">");
            let divCampo:JQuery<HTMLElement> = $("#divCampo" + value);
            divCampo.addClass("col-sm-1")

            divCampo.append("<input id=campo" + value + ">");
            let campo:JQuery<HTMLElement> = $("#campo" + value);
            campo.attr("type", "checkbox");
            campo.attr("value", value);
            campo.prop("checked", true);

            campo.on("change", function()
            {
                let personajesFiltrados:Heroe[] = App.filtrarPersonajes(App.cargarArrayPersonajes());
                $("#tablaPersonajes").empty();
                App.crearTabla(personajesFiltrados);
            });

            divCampo.append("<label id=etiquetaCampo" + value + ">");
            let etiquetaCampo:JQuery<HTMLElement> = $("#etiquetaCampo" + value);
            etiquetaCampo.attr("for", value);
            etiquetaCampo.text(value);
        });
    }

    //Crea la tabla de personajes en el div info
    public static crearTabla(personajes:Heroe[]):void
    {
        let puedeCrearDetalle:boolean = true; //Si no tengo elementos desde el servidor cambia a false.
        let div:JQuery<HTMLElement> = $("#info");

        div.append("<div id=divTablaPersonajes>");
        
        //div.append("<table>");
        $("#divTablaPersonajes").append("<table id=tablaPersonajes>")
        //let tablaPersonajes:JQuery<HTMLElement> = $("#info").children("table");
        let tablaPersonajes:JQuery<HTMLElement> = $("#tablaPersonajes");

        //tablaPersonajes.attr("id", "tablaPersonajes");
        //$("#tablaPersonajes").attr("border", "1px");
        $("#tablaPersonajes").addClass("tablaPersonajes");
        $("#tablaPersonajes").addClass("table");
        //$("#tablaPersonajes").addClass("table-responsive");
        $("#tablaPersonajes").addClass("table-striped");
        $("#tablaPersonajes").addClass("table-bordered");   
        $("#tablaPersonajes").addClass("table-hover");   
        //$("#tablaPersonajes").css("border-collapse", "collapse");

        if(personajes[0].getId() == null) //Si el servidor no trae nada creo la estructura vacía.
        {
            puedeCrearDetalle = false;
        }

        App.crearCabecera(personajes, tablaPersonajes);

        if(puedeCrearDetalle)
        {
            App.crearDetalle(tablaPersonajes, personajes);
        }
    }

    //Crea el formulario de edición de personajes en el div info.
    //El atributo id lo crea como solo lectura, ya que el servidor en el alta lo deduce,
    //y en la modificación no se altera su valor.
    public static crearFormulario(personajes:Heroe[]):void
    {
        let div:JQuery<HTMLElement> = $("#info");

        //div.append("<form id=formularioPersonajes>");
        div.append("<div id=infoForm>");
        $("#infoForm").addClass("container");
        $("#infoForm").append("<form id=formularioPersonajes>");
        let formulario:JQuery<HTMLElement> = $("#formularioPersonajes")
        //formulario.attr("action", "#");
        formulario.css("display", "none");

        formulario.on("submit", function(event)
        {
            event.preventDefault();

            if($("#btnAgregar").css("display") !== "none")
            {
                App.opcionAgregarPersonaje();
            }
            else if($("#btnModificar").css("display") !== "none")
            {
                App.opcionModificarPersonaje();
            }
        });

        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function(value:string):void
        {
            switch(value)
            {
                case "tipo":
                    formulario.append("<fieldset id=grupoTipo>");
                    //grupo.append("<div id=grupoTipo>");
                    let grupoTipo:JQuery<HTMLElement> = $("#grupoTipo");
                    grupoTipo.addClass("form-group");

                    grupoTipo.append("<div id=grupoTipo2>");
                    let grupoTipo2:JQuery<HTMLElement> = $("#grupoTipo2");
                    grupoTipo2.addClass("row");

                    //grupoTipo.append("<legend id=leyendaTipo>");
                    //grupoTipo.append("<h5 id=leyendaTipo>");
                    grupoTipo2.append("<legend id=leyendaTipo>");
                    let leyendaTipo:JQuery<HTMLElement> = $("#leyendaTipo");
                    leyendaTipo.addClass("col-form-label col-sm-2 pt-0");
                    leyendaTipo.text("Tipo");

                    grupoTipo2.append("<div id=grupoTipo3>");
                    let grupoTipo3:JQuery<HTMLElement> = $("#grupoTipo3");
                    grupoTipo3.addClass("col-sm-10");

                    grupoTipo.addClass("grupoInterno");

                    for(let unTipo in EHeroe)
                    {
                        if(isNaN(Number(unTipo))) //Para que no traiga los índices
                        {
                            grupoTipo3.append("<div id=grupoTipo" + unTipo + ">");
                            let grupoTipo4:JQuery<HTMLElement> = $("#grupoTipo" + unTipo);
                            grupoTipo4.addClass("form-check");
                            grupoTipo4.append("<input id=opt" + unTipo + ">");
                            let optButton:JQuery<HTMLElement> = $("#opt" + unTipo);
                            grupoTipo4.append("<label id=etiqueta" + unTipo + ">");

                            let etiquetaTipo:JQuery<HTMLElement> = $("#etiqueta" + unTipo);
                            etiquetaTipo.attr("for", "opt" + unTipo);
                            etiquetaTipo.text(unTipo);
                            //etiquetaTipo.addClass("form-check");
                            etiquetaTipo.addClass("form-check-label");
                            //etiquetaTipo.append("<input id=opt" + unTipo + ">");
                            //let optButton:JQuery<HTMLElement> = $("#opt" + unTipo);

                            optButton.attr("type", "radio");
                            optButton.attr("name", "tipo");
                            optButton.attr("value", unTipo);
                            optButton.addClass("form-check-input");
                            //optButton.text(" " + unTipo);

                            //grupoTipo.append("<br>");
                        }
                    }

                    break;

                default:
                    //formulario.append("<fieldset id=grupo>");
                    formulario.append("<div id=grupo" + value + ">");
                    let grupo:JQuery<HTMLElement> = $("#grupo" + value);
                    
                    grupo.addClass("form-group row");
                    //grupo.append("<legend id=leyenda>");
                    //grupo.append("<h5 id=leyenda>");
                    //let leyenda:JQuery<HTMLElement> = $("#leyenda");
                    //leyenda.text("Heroe");

                    let atributoCapitalizado:string = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula

                    grupo.append("<label id=etiqueta" + value + ">");
                    let etiqueta:JQuery<HTMLElement> = $("#etiqueta" + value);
                    etiqueta.addClass("col-sm-2 col-form-label");
                    etiqueta.attr("for", "txt" + atributoCapitalizado);
                    etiqueta.text(atributoCapitalizado/* + ": "*/);

                    //grupo.append("<input id=txt" + atributoCapitalizado + ">");
                    //let cuadroTexto:JQuery<HTMLElement> = $("#txt" + atributoCapitalizado);

                    grupo.append("<div id=grupoInput" + value + ">");
                    let grupoInput:JQuery<HTMLElement> = $("#grupoInput" + value);
                    grupoInput.addClass("col-sm-10");
            
                    grupoInput.append("<input id=txt" + atributoCapitalizado + ">");
                    let cuadroTexto:JQuery<HTMLElement> = $("#txt" + atributoCapitalizado);

                    if(value === "edad")
                    {
                        cuadroTexto.attr("type", "number");
                    }
                    else
                    {
                        cuadroTexto.attr("type", "text");
                    }
                    cuadroTexto.prop("required", true);
                    cuadroTexto.attr("placeholder", "Ingrese " + value);
                    cuadroTexto.addClass("form-control");

                    if(value === "id")
                    {
                        cuadroTexto.attr("readonly", "");
                    }

                    break;
            }
        });

        /*formulario.append("<div id=grupoButton>");
        let grupoButton:JQuery<HTMLElement> = $("#grupoButton");
        grupoButton.addClass("form-group row");*/

        formulario.append("<button id=btnAgregar>");
        let btnAgregar:JQuery<HTMLElement> = $("#btnAgregar");
        formulario.append("<button id=btnModificar>");
        let btnModificar:JQuery<HTMLElement> = $("#btnModificar");
        formulario.append("<button id=btnBorrar>");
        let btnBorrar:JQuery<HTMLElement> = $("#btnBorrar");
        formulario.append("<button id=btnCancelar>");
        let btnCancelar:JQuery<HTMLElement> = $("#btnCancelar");

        btnAgregar.attr("type", "submit");
        btnAgregar.text("Agregar");
        btnAgregar.addClass("btn btn-primary");
        btnAgregar.css("margin", "2px");
        //btnAgregar.on("click", App.opcionAgregarPersonaje);

        btnModificar.attr("type", "submit");
        btnModificar.text("Modificar");
        btnModificar.addClass("btn btn-primary");
        btnModificar.css("margin", "2px");
        //btnModificar.on("click", App.opcionModificarPersonaje);

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
    }

    //Arma el formulario de edición de personajes.
    //Si no se le pasa parámetro asume que se trata de un alta, para ello muestra la opción
    //que invoca la función de alta en el servidor y los cuadros de texto de los parámetros
    //en blanco.
    //Si se invoca con un objeto, la función asume modificación o baja de la personaje que viene
    //por parámetro, mostrando los botones que invocan las funciones respectivas en el servidor,
    //y completa los cuadros de texto con los valores de cada atributo.
    public static mostrarFormulario(personajes:Heroe[], personajeSeleccionado?:Heroe):void
    {
        if(personajeSeleccionado !== undefined) //Es distinto de undefined si vino un argumento en los parámetros formales de la función.
        {
            $("#btnAgregar").css("display","none");
            $("#btnModificar").css("display","initial");
            $("#btnBorrar").css("display","initial");
        }
        else
        {
            $("#btnAgregar").css("display","initial");
            $("#btnModificar").css("display","none");
            $("#btnBorrar").css("display","none");
        }

        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function(value:string):void
        {
            let atributoCapitalizado:string = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula

            switch(value)
            {
                case "tipo":
                    if(personajeSeleccionado !== undefined) //Modificar o Borrar
                    {
                        for(let unTipo in EHeroe)
                        {
                            if(isNaN(Number(unTipo)))
                            {
                                if(unTipo == personajeSeleccionado.getTipo())
                                {
                                    $("#opt" + unTipo).prop("checked", true);
                                }
                                else
                                {
                                    $("#opt" + unTipo).prop("checked", false);
                                }
                            }
                        }
                    }
                    else //Agregar
                    {
                        for(let unTipo in EHeroe)
                        {
                            if(isNaN(Number(unTipo)))
                            {
                                if(unTipo == EHeroe.Avenger)
                                {
                                    $("#opt" + unTipo).prop("checked", true);
                                }
                                else
                                {
                                    $("#opt" + unTipo).prop("checked", false);
                                }
                            }
                        }
                    }
                    break;
                    
                default:
                    if(personajeSeleccionado !== undefined)
                    {
                        $("#txt" + atributoCapitalizado).val(personajeSeleccionado.getDinamico(value));
                    }
                    else
                    {
                        if(value === "id")
                        {
                            $("#txt" + atributoCapitalizado).val(Heroe.getProximoId());
                        }
                        else
                        {
                            $("#txt" + atributoCapitalizado).val("");
                        }
                    }
                    break;
            }
        });
    }

    //Oculta el formulario de edición y muestra la tabla de personajes.
    //Se blanquea cualquier fila que se haya previamente seleccionado.
    public static ocultarFormulario():void
    {
        //$("#btnAltaPersonaje").css("pointer-events", "auto");
        App.habilitarMenu($("#btnAltaPersonaje"));
        //$("#btnEditarPersonaje").css("pointer-events", "none");
        App.deshabilitarMenu($("#btnEditarPersonaje"));

        App.blanquearFila();

        $("#tablaPersonajes").css("display","table");
        $("#divFiltrosPersonajes").css("display","block");
        $("#formularioPersonajes").css("display","none");

        App.activarMenu($("#btnGetPersonajes"));
    }

    //Crea la fila de cabecera, con tantas columnas como atributos posea la personaje, en la tabla de personajes.
    public static crearCabecera(personajes:Heroe[], tablaPersonajes:JQuery<HTMLElement>):void
    {
        //tablaPersonajes.append("<tr id=filaCabecera>");
        tablaPersonajes.append("<thead id=thead1>");
        $("#thead1").append("<tr id=filaCabecera>");
        //tablaPersonajes.append("<div id=filaCabecera>");
        let fila:JQuery<HTMLElement> = $("#filaCabecera");
        //fila.addClass("row");

//datosMap

        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function(value:string):void
        {
            //fila.append("<th>" + value);
            if(personajes[0].getDinamico(value) != undefined)
            {
                fila.append("<th id=ColumnaCabecera" + value + ">" + value);
            }
            //fila.append("<div id=ColumnaCabecera" + value + ">" + value);
            //$("#ColumnaCabecera" + value).addClass("col-sm-2");
        });
    }

    //Crea tantas fila de detalle en la tabla de personajes como personajes haya cargadas.
    public static crearDetalle(tablaPersonajes:JQuery<HTMLElement>, datos:Heroe[]):void
    {
        let filaDetalle:JQuery<HTMLElement>;
        tablaPersonajes.append("<tbody id=tbody1>");

//datosMap

        //let datosFilter:Heroe[] = App.filtrarPersonajes(datos);

        for(let i:number = 0; i < datos.length; i++)
        {
            //tablaPersonajes.append("<tr id=filaDetalle" + i + ">");
            $("#tbody1").append("<tr id=filaDetalle" + datos[i].getId() + ">");
            //tablaPersonajes.append("<div id=filaDetalle" + i + ">");
            filaDetalle = $("#filaDetalle" + datos[i].getId());
            //filaDetalle.addClass("row");
            //let columna;
            filaDetalle.on("click", App.seleccionarFila);

            //for(let atributo in datos[i].getAtributos())
            datos[i].getAtributos().forEach(function(value:string):void
            {
                //filaDetalle.append("<td>");
                //columna = filaDetalle.children("td");
                //columna.attr("class", value);
                if(datos[i].getDinamico(value) != undefined)
                {
                    filaDetalle.append("<td id=ColumnaDetalle" + value + datos[i].getId() + ">" + datos[i].getDinamico(value));
                    //filaDetalle.append("<div id=ColumnaDetalle" + value + i + ">" + datos[i].getDinamico(value));
                    //columna = filaDetalle.children("td");
                    //$("#ColumnaDetalle" + value + i).attr("class", value);
                    $("#ColumnaDetalle" + value + datos[i].getId()).addClass(value);
                    //$("#ColumnaDetalle" + value + i).addClass("col-sm-2");
                }
            });
        }
    }

    public static filtrarPersonajes(datos:Heroe[]):Heroe[]
    {
        let datosFilter:Heroe[] = datos.filter(function(value:Heroe)
        {
            return (value.getTipoStr() == $("#filtroTipo").val() || $("#filtroTipo").val() == "Todos");
        }).map(function(value:Heroe)
        {
            let id:number = null;
            let nombre:string = null;
            let edad:number = null;
            let alias:string = null;
            let poder:string = null;
            let tipo:EHeroe = null;

            if($("#campoid").prop("checked"))
            {
                id = value.getId();
            }
            if($("#camponombre").prop("checked"))
            {
                nombre = value.getNombre();
            }
            if($("#campoedad").prop("checked"))
            {
                edad = value.getEdad();
            }
            if($("#campoalias").prop("checked"))
            {
                alias = value.getAlias();
            }
            if($("#campopoder").prop("checked"))
            {
                poder = value.getPoder();
            }
            if($("#campotipo").prop("checked"))
            {
                tipo = value.getTipo();
            }

            return new Heroe(id, nombre, edad, alias, poder, tipo);
        });

        if(datosFilter.length == 0)
        {
            datosFilter[0] = new Heroe();
        }

        App.calcularPromedio(datosFilter);

        return datosFilter;
    }

    public static calcularPromedio(datos:Heroe[]):void
    {
        let edades:number[] = [];

        datos.forEach(element => 
        {
            edades.push(Number(element.getEdad()));
        });
        let promedioEdad:number = edades.reduce(function(previo:number, actual:number)
        {
            return previo + actual;
        }, 0);

        $("#promedioEdad").attr("value", promedioEdad / datos.length);
    }

    //Quita el atributo id de la fila seleccionada.
    public static blanquearFila():void
    {
        $("#filaSeleccionada").removeClass("table-primary");
        $("#filaSeleccionada").removeAttr("id");
        localStorage.removeItem("personajeSeleccionado");
    }

    //Cuando el usuario hace click en una fila de detalle de la tabla de personajes,
    //la función le setea, previo a blanquear si hay otra fila antes seleccionada, 
    //el atributo id a la fila y carga la personaje en el array de personaje seleccionada.
    public static seleccionarFila():void
    {
        let filaActual:JQuery<App> = $(this);
        //let personajeSeleccionado:Heroe = App.cargarPersonajeSeleccionado();
        let personajeSeleccionado:Heroe = new Heroe();
        //$("#btnEditarPersonaje").removeAttr("disabled");
        //$("#btnEditarPersonaje").css("pointer-events", "auto");
        App.habilitarMenu($("#btnEditarPersonaje"));
        App.blanquearFila();
        
        filaActual.attr("id", "filaSeleccionada");
        filaActual.addClass("table-primary");

        //Recorro las columnas de la fila seleccionada, guardando un atributo por columna en personajeSeleccionado.
        filaActual.children().each(function()
        {
            //personajeSeleccionado[$(this).attr("class")] = $(this).text();
            personajeSeleccionado.setDinamico($(this).attr("class"), $(this).text());
        });

        localStorage.setItem("personajeSeleccionado", JSON.stringify(personajeSeleccionado));
    }

    //Llamador usado por el evento dla opción de Agregar del formulario
    public static opcionAgregarPersonaje():void
    {
        let personajes:Heroe[] = App.cargarArrayPersonajes();

        App.agregarPersonaje(personajes, App.personajeEditado(personajes));
    }

    //Llamador usado por el evento dla opción de Borrar del formulario
    public static opcionBorrarPersonaje():void
    {
        let personajes:Heroe[] = App.cargarArrayPersonajes();

        App.borrarPersonaje(personajes, App.cargarPersonajeSeleccionado());
    }

    //Llamador usado por el evento de la opción de Modificar del formulario
    public static opcionModificarPersonaje():void
    {
        let personajes:Heroe[] = App.cargarArrayPersonajes();

        App.modificarPersonaje(personajes, App.cargarPersonajeSeleccionado(), App.personajeEditado(personajes));
    }

    //Llama a la función altaPersonaje del servidor, pasándole el objeto que se quiere agregar por parámetro.
    public static agregarPersonaje(personajes:Heroe[], personaje:Heroe):void
    {
        let nuevoPersonaje:Heroe[] = [];

        personaje.setId(Heroe.getProximoId());

        nuevoPersonaje.push(personaje);
        App.ocultarFormulario();
        App.crearDetalle($("#tablaPersonajes"), nuevoPersonaje);

        if(personajes[0].getId() == null)
        {
            personajes[0] = personaje;
        }
        else
        {
            personajes.push(personaje);
        }

        localStorage.setItem("personajes", JSON.stringify(personajes));
        Heroe.setProximoId();
    }

    //Llama a la función bajaPersonaje del servidor, pasándole el objeto que se quiere eliminar por parámetro.
    public static borrarPersonaje(personajes:Heroe[], personaje:Heroe):void
    {
        /*let index:number = personajes.findIndex((per) => 
        {
            return per.id == personaje.getId();
        });*/

        if(confirm("¿Confirma el borrado del Heroe?\n\n" + personaje.toString()))
        {
                let posicion:number = -1;
                
                personajes.forEach(function(value:Heroe, index:number)
                {
                if(value.getId() == personaje.getId())
                {
                    posicion = index;
                }
            });
            
            if (posicion != -1)
            {
                personajes.splice(posicion, 1);

                alert("Heroe:\n\n" + personaje.toString() + "\n\nfue borrada de la tabla");
                
                $("#filaSeleccionada").remove();
            }
            
            App.ocultarFormulario();
            
            localStorage.setItem("personajes", JSON.stringify(personajes));
        }
    }

    //Llama a la función modificarPersonaje del servidor, pasándole el objeto que se quiere modificar por parámetro.
    public static modificarPersonaje(personajes:Heroe[], personaPre:Heroe, personaPost:Heroe):void
    {
        /*let index:number = personajes.findIndex((per) => 
        {
            return per.id == personaPost.getId();
        });*/
    
        if(confirm("¿Confirma la modificacion del Heroe?\n\n" + personaPre.toString() + "\n\na\n\n" + personaPost.toString()))
        {
            let posicion:number = -1;

            personajes.forEach(function(value:Heroe, index:number)
            {
                if(value.getId() == personaPost.getId())
                {
                    posicion = index;
                }
            });

            if (posicion != -1)
            {
                personajes.splice(posicion, 1);
                personajes.push(personaPost);

                alert("Heroe:\n\n" + personaPre.toString() + "\n\nfue modificada a:\n\n" + personaPost.toString());
                App.modificarFilaSeleccionada(personaPost);
            }
        
            App.ocultarFormulario();

            localStorage.setItem("personajes", JSON.stringify(personajes));
        }
    }

    //Modifica los datos de la fila seleccionada con los datos de la personaje pasada por parámetro.
    //Esta función la invoca la opción de modificar una personaje del servidor,
    //una vez devuelto el ok del mismo.
    public static modificarFilaSeleccionada(datos:Heroe):void
    {
        let filaSeleccionada:JQuery<HTMLElement> = $("#filaSeleccionada");

        //Recorro las columnas de la fila seleccionada, guardando un atributo por columna en personajeSeleccionado.
        //for(var i = 0; i < filaSeleccionada.children().length; i++)
        filaSeleccionada.children().each(function()
        {
            //$(this).text(datos[$(this).attr("class")]);
            $(this).text(datos.getDinamico($(this).attr("class")));
        });
    }

    //Crea un objeto JSON a partir de los datos del formulario
    public static personajeEditado(personajes:Heroe[]):Heroe
    {
        let personaje:Heroe = new Heroe();

        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function(value:string):void
        {
            switch(value)
            {
                case "tipo":
                    let valor2:string = String($('input[name="tipo"]:checked').val());
                    personaje.setTipoStr(valor2);
                    break;
                default:
                    let atributoCapitalizado:string = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula
                    personaje.setDinamico(value, $("#txt" + atributoCapitalizado).val());
                    break;
            }
        });

        return personaje;
    }
}