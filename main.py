import tkinter as tk
from tkinter import *
from pages.Login.index import login
from pages.Ventas.Index import Ventas

if __name__ == '__main__':
    window = tk.Tk()
    aplication = login(window)
    window.mainloop()
