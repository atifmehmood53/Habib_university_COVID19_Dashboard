from .base_settings import *

DEBUG = False
DEBUG = True

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'v@467_p0za*-!+^2(97g374adasyyjhsyjfsdj733858345snsqg5+safh@aijflh7x1zs5@y6l'

# Heroku: Update database configuration from $DATABASE_URL.
# import dj_database_url
# db_from_env = dj_database_url.config(conn_max_age=500)
# DATABASES['default'].update(db_from_env)

print("Using production environment...")