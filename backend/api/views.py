from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializer import *


class ReactView(APIView):
    # I don't know why when I put this line of code I am able to access
    # to the html form of the post in rest frame work
    serializer_class = ReactSerializer

    def get(self, request):
        try:
            output = [{"email_title": output.email_title,
                       "content": output.content}
                      for output in React.objects.all()]
            return Response(output, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def profile(request):
    return render(request, 'profile.html')

# def indexView(request, *args, **kwargs):
#     return render(request, "frontend/index.html")

