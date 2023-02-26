FROM node:18

WORKDIR /app

COPY package.json .

ARG NODE_ENV
# execute while building image
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --omit=dev; \
    fi

COPY . ./

ENV PORT 3000

EXPOSE $PORT

# execute on container run time (on starting)
CMD ["node", "index.js"]