  
const datosClientes = require("./clientes.json");
const datosProveedores = require("./proveedores.json");
const axios = require("axios");
const fs = require("fs");
const http = require("http");
const path = require("path");
module.exports ={
    buildPathHtmlProveedores: path.resolve("./proveedores.html"),
    buildPathHtmlClientes: path.resolve("./clientes.html"),
  };

http.createServer((req,res)=>{
    if(req.url ==="/api/proveedores")
    {
        const url = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
        axios.get(url).then((response) => {
        fs.writeFile(
          "./proveedores.json",JSON.stringify(response.data),"utf-8",
          (err) => {
            if (err) console.log(err);
          }
        );
        fs.readFile("proveedores.json",(err,data) =>{
            if(err){
                console.log(err);
            }
            let json = JSON.parse(data);
            var rta = "";
            for (var i = 0; i < json.length; i++) {
                var obj= json[i]
                rta+=filasProveedores(obj);
              }
              const html = htmlProveedores(rta)
              res.write(html);
        });
    });
    }
    if(req.url==="/api/clientes")
    {
        const url =
        "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
      axios.get(url).then((response) => {
        fs.writeFile(
          "./clientes.json",
          JSON.stringify(response.data),
          "utf-8",
          (err) => {
            if (err) console.log(err);
          }
        );
        fs.readFile("clientes.json",(err,data) =>{
            if(err){
                console.log(err);
            }
            let json = JSON.parse(data);
            var rta = "";
            for (var i = 0; i < json.length; i++) {
                var obj= json[i]
                rta+=filasCliente(obj);
              }
              const html = htmlCliente(rta)
              res.write(html);
        });
    });
    }
}).listen(8081);

const htmlCliente = (i) => `
  <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>
    <h1 style="text-align:center">Lista Clientes</h1>
    <table class="table table-striped">
    <thead>
        <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Contacto</th>
        </tr>
    </thead>
    ${i}
    </table>
    </body>
  </html>
`;

const filasCliente = (i) => `
    <tbody>
        <tr>
            <td> <b>${i.idCliente}</b></td>
            <td>${i.NombreCompania}</td>
            <td>${i.NombreContacto}</td>
        </tr>
    </tbody>
`;




const htmlProveedores = (i) => `
  <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>
    <h1 style="text-align:center">Lista Proveedores</h1>
    <table class="table table-striped">
    <thead>
        <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Contacto</th>
        </tr>
    </thead>
    ${i}
    </table>
    </body>
  </html>
`;

const filasProveedores = (i) => `
    <tbody>
        <tr>
            <td><b>${i.idproveedor}</b></td>
            <td>${i.nombrecompania}</td>
            <td>${i.nombrecontacto}</td>
        </tr>
    </tbody>
`;
