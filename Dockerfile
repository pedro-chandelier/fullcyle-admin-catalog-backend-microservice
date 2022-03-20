FROM node:17.7.2-slim

USER node

WORKDIR /home/node/app

CMD ["sh", "-c", "npm i && tail -f /dev/null"]
