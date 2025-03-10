def User_models(user):
    return {
        'id': str(user['_id']),
        'name': user['name'],
        'password': user.get('password'),
        'rol': user.get('rol')
    }
