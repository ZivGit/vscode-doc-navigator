FROM node:20-slim

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git
