from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView
from .models import Produto
from .forms import ProdutoForm


def produto_list(request):
    template_name = 'produto_list.html'
    objects = Produto.objects.all()
    context = {'objects_list': objects}
    return render(request, template_name, context)


def produto_detail(request, pk):
    template_name = 'produto_detail.html'
    obj = Produto.objects.get(pk=pk)
    context = {'object': obj}
    return render(request, template_name, context)


def produto_add(request):
    template_name = 'produto_form.html'
    return render(request, template_name)

class ProdutoCreate(CreateView):
    model = Produto
    template_name = 'produto_form.html'
    form_class =  ProdutoForm

    # Setando a url de sucesso para a página de detalhe do objeto
    def get_success_url(self):
        return self.object.get_absolute_url()