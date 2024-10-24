from tkinter import *
import tkinter as tk
from pages.Login.scripts.Login_script import SearchUser, viewPassword

color_left = '#02CEE0'
typografic = 'Istok Web'
color_button = '#4FB7C9'

class login:
    def __init__(self, window):
        self.root = window
        self.root.title("Farmazul")
        self.root.geometry("1200x700")
        self.root.resizable(0,0)

        #FRAME LEFT
        leftFrame = Frame(self.root, width=500, bg=color_left)
        leftFrame.pack(side=tk.LEFT, fill=tk.BOTH)
        leftFrame.pack_propagate(False)

        labelLeft = Label(leftFrame, 
                          text='Bienvenido a Farmazul', 
                          fg='#fff', 
                          bg=color_left, 
                          font=(typografic, 30),
                          anchor=CENTER)
        labelLeft.pack(expand=True)


        #FRAME RIGHT
        rigthFrame = Frame(self.root, bg='#fff', width=1000)
        rigthFrame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        rigthFrame.pack_propagate(False)

        labelLogin = Label(rigthFrame, text='Login', bg='#fff', font=(typografic, 30))
        labelLogin.pack(pady=(40, 0), padx=37, anchor=NW,)

        labelIngresaDatos = Label(rigthFrame, 
                                  text='Ingresa tus datos para acceder a tu cuenta',
                                  bg='#fff',
                                  font=(typografic, 11))
        labelIngresaDatos.pack(padx=40, anchor=NW, pady=(5, 0))

        #SECCION USUARIO

        labelUsuario = Label(rigthFrame, text='Usuario', bg='#fff', font=(typografic, 12))
        labelUsuario.pack(anchor=NW, padx=40, pady=(80, 0))

        self.inputUsuario = Entry(rigthFrame, width=100, bd=0, font=(typografic, 13))
        self.inputUsuario.pack(anchor=NW, padx=45, pady=(10, 0))

        barraBaja = Frame(rigthFrame, height=2, bg='black')
        barraBaja.pack(anchor=NW, padx=45, pady=(5, 0), fill=tk.X)

        #SECCION CONTRASEÑA

        labelContrasena = Label(rigthFrame, text='Contraseña', bg='#fff', font=(typografic, 12))
        labelContrasena.pack(anchor=NW, padx=40, pady=(100, 0))

        self.inputContrasena = Entry(rigthFrame, width=100, bd=0, font=(typografic, 13), show='*')
        self.inputContrasena.pack(anchor=NW, padx=45, pady=(10, 0))

        barraBajaPass = Frame(rigthFrame, height=2, bg='black')
        barraBajaPass.pack(anchor=NW, padx=45, pady=(5, 0), fill=tk.X)

        mostrarPass = Button(rigthFrame, 
                             text='Ver contraseña', 
                             padx=10, 
                             pady=5, 
                             bg=color_button, 
                             border=0, fg="#fff", 
                             command=lambda: viewPassword(self.inputContrasena))
        mostrarPass.pack(anchor=NW, pady=20, padx=45)

        #SECCION BUTTON

        buttonIngresar = Button(rigthFrame, 
                                text='Ingresar', 
                                width=40,
                                height=40, 
                                pady=6, 
                                bg=color_button, 
                                bd=0,
                                fg='#fff',
                                font=(typografic, 13),
                                command=lambda: SearchUser(self.inputUsuario.get(), self.inputContrasena.get(), self.root))
        buttonIngresar.pack(anchor=CENTER, pady=85)
