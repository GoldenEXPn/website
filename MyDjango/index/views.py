from django.shortcuts import render, redirect
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout

def home(request):
    return render(request, 'index/home.html')


def signupuser(request):
    if request.method == 'GET':
        return render(request, 'index/signupuser.html', {'form': UserCreationForm()})
    else:
        # Create a new user
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.create_user(request.POST['username'], password=request.POST['password1'])
                user.save()
                login(request, user)
                return redirect('currentMessages')
            except IntegrityError:  # If username already been taken
                return render(
                    request,
                    'index/signupuser.html',
                    {'form': UserCreationForm(), 'error': 'OOps, username already taken'}
                )
        else:
            return render(
                request,
                'index/signupuser.html',
                {'form': UserCreationForm(), 'error': 'passwords did not match'}
            )


def loginuser(request):
    if request.method == 'GET':
        return render(request, 'index/loginuser.html', {'form': AuthenticationForm()})
    else:
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            return render(request, 'index/loginuser.html',
                          {'form': AuthenticationForm(), 'error': 'Invalid Credentials!'})
        else:
            login(request, user)
            return redirect('currentMessages')


def logoutuser(request):
    if request.method == 'POST':
        logout(request)
        return render(request, 'index/home.html')


def currentMessages(request):
    return render(request, 'index/currentMessages.html', {'form': UserCreationForm()})












