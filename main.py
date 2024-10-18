import tkinter as tk
from tkinter import *
from pages.Login.index import login

if __name__ == '__main__':
    window = tk.Tk()
    aplication = login(window)
    window.mainloop()