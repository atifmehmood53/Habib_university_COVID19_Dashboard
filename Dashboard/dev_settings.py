from .base_settings import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'v@467_p0za*-!+^2(97g374733858345snsqg5+du0xvap@aijflh7x1zs5@y6l'

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['*'] 

# use for production only
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

