from common.validators import only_numbers_validator
from django.core.exceptions import ValidationError
from django.test import SimpleTestCase


class OnlyNumbersValidatorTests(SimpleTestCase):
    def test_valid_input(self):
        """
        Should pass for valid input containing only numbers
        """

        input_value = "1234567890"

        try:
            only_numbers_validator(input_value)

        except ValidationError:
            self.fail("Validation error raised for valid input")

    def test_invalid_input(self):
        """
        Should raise a ValidationError for invalid input containing non-numeric chars
        """

        invalid_inputs = [
            "abc123",
            "123def",
            "12 34",
            "!@#$%",
            "1.23",
        ]

        for input_value in invalid_inputs:
            with self.assertRaises(ValidationError):
                only_numbers_validator(input_value)
