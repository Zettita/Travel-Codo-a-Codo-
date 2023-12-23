# Instalar con pip install Flask
from flask import Flask, request, jsonify, render_template
#from flask import request

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time

#--------------------------------------------------------------------

app = Flask(__name__)
CORS(app)  # Esto habilitará CORS para todas las rutas

#--------------------------------------------------------------------

class Catalogo:
    #----------------------------------------------------------------
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.conn.cursor(dictionary=True)
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS Destinos (
        codigo INT PRIMARY KEY,
        destino VARCHAR(50) DEFAULT NULL,
        inicio_vigencia VARCHAR(20) DEFAULT NULL,
        fin_vigencia VARCHAR(20) DEFAULT NULL,
        dias INT(2) DEFAULT NULL,
        imagen_url VARCHAR(255),
        precio INT(11) DEFAULT NULL);''')
        self.conn.commit()

    def agregar_destino(self, codigo, destino, inicio_vigencia, fin_vigencia, dias, imagen, precio):
        self.cursor.execute(f"SELECT * FROM destinos WHERE codigo = {codigo}")
        destino_existe = self.cursor.fetchone()
        if destino_existe:
            return False
        sql = f"INSERT INTO destinos (codigo, destino, inicio_vigencia, fin_vigencia, dias, imagen_url, precio) VALUES ({codigo}, '{destino}', '{inicio_vigencia}','{fin_vigencia}', {dias}, '{imagen}', {precio} )"
        self.cursor.execute(sql)
        self.conn.commit()
        return True
 
    def listar_destinos(self):
        self.cursor.execute(f"SELECT * FROM destinos")
        destinos = self.cursor.fetchall()
        return destinos
    
    def eliminar_destino(self, codigo):
        self.cursor.execute(f"SELECT * FROM destinos WHERE codigo = {codigo}")
        destino_existe = self.cursor.fetchone()
        if not destino_existe:
            return False
        sql = f"DELETE FROM destinos WHERE codigo = {codigo}"
        self.cursor.execute(sql)
        self.conn.commit()
        return True
    
    def modificar_destino(self, codigo, nuevo_destino, nuevo_inicio, nuevo_fin, nuevo_dias, nueva_imagen, nuevo_precio):
        sql = "UPDATE destinos SET destino = %s, inicio_vigencia = %s, fin_vigencia = %s, dias = %s, imagen_url = %s, precio = %s WHERE codigo = %s"
        values = (nuevo_destino, nuevo_inicio, nuevo_fin, nuevo_dias, nueva_imagen, nuevo_precio, codigo)
        self.cursor.execute(sql, values)
        self.conn.commit()
        return True
    
    def consultar_destino(self, codigo):
        # Consultamos un paquete a partir de su código
        self.cursor.execute(f"SELECT * FROM destinos WHERE codigo = {codigo}")
        return self.cursor.fetchone()
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
destinos = Catalogo(host='Zettita.mysql.pythonanywhere-services.com', user='Zettita', password='bobesponja1', database='Zettita$codo_a_codo')
#--------------------------------------------------------------------

RUTA_DESTINO = './static/imagenes/'

@app.route("/destinos", methods=["GET"])
def listar_destinos():
    paquetes = destinos.listar_destinos()
    return jsonify(paquetes)

@app.route("/destinos/<int:codigo>", methods=["GET"])
def listar_destino(codigo):
    destino = destinos.consultar_destino(codigo)
    if destino:
        return jsonify(destino), 201
    else:
        return "Destino no encontrado", 404

@app.route("/destinos", methods=["POST"])
def agregar_destino():
    codigo = request.form["codigo"]
    lugar = request.form["destino"]
    inicio_vigencia = request.form["inicio_vigencia"]
    fin_vigencia = request.form["fin_vigencia"]
    dias = request.form["dias"]
    imagen = request.files["imagen_url"]
    precio = request.form["precio"]
    nombre_imagen = ""

    destino = destinos.consultar_destino(codigo)
    if not destino:
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    
        if destinos.agregar_destino(codigo, lugar, inicio_vigencia, fin_vigencia, dias, nombre_imagen, precio):
            imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))
            return jsonify({"mensaje": "Paquete agregado correctamente"}), 201
        else:
            return jsonify({"mensaje": "error al agregar nuevo paquete"}), 400
    else:
        return False
    
@app.route("/destinos/<int:codigo>", methods=["PUT"])
def modificar_destino(codigo):
    nuevo_destino = request.form.get("destino")
    nuevo_inicio = request.form.get("inicio_vigencia")
    nuevo_fin = request.form.get("fin_vigencia")
    nuevo_dias = request.form.get("dias")
    nueva_imagen = request.files["imagen_url"]
    nuevo_precio = request.form.get("precio")

    nombre_imagen = secure_filename(nueva_imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    nueva_imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))

    destino = destinos.consultar_destino(codigo)
    if destino:
        imagen_vieja = destino["imagen_url"]
        # Armo la ruta a la imagen
        ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)

        # Y si existe la borro.
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)


    if destinos.modificar_destino(codigo, nuevo_destino, nuevo_inicio, nuevo_fin, nuevo_dias, nombre_imagen, nuevo_precio):
        return jsonify({"mensaje" : "destino modificado correctamente"}), 200
    else:
        return jsonify({"mensaje" : "No se pudo modificar el destino"}), 400


@app.route("/destinos/<int:codigo>", methods=["DELETE"])
def eliminar_destino(codigo):
    destino = destinos.consultar_destino(codigo)
    if destino:
        imagen_vieja = destino["imagen_url"]
        # Armo la ruta a la imagen
        ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)

        # Y si existe la borro.
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)

    if destinos.eliminar_destino(codigo):
        return jsonify({"mensaje": "destino eliminado"}), 200
    else:
        return jsonify({"mensaje": "Error al eliminar el destino"}), 500


if __name__ == "__main__":
    app.run(debug=True)
#print(destinos.eliminar_destino(2))
#destinos.modificar_destino(1, "Cordoba", "octubre", "diciembre", 14,"imagen", 111222)