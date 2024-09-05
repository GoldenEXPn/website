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

    def get(self, request, pk=None):
        if pk is not None:
            # Handle the case where a specific object is requested
            try:
                react_instance = React.objects.get(pk=pk)
                serializer = ReactSerializer(react_instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except React.DoesNotExist:
                return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Handle the case where all objects are listed
            try:
                output = [{"email_title": output.email_title,
                           "sender": output.sender,
                           "content": output.content,
                           "received_date": output.received_date}
                          for output in React.objects.all()]
                return Response(output, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    # def get(self, request):
    #     try:
    #         output = [{"email_title": output.email_title,
    #                    "sender": output.sender,
    #                    "content": output.content,
    #                    "received_date": output.received_date}
    #                   for output in React.objects.all()]
    #         return Response(output, status=status.HTTP_200_OK)
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            # Retrieve the object by its primary key (pk)
            react_instance = React.objects.get(pk=pk)
            react_instance.delete()  # Delete the instance
            return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except React.DoesNotExist:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def profile(request):
    return render(request, 'profile.html')

# def indexView(request, *args, **kwargs):
#     return render(request, "frontend/index.html")

