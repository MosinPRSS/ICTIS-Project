#!/bin/sh
# Для запуска проекта на сервере/хосте - но это в дальнейшем

# Containers (PSQL, Ollama)
docker compose pull

# ollama - downloading models


# Backend
cd server/core && python3 manage.py runserver

# Frontend
cd ../client && npm run dev 

