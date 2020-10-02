from django.contrib import admin
from .models import Estoque, EstoqueItens

class EstoqueitensInline(admin.TabularInline):
    model = EstoqueItens
    extra = 0

@admin.register(Estoque)
class EstoqueAdmin(admin.ModelAdmin):
    inlines = (EstoqueitensInline,)
    list_display = ('__str__', 'nf', 'funcionario')
    search_fields = ('nr', )
    list_filter = ('funcionario', )
    date_hierarchy = 'created'
