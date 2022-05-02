export class Usuario {
    email:string;
    password:string;
    dni:number;
    apellido:string;
    nombre:string;
    public constructor(apellido:string,nombre:string,dni:number,email:string,password:string )
    {
        this.apellido=apellido;
        this.dni=dni;
        this.nombre=nombre;
        this.email=email;
        this.password=password;
    }
}
