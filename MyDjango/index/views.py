from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import login,logout

# Create your views here.
def home(request):
    return render(request, 'index/home.html') 

def signupuser(request):
    # access the sign up page
    if request.method == 'GET':
        return render(request, 'index/signupuser.html', {'form':UserCreationForm()})
    # sign up a user
    else:
        # check if the two passwords are matched
        if request.POST['password1'] == request.POST['password2']:
            try:
                # Create a new user object
                user = User.objects.create_user(request.POST['username'], password=request.POST['password1'])

                # save the new user into the database
                user.save()
                # make the user log into the account
                login(request, user)
                return redirect('currenttodos')
            except IntegrityError:
                return render(request, 'index/signupuser.html', {'form':UserCreationForm(), 'error':'That username has already been taken. Please choose a new username.'})

        else:
           return render(request, 'index/signupuser.html', {'form':UserCreationForm(), 'error':'Password did not match'})

def currenttodos(request):
    return render(request, 'index/currenttodos.html')

def logoutuser(request):
    if request.method == 'POST':
        logout(request)
        return redirect('home')