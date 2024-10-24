from tkinter import *
import tkinter as tk
from tkinter import ttk
from components.Header.Header import Header

typografic = 'Istok Web'

class Ventas:
    def __init__(self, name):
        self.window = tk.Tk()
        self.window.geometry("1300x800")
        self.window.title('Farmazul')
        self.window.resizable(0,0)

        #HEADER
        Header(self.window, name, False)

        #BODY

        #FRAME_LEFT
        frameLeft = Frame(self.window, width=900)
        frameLeft.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        frameLeft.pack_propagate(False)

        titleVentas = Label(frameLeft, text='Ventas', font=(typografic, 25))
        titleVentas.pack(anchor=NW, padx=25, pady=20)

        inputBuscar = Entry(frameLeft, width=60)
        inputBuscar.pack(anchor=NW, padx=25)

        tabla = ttk.Treeview(frameLeft)
        tabla['columns'] = ('Nombre', 'Cantidad', 'Precio', 'Estancia')
        tabla.column('#0', width=0, stretch=tk.NO)

        tabla.column('Nombre', width=350, anchor=tk.NW)
        tabla.column('Cantidad', width=100, anchor=tk.CENTER)
        tabla.column('Precio', width=100, anchor=tk.CENTER)
        tabla.column('Estancia', anchor=tk.CENTER)

        tabla.heading('Nombre', text='Nombre')
        tabla.heading('Cantidad', text='Cantidad')
        tabla.heading('Precio', text='Precio')
        tabla.heading('Estancia', text='Estancia')

        tabla.insert(parent='', index='end', iid=0, values=('Manzanas', 10, '$1.50', 'Estante 1'))
        tabla.insert(parent='', index='end', iid=1, values=('Naranjas', 8, '$2.00', 'Estante 3'))
        tabla.insert(parent='', index='end', iid=2, values=('Plátanos', 12, '$1.80', 'Estante 1'))

        tabla.pack(pady=30, padx=25, fill='both', expand=True)

        #FRAME_RIGHT

        frameRight = Frame(self.window, bg='blue', width=400)
        frameRight.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        frameRight.pack_propagate(False)
