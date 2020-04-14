from django import forms
from .models import feedback

class feedback_form(forms.ModelForm):
    model = feedback
    fields = [
        'Email', 
        'feedback'
    ]

