# Generated by Django 3.1.1 on 2020-09-25 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('importado', models.BooleanField(default=False)),
                ('ncm', models.CharField(max_length=8, verbose_name='NCM')),
                ('produto', models.CharField(max_length=100, unique=True)),
                ('preco', models.DecimalField(decimal_places=2, max_digits=7, verbose_name='preço')),
                ('estoque', models.IntegerField(verbose_name='estoque atual')),
                ('estoque_minimo', models.PositiveIntegerField(default=0, verbose_name='estoque mínimo')),
            ],
        ),
    ]
