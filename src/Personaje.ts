class Personaje
{
    protected id:number;
    protected nombre:string;
    protected edad:number;

    constructor(id?:number, nombre?:string, edad?:number)
    {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
    }

    public static getProximoId():number
    {
        let proximoID:number = Number(localStorage.getItem("ID"));

        if(isNaN(proximoID) || proximoID == 0)
        {
            proximoID = 20000;
        }

        return proximoID;
    }

    public static setProximoId():void
    {
        let proximoID:number = this.getProximoId();
        proximoID++;

        localStorage.setItem("ID", String(proximoID));
    }

    public getId():number
    {
        return this.id;
    }

    public setId(id:number):void
    {
        this.id = id;
    }

    public getNombre():string
    {
        return this.nombre;
    }

    public setNombre(nombre:string):void
    {
        this.nombre = nombre;
    }

    public getEdad():number
    {
        return this.edad;
    }

    public setEdad(edad:number):void
    {
        this.edad = edad;
    }

    public getDinamico(atributo:string):any
    {
        let valor:any;

        switch(atributo)
        {
            case "id":
                valor = this.getId();
                break;
            case "nombre":
                valor = this.getNombre();
                break;
            case "edad":
                valor = this.getEdad();
                break;
            default:
                valor = null;
                break;
        }

        return valor;
    }

    public setDinamico(atributo:string, valor:any):void
    {
        switch(atributo)
        {
            case "id":
                this.setId(valor);
                break;
            case "nombre":
                this.setNombre(valor);
                break;
            case "edad":
                this.setEdad(valor);
                break;
        }
    }

    public toString():string
    {
        let texto:string = "";

        texto += "ID: " + this.getId() + "\n";
        texto += "NOMBRE: " + this.getNombre() + "\n";
        texto += "EDAD: " + this.getEdad();
    
        return texto;
    }

    public getAtributos():string[]
    {
        return ["id", "nombre", "edad"];
    }
}