<div align="center">
    <img src="/src/assets/img/logocumtual-23.webp" alt="Logo Cumtual" width="200" />
</div>

###MUY IMPORTANTE
> - La api esta siendo declarada en ingles, desde las variables hasta los nombres de las funciones, hacer buena practica y seguir con el idioma en ingles.

##NOTA
> - La devolucion de errores si tiene que ser en español por la pagina y a los usuarios que manejaremos


###IMPORTANTE
> - Favor de seguir cada una de las declaraciones de varibles para no confundirse con algo o con la extraccion de un dato.
> - Si tienen alguna duda favor de comunicarse conmigo (Josue) para poder aclararla y resolverla

###EJECUTAR LA API

	npm run dev


####VARIABLES

Las declaraciones se hace en base al tipo de valor que obtendra la variable, en la siguiente tabla adjunto algunos ejemplos...

Declaracion de Variables  | Tipo de Variable
------------- | -------------
 intValorId | Int.
strValorNombre  | String. 
datValorFecha  | DateTime. 
dblValorPrecio  | Decimal(18,2)




###GUARDADO

Aqui pongo un ejemplo de como se estaran implmentando las funciones, este caso solo haremos una funcion de guardado.
- Primer Try: 
	- En el primer const es ver las variables que estoy almacenando en el req.body que mandan desde el front.  
	- Segundo const, declaro una varibale de parametros y esa es la que se mandara al store que se declara en el siguiente try.
- Segundo Try:
	- Se hace la conexion a mi base de datos para asi poder ejecutar el store con las variables que se mandaron.
		- ¿Que significan los signos (?) ? Los signos representa la cantidad de  variables que pide el store para que lo ejecute sin ningun problema.

```javascript
export const saveLead = async (req,res) =>
		{ 
 try{
   const  {strFullName,
    strEmail,
    intTipoServ,
    intBuisness,
    strPhone,
    strScheduleContact,
    strProjectDescription} = req.body;

    console.log("These varibles send my front",req.body);

//These parameter send to store procedure
    const parameters=[strFullName,
        strEmail,
        intTipoServ,
        intBuisness,
        strPhone,
        strScheduleContact,
        strProjectDescription
    ]

   // console.log("Parameters",parameters);

    try{
         //Conection to bd
    const connection = await getConnection();
    //Execute the store procedure 
     const [results] = await connection.execute('CALL sp_tbSaveLeads(?, ?, ?, ?, ?, ?, ?)',parameters);

      // Send validate email
      await sendEmailClient(strEmail, strFullName,);
      await sendEmailCumtual(strEmail,strEmail,strProjectDescription,strPhone);
      return res.status(200).json({ message: 'Lead save' });
    }catch(error){
        console.log("Can't conection to store procedure");
    }
    
 }  catch(error){

} 
}
 ```

#### BASE DE DATOS (MYSQL)

Porfavor de seguir la misma esctructura para crear un store procedure y tambien las tablas, desde los nombres de las columnas hasta en los stores. Aqui pongo unos ejemplos de las declaraciones de los stores y tablas...
Favor de seguir los nombres de las tablas como se muestran en las tablas.

Nombre de Tablas  | Proceso que hará
------------- | ------------- |
 tbLeads | Tabla de los leads.
tbCliente  |   Tabla de clientes.

Nombre de Stores  | Proceso que hará
------------- | ------------- |
 sp_tbLeads_Save |  Store que mandara a guardar a mi tabla
sp_tbLeads_List  |  Store que enlistara la tabla de Leads (Cuando se requiera)
sp_tbLeads_Delete  | Store que eliminar cualquier lead (Cuando se requiera)


