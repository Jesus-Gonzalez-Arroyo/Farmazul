import tkinter as tk
from tkinter import *

color_button = '#4FB7C9'
typografic = 'Istok Web'

class DatabaseError:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title('Farmazul')
        self.window.geometry('300x300')
        self.window.resizable(0,0)

        alertFrame = Frame(self.window, padx=20)
        alertFrame.pack(fill=tk.BOTH)

        iconBg = Frame(alertFrame, bg='red', width=40, height=40)
        iconBg.pack(pady=25)

        textTitleAlert = Label(alertFrame, text='Ha ocurrido un error', font=(typografic, 14))
        textTitleAlert.pack()

        textTitleAlert2 = Label(alertFrame, text='inesperado', font=(typografic, 14))
        textTitleAlert2.pack(pady=(0,30))

        textSubtitleAlert = Label(alertFrame, text='Por favor vuelve a intentarlo mas tarde', font=(typografic, 11))
        textSubtitleAlert.pack(pady=(0, 35))

        buttonCerrar = Button(alertFrame, text='Cerrar', bg=color_button, border=0, font=(typografic, 10), width=15, fg="#fff", command=self.Cerrar)
        buttonCerrar.pack()
    
    def Cerrar(self):
        self.window.destroy()

    