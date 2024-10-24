from connection.conection import run_query
from pages.Inicio.index import Init
from alerts.UserExist import ExistUser
from consults.consult import consult_login_searchUser

def SearchUser(user, password, wind):
    users = run_query(consult_login_searchUser, (user, password, ))
    validateUsersExist = users.fetchall()

    if(validateUsersExist):
        for user in validateUsersExist:
            Init(user[1])
            wind.destroy()
    else:
        ExistUser()

def viewPassword(password):
    password.config(show="")
