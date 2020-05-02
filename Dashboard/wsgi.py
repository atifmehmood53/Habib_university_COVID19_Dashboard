"""
WSGI config for Dashboard project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from dotenv import load_dotenv
env_path = '../.env'

load_dotenv(dotenv_path=env_path)
application = get_wsgi_application()
