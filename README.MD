> [!Warning]
> В процессе обновления

# ТРЕБОВАНИЯ

- (*) [Python 3.13.1](https://www.python.org/downloads/release/python-3132/) - backend / ollama-side

- (*) [NodeJS v22.14.0 LTS](https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi) - frontend

- (*) [Ollama](https://ollama.com/download/OllamaSetup.exe) - ollama-side

- (*) [Docker](https://docs.docker.com/) - docker containers

- [Github Desktop](https://central.github.com/deployments/desktop/desktop/latest/win32) - для всех

- [Postman](https://dl.pstmn.io/download/latest/win64) - для бэкенда

- (*) [PostgreSQL 17.4](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) - для бэкенда, работа с базой данных

- (*) - Однако для полноценного запуска проекта локально понадобится установить все - на ваше усмотрение

# ЗАВИСИМОСТИ ДЛЯ PYTHON (НЕАКТУАЛЬНО)

Для начала потребуется запустить виртуальную среду (необходимо для дальнейшей развертки на хостинге)

Если используется иная студия, а не Visual Studio Code, то в вашем проекте откройте папку ICTIS-Project (чаще всего хранится по пути `<User>\Documents\GitHub\`).

Далее в терминале перейдите в директорию `server`:
```shell
cd server
```

Затем выполните:
```shell
python -m venv venv
```
Создано виртуальное окружение, теперь нужно его запустить:
```shell
./venv/Scripts/Activate.ps1 // или activate.bat, смотря какой терминал используете: Командная строка (.bat) или Powershell (.ps1)
```
В Powershell появится `(venv)`, что означает, что мы в виртуальном окружении.

Теперь установим зависимости проекта:

```shell
pip install -r requirements.txt
```

