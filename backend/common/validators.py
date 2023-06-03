from django.core.validators import RegexValidator

only_numbers_validator = RegexValidator(
    regex=r"^\d+$",
    message="O campo deve conter apenas dígitos numéricos.",
)
