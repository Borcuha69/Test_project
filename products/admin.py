from django.contrib import admin
from .models import *


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'created', 'updated']
    inlines = [ProductImageInline]

    class Meta:
        model = Product

admin.site.register(Product, ProductAdmin)


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image', 'is_active', 'is_main','created', 'updated']

    class Meta:
        model = ProductImage

admin.site.register(ProductImage, ProductImageAdmin)