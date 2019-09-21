FROM node
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"]
