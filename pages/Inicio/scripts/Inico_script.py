import tkinter as tk
from pages.Ventas.Index import Ventas

def NavigatePages(page, name, window):

    pages = {
        "Ventas": Ventas(name)
    }

    pages[page]

    window.destroy()
