from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    fullName = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11, unique=True)
    email = models.EmailField(unique=True)
    dateBirth = models.DateField()

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)  # Hash da senha antes de salvar
        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.fullName
