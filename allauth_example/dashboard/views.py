from django.shortcuts import render


def home_view(request):
    return render(request, 'index.html')


def profile(request):
    return render(request, 'profile.html')