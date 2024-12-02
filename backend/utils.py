import base64
import re
from bs4 import BeautifulSoup

def clean_email_body(raw_body):
    raw_body = base64.urlsafe_b64decode(raw_body).decode('utf-8')

    # Remove extra newlines and carriage returns (\n, \r)
    clean_body = raw_body.replace("\r", " ").replace("\n", " ")

    # Use BeautifulSoup to remove HTML tags
    soup = BeautifulSoup(clean_body, 'html.parser')
    text = soup.get_text(separator=" ", strip=True)  # Extract text without tags

    # Remove all URLs using regex
    text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text)
    text = re.sub(r'www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}', '', text)

    return text
