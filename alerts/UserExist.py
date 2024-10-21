import tkinter as tk
from tkinter import *

color_button = '#4FB7C9'
typografic = 'Istok Web'

class ExistUser:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title('Farmazul')
        self.window.geometry('300x300')
        self.window.resizable(0,0)

        alertFrame = Frame(self.window, padx=20)
        alertFrame.pack(fill=tk.BOTH)

        iconBg = Frame(alertFrame, bg='red', width=40, height=40)
        iconBg.pack(pady=25)

        textTitleAlert = Label(alertFrame, text='No te encuentras registrado', font=(typografic, 14))
        textTitleAlert.pack()

        textTitleAlert2 = Label(alertFrame, text='actualmente en el sistema', font=(typografic, 14))
        textTitleAlert2.pack(pady=(0,20))

        textSubtitleAlert = Label(alertFrame, text='Por favor pidele a tu supervisor que te', font=(typografic, 11))
        textSubtitleAlert.pack()

        textSubtitleAlert2 = Label(alertFrame, text='registre', font=(typografic, 11))
        textSubtitleAlert2.pack(pady=(0,30))

        buttonCerrar = Button(alertFrame, text='Cerrar', bg=color_button, border=0, font=(typografic, 10), width=15, fg="#fff", command=self.Cerrar)
        buttonCerrar.pack()
    
    def Cerrar(self):
        self.window.destroy()

