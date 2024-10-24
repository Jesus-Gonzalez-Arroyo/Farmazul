import tkinter as tk

def CloseSession(window):
    from pages.Login.index import login

    win = tk.Tk()
    login(win)
    window.destroy()

def Back(name, window):
    from pages.Inicio.index import Init
    Init(name)
    window.destroy()