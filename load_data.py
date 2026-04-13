import pandas as pd
from dotenv import load_dotenv
import os
import psycopg2

load_dotenv()

df = pd.read_excel('data/busqueda-listado-alg-13-4-2026.xlsx') #updated on 13/04/2026

df = df[df['Estado'] == 'VIGENTE']
df = df.drop(columns=['activo'])

df = df.rename(columns={
    'nombreFantasia': 'nombre_fantasia',
    'denominacionventa': 'denominacion_venta',
    'TipoProducto': 'tipo_producto',
    'Estado': 'estado'
})

try:
    conn = psycopg2.connect(
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )
    
    cur = conn.cursor()
    cur.execute("TRUNCATE TABLE sintacc")
    for row in df.itertuples():
        cur.execute("INSERT INTO sintacc VALUES (%s, %s, %s, %s, %s, %s, %s)", (row.id, row.rnpa, row.marca, row.nombre_fantasia, row.denominacion_venta, row.tipo_producto, row.estado))
    conn.commit()
    print("Data updated successfully")
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
