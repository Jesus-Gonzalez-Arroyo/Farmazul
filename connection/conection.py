import sqlite3
from sqlite3 import Error
from alerts.ErrorDatabase import DatabaseError

db_name= 'Database.db'

def run_query(query, parametrs = {}):
    try:
        with sqlite3.connect(db_name) as conn:
            cursor = conn.cursor()
            result = cursor.execute(query, parametrs)
            conn.commit()
        return result
    except Error as err:
        print(f'Error al conectar la base de datos: ${err}')
        DatabaseError()