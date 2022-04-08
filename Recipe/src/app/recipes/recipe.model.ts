import { ingrediente } from "../shared/ingredientes.model";

export class Recipe{
    public nome: string;
    public descricao:string;
    public imagePath:string;
    public ingredientes? : ingrediente[];
    constructor(nome:string, desc:string, imagePath:string, ingredientes:ingrediente[]){
        this.ingredientes=ingredientes;
        this.nome=nome;
        this.descricao=desc;
        this.imagePath=imagePath;
    }
}