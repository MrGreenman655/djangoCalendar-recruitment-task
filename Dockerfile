FROM python:3.11
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PATH="${PATH}:/root/.local/bin"
ENV PYTHONPATH=.

WORKDIR /web
RUN adduser --disabled-password --no-create-home app
RUN apt-get update
RUN apt-get install -y build-essential python3-dev tox
COPY requirements.txt /web/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip freeze > requirements.txt
COPY . /web/
RUN mkdir -p /web/public/uploads/tmp/ && \
    chown -R app:app /web/public && \
    chmod -R 755 /web/public