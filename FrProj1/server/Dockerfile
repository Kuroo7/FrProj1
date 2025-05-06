FROM node:18

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .

RUN npm install

ENV NODE_ENV="uat"
CMD ["npm", "start"]