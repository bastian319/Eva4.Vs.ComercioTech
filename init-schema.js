db = db.getSiblingDB("ComercioTech");

db.createCollection("clientes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["rut", "nombre", "correo", "telefono", "direccion"],
      properties: {
        rut: {
          bsonType: "string",
          description: "Debe ser un texto y es obligatorio"
        },
        nombre: {
          bsonType: "string"
        },
        correo: {
          bsonType: "string"
        },
        telefono: {
          bsonType: "string"
        },
        direccion: {
          bsonType: "object",
          required: ["calle", "ciudad"],
          properties: {
            calle: {
              bsonType: "string"
            },
            ciudad: {
              bsonType: "string"
            }
          }
        }
      }
    }
  }
});

db.createCollection("productos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "codigo",
        "nombre",
        "precio",
        "stock",
        "categoria"
      ],
      properties: {
        codigo: {
          bsonType: "string"
        },
        nombre: {
          bsonType: "string"
        },
        precio: {
          bsonType: "double"
        },
        stock: {
          bsonType: "int"
        },
        categoria: {
          bsonType: "string"
        }
      }
    }
  }
});

db.createCollection("pedidos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "cliente_id",
        "fecha",
        "items",
        "total"
      ],
      properties: {
        cliente_id: {
          bsonType: "objectId"
        },
        fecha: {
          bsonType: "date"
        },
        total: {
          bsonType: "double"
        },
        items: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: [
              "producto_id",
              "cantidad",
              "precio"
            ],
            properties: {
              producto_id: {
                bsonType: "objectId"
              },
              cantidad: {
                bsonType: "int"
              },
              precio: {
                bsonType: "double"
              }
            }
          }
        }
      }
    }
  }
});

db.clientes.createIndex(
    { rut: 1 },
    { unique: true }
);

db.clientes.createIndex(
    { correo: 1 },
    { unique: true }
);

db.productos.createIndex(
    { codigo: 1 },
    { unique: true }
);

db.productos.createIndex(
    { categoria: 1 }
);

db.pedidos.createIndex(
    { cliente_id: 1 }
);

db.pedidos.createIndex(
    { fecha: -1 }
);

print("Esquema e índices creados correctamente.");
