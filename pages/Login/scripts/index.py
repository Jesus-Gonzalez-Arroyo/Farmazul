from connection.conection import run_query
from pages.Inicio.index import Init
from alerts.UserExist import ExistUser

def Buscador(user, password, window):
    SearchUser(user, password, window)

def SearchUser(user, password, wind):
    users = run_query('SELECT * FROM Users WHERE User = ? AND Password = ?', (user, password, ))
    validateUsersExist = users.fetchall()

    if(validateUsersExist):
        for user in validateUsersExist:
            Init(user[1])
            wind.destroy()
    else:
        ExistUser()
    