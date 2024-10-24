from tkinter import *
import tkinter as tk
from components.Header.scripts.Header_script import CloseSession, Back

color_primary="#02CEE0"
typografic = 'Istok Web'
color_text="#fff"

class Header:
    def __init__(self, window, name, Home):
        frameHeader = Frame(window, bg=color_primary)
        frameHeader.pack(side='top', fill=tk.BOTH)

        labelName = Label(frameHeader, text='Farmazul', bg=color_primary, font=(typografic, 15), fg=color_text)
        labelName.pack(side=tk.LEFT, pady=20, padx=20)

        if(Home == True):
            buttonCloseSesion = Button(frameHeader, border=0, text='Cerrar Sesion', fg=color_text, bg=color_primary, font=(typografic, 10), command=lambda: CloseSession(window))
            buttonCloseSesion.pack(side=tk.RIGHT, padx=(20, 30))
        else:
            buttonCloseSesion = Button(frameHeader, border=0, text='Volver', fg=color_text, bg=color_primary, font=(typografic, 10), command=lambda: Back(name, window))
            buttonCloseSesion.pack(side=tk.RIGHT, padx=(20, 30))
        
        labelWelcomeUser = Label(frameHeader, text=f'Hola, {name}', bg=color_primary, font=(typografic, 12), fg=color_text)
        labelWelcomeUser.pack(side=tk.RIGHT)
