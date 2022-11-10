FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10.4

ADD requirements.txt .

RUN pip install -r requirements.txt

