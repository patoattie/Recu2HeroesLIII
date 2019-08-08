var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Heroe = (function (_super) {
    __extends(Heroe, _super);
    function Heroe(id, nombre, edad, alias, poder, tipo) {
        var _this = _super.call(this, id, nombre, edad) || this;
        _this.alias = alias;
        _this.poder = poder;
        _this.tipo = EHeroe[tipo];
        return _this;
    }
    Heroe.prototype.getAlias = function () {
        return this.alias;
    };
    Heroe.prototype.setAlias = function (alias) {
        this.alias = alias;
    };
    Heroe.prototype.getPoder = function () {
        return this.poder;
    };
    Heroe.prototype.setPoder = function (poder) {
        this.poder = poder;
    };
    Heroe.prototype.getTipo = function () {
        return this.tipo;
    };
    Heroe.prototype.getTipoStr = function () {
        return this.tipo;
    };
    Heroe.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    Heroe.prototype.setTipoStr = function (tipo) {
        this.setTipo(EHeroe[tipo]);
    };
    Heroe.prototype.getDinamico = function (atributo) {
        var valor;
        switch (atributo) {
            case "id":
                valor = this.getId();
                break;
            case "nombre":
                valor = this.getNombre();
                break;
            case "edad":
                valor = this.getEdad();
                break;
            case "alias":
                valor = this.getAlias();
                break;
            case "poder":
                valor = this.getPoder();
                break;
            case "tipo":
                valor = this.getTipo();
                break;
            default:
                valor = null;
                break;
        }
        return valor;
    };
    Heroe.prototype.setDinamico = function (atributo, valor) {
        switch (atributo) {
            case "id":
                this.setId(valor);
                break;
            case "nombre":
                this.setNombre(valor);
                break;
            case "edad":
                this.setEdad(valor);
                break;
            case "alias":
                this.setAlias(valor);
                break;
            case "poder":
                this.setPoder(valor);
                break;
            case "tipo":
                this.setTipo(valor);
                break;
        }
    };
    Heroe.prototype.toString = function () {
        var texto = "";
        texto += "ID: " + this.getAlias() + "\n";
        texto += "NOMBRE: " + this.getNombre() + "\n";
        texto += "EDAD: " + this.getEdad() + "\n";
        texto += "ALIAS: " + this.getAlias() + "\n";
        texto += "PODER: " + this.getPoder() + "\n";
        texto += "TIPO: " + this.getTipoStr();
        return texto;
    };
    Heroe.prototype.getAtributos = function () {
        return ["id", "nombre", "edad", "alias", "poder", "tipo"];
    };
    return Heroe;
}(Personaje));
