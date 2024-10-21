import tkinter as tk
from tkinter import *

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
        frameHeader = Frame(self.window, bg=color_primary)
        frameHeader.pack(side='top', fill=tk.BOTH)

        labelName = Label(frameHeader, text='Farmazul', bg=color_primary, font=(typografic, 15), fg='#fff')
        labelName.pack(side=tk.LEFT, pady=20, padx=20)

        iconCloseSesion = PhotoImage()
        buttonCloseSesion = Button(frameHeader, border=0)
        buttonCloseSesion.pack(side=tk.RIGHT, padx=(30, 30))
        
        labelWelcomeUser = Label(frameHeader, text=f'Hola, {self.name}', bg=color_primary, font=(typografic, 12), fg="#fff")
        labelWelcomeUser.pack(side=tk.RIGHT)

        #BODY

        FrameBody = Frame(self.window)
        FrameBody.pack(fill=tk.BOTH)

        labelWelcome = Label(FrameBody, text='Hola, bienvenido', font=(typografic, 30))
        labelWelcome.pack(pady=50)

        buttonVentas = Button(FrameBody, border=0, bg=color_primary, text='Ventas', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonVentas.pack(side=tk.LEFT, padx=50, pady=(20,70))

        buttonInventario = Button(FrameBody, border=0, bg=color_primary, text='Inventario', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonInventario.pack(side=tk.LEFT, padx=50, pady=(20, 70))

        buttonReporteVentas = Button(FrameBody, border=0, bg=color_primary, text='Reporte de ventas', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonReporteVentas.pack(side=tk.LEFT, padx=50, pady=(20, 70))

        buttonGestorUsuarios = Button(FrameBody, border=0, bg=color_primary, text='Gestor de usuarios', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonGestorUsuarios.pack(side=tk.LEFT, padx=50, pady=(20, 70))

        #BODY2

        FrameBody2 = Frame(self.window)
        FrameBody2.pack(fill=tk.BOTH)

        buttonInversiones = Button(FrameBody2, border=0, bg=color_primary, text='Gastos o inversiones', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonInversiones.pack(side=tk.LEFT, padx=50, pady=(0, 50))

        buttonAgotamientos = Button(FrameBody2, border=0, bg=color_primary, text='Gastos o inversiones', font=(typografic, 16), pady=50, padx=50, width=10, fg=color_text)
        buttonAgotamientos.pack(side=tk.LEFT, padx=50, pady=(0, 50))
