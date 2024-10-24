import tkinter as tk
from tkinter import *
from pages.Inicio.scripts.Inico_script import NavigatePages
from components.Header.Header import Header

color_primary="#02CEE0"
typografic = 'Istok Web'
color_text="#fff"

class Init:
    def __init__(self, name):
        self.window = tk.Tk()
        self.window.title("Farmazul")
        self.window.geometry("1300x800")
        self.window.resizable(0,0)
        self.name = name

        #HEADER
        Header(self.window, self.name, True)

        #BODY

        FrameBody = Frame(self.window)
        FrameBody.pack(fill=tk.BOTH)

        labelWelcome = Label(FrameBody, text='Hola, bienvenido', font=(typografic, 30))
        labelWelcome.pack(pady=50)

        buttonVentas = Button(FrameBody, border=0, bg=color_primary, text='Ventas', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text, command=lambda: NavigatePages('Ventas', self.name, self.window))
        buttonVentas.pack(side=tk.LEFT, padx=50, pady=(20,70))

        buttonInventario = Button(FrameBody, border=0, bg=color_primary, text='Inventario', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonInventario.pack(side=tk.LEFT, padx=50, pady=(20, 70))

        buttonReporteVentas = Button(FrameBody, border=0, bg=color_primary, text='Reporte de ventas', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonReporteVentas.pack(side=tk.LEFT, padx=50, pady=(20, 70))

        buttonEstantes = Button(FrameBody, border=0, bg=color_primary, text='Reporte de estantes', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonEstantes.pack(side=tk.LEFT, padx=50, pady=(0, 50))

        #BODY2

        FrameBody2 = Frame(self.window)
        FrameBody2.pack(fill=tk.BOTH)

        buttonGestorUsuarios = Button(FrameBody2, border=0, bg=color_primary, text='Gestor de usuarios', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonGestorUsuarios.pack(side=tk.LEFT, padx=50, pady=(20, 70))

        buttonInversiones = Button(FrameBody2, border=0, bg=color_primary, text='Gastos o inversiones', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonInversiones.pack(side=tk.LEFT, padx=50, pady=(0, 50))

        buttonAgotamientos = Button(FrameBody2, border=0, bg=color_primary, text='Gestor de agotamiento', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonAgotamientos.pack(side=tk.LEFT, padx=50, pady=(0, 50))
