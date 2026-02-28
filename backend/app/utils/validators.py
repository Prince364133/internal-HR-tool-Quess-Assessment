import re

# Custom Regex based validator for emails
EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

def validate_email_format(email: str) -> bool:
    if not EMAIL_REGEX.match(email):
        return False
    return True
