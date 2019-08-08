class Heroe extends Personaje
{
    private alias:string;
    private poder:string;
    private tipo:EHeroe;

    constructor(id?:number, nombre?:string, edad?:number, alias?:string, poder?:string, tipo?:string)
    {
        super(id, nombre, edad);

        this.alias = alias;
        this.poder = poder;
        this.tipo = EHeroe[tipo];
    }

    public getAlias():string
    {
        return this.alias;
    }

    public setAlias(alias:string):void
    {
        this.alias = alias;
    }

    public getPoder():string
    {
        return this.poder;
    }

    public setPoder(poder:string):void
    {
        this.poder = poder;
    }

    public getTipo():EHeroe
    {
        return this.tipo;
    }

    public getTipoStr():string
    {
        return this.tipo;
    }

    public setTipo(tipo:EHeroe):void
    {
        this.tipo = tipo;
    }

    public setTipoStr(tipo:string):void
    {
        this.setTipo(EHeroe[tipo]);
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
    }

    public toString():string
    {
        let texto:string = "";

        texto += "ID: " + this.getAlias() + "\n";
        texto += "NOMBRE: " + this.getNombre() + "\n";
        texto += "EDAD: " + this.getEdad() + "\n";
        texto += "ALIAS: " + this.getAlias() + "\n";
        texto += "PODER: " + this.getPoder() + "\n";
        texto += "TIPO: " + this.getTipoStr();
    
        return texto;
    }

    public getAtributos():string[]
    {
        return ["id", "nombre", "edad", "alias", "poder", "tipo"];
    }
}