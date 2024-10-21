import tkinter as tk
from tkinter import *
from pages.Login.index import login
from pages.Inicio.index import Init

if __name__ == '__main__':
    window = tk.Tk()
    aplication = login(window)
    window.mainloop()
