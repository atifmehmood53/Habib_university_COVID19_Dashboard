from .base_settings import *

DEBUG = False

# use for production only
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Heroku: Update database configuration from $DATABASE_URL.
import dj_database_url
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)