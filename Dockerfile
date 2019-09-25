FROM node
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
