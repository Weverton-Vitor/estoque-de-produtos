from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, UpdateView, ListView

from .forms import ProdutoForm
from .models import Produto


# def produto_list(request):
#     template_name = 'produto_list.html'
#     objects = Produto.objects.all()
#     search = request.GET.get('search')
#     if search:
#         objects = objects.filter(produto__icontains = search)
#     context = {'objects_list': objects}
#     return render(request, template_name, context)

class ProdutoList(ListView):
    model = Produto
    context_object_name = 'objects_list'
    template_name = 'produto_list.html'
    paginate_by = 10
        
    def get_queryset(self, *args, **kwargs):
        search = self.request.GET.get('search')
        if search:
            objects_list = Produto.objects.filter(produto__icontains = search)
            return objects_list        
        
        objects_list = Produto.objects.all()
        return objects_list
            

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


class ProdutoUpdate(UpdateView):
    model = Produto
    template_name = 'produto_form.html'
    form_class = ProdutoForm


def produto_json(request, pk):
    """Retorna o produto, id e estoque"""
    produto = Produto.objects.filter(pk=pk)
    data = [item.to_dict_json() for item in produto]
    return JsonResponse({'data': data})
