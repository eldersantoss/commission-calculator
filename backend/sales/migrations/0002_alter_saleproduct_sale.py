# Generated by Django 4.2.1 on 2023-06-06 13:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='saleproduct',
            name='sale',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sales.sale'),
        ),
    ]
