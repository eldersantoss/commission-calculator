from io import StringIO

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import TestCase


class CreateSuperuserIfNoneExistsTest(TestCase):
    def test_createsuperuser_if_none_exists(self):
        """
        Should create a superuser
        """

        User = get_user_model()
        self.assertFalse(User.objects.exists())

        out = StringIO()
        call_command(
            "createsuperuser_if_none_exists",
            "--username=admin",
            "--password=admin",
            stdout=out,
        )

        self.assertTrue(User.objects.exists())
        self.assertTrue(User.objects.filter(username="admin").exists())
        self.assertTrue(User.objects.filter(is_superuser=True).exists())

        # Verifica a saída do comando
        expected_output = 'Superuser "admin" was created\n'
        self.assertEqual(out.getvalue(), expected_output)
