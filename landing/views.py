from django.shortcuts import render
from .forms import *
from products.models import *


def landing(request):
    form = SubscriberForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
    return render(request, 'landing/landing.html', locals())

def home(request):
    products_images = ProductImage.objects.filter(is_active=True, is_main=True)
    return render(request, 'landing/home.html', locals())