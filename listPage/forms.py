from django import forms

class TaskForm(forms.Form):
    title = forms.CharField(max_length=100)
    priority = forms.IntegerField()

    def clean_title(self):
        title = self.cleaned_data['title']
        if any(char in title for char in ['<', '>', '/', '\\', ';']):
            raise forms.ValidationError("Title contains invalid characters.")
        return title