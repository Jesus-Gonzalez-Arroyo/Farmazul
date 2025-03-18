def ResponseModel(info='', err=False, code=200):
    return {'error': err, 'info': info, 'code': code}