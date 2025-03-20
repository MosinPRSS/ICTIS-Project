#!/bin/sh
# Для запуска проекта на сервере/хосте - но это в дальнейшем

# Containers (PSQL, Ollama)
docker compose pull

# ollama - downloading models


# Backend

. "venv/bin/activate" # для линукс-системы!
cd server/core && python3 manage.py runserver


