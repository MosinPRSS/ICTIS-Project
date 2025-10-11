FROM python:3.13.8-slim-trixie

RUN apt-get update && apt-get install -y gcc python3-dev


WORKDIR ./server

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "core/manage.py", "runserver", "0.0.0.0:8000"]