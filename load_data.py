import pandas as pd
from dotenv import load_dotenv
import os
import psycopg2
import requests
from bs4 import BeautifulSoup

load_dotenv()

#get the xlsx file with all the alg info from ANMAT's website
def download_file():
    get_website_info = requests.get('https://listadoalg.anmat.gob.ar/Home')
    get_website_info.raise_for_status()
    soup = BeautifulSoup(get_website_info.content, "html.parser")
    viewstate = soup.find("input", {"name": "__VIEWSTATE"})["value"]
    viewstate_generator = soup.find("input", {"name": "__VIEWSTATEGENERATOR"})["value"]
    event_validation = soup.find("input", {"name": "__EVENTVALIDATION"})["value"]

    payload = {
        "__VIEWSTATE": viewstate,
        "__VIEWSTATEGENERATOR": viewstate_generator,
        "__EVENTVALIDATION": event_validation,
        "ctl00$ContentPlaceHolder1$ddEstado": "-1",
        "ctl00$ContentPlaceHolder1$cmdExportar": "Exportar a Excel"
    }

    response = requests.post('https://listadoalg.anmat.gob.ar/Home', data=payload)
    response.raise_for_status()
    with open("data/busqueda-listado-alg.xlsx", "wb") as f:
        f.write(response.content)

    return "data/busqueda-listado-alg.xlsx"

##
#extracts the data from the xlsx file 

def process_data_from_file(path):
    df = pd.read_excel(path)
    df = df[df['Estado'] == 'VIGENTE']
    df = df.drop(columns=['activo'])

    df = df.rename(columns={
        'nombreFantasia': 'nombre_fantasia',
        'denominacionventa': 'denominacion_venta',
        'TipoProducto': 'tipo_producto',
        'Estado': 'estado'
    })
    return df

#updates the database with the new data

def update_db(df):
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

def main():
    path = download_file()
    df = process_data_from_file(path)
    update_db(df)

if __name__ == "__main__":
    main()
