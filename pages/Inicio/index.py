import tkinter as tk

class Init:
    def __init__(self, parent):
        self.window = tk.Toplevel(parent)
        self.window.title("Nueva Ventana desde otra clase")
        self.window.geometry("300x150")
        
        # Etiqueta en la nueva ventana
        label = tk.Label(self.window, text="¡Esta es una nueva ventana desde otra clase!")
        label.pack(pady=10)

        # Botón para cerrar la nueva ventana
        close_button = tk.Button(self.window, text="Cerrar", command=self.window.destroy)
        close_button.pack(pady=10)