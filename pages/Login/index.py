from tkinter import *
import tkinter as tk
from pages.Inicio.index import Init

class login: 
    def abrirInicio(self):
        Init(self.root)

    def __init__(self, window):
        self.root = window
        self.root.title("Mi Aplicación")
        self.root.geometry("300x200")

        self.label = tk.Label(self.root, text="¡Bienvenido a la App!")
        self.label.pack(pady=10)

        self.button = tk.Button(self.root, text="Click Me", command=self.abrirInicio)
        self.button.pack(pady=10)
    