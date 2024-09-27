FROM "node:21-alpine3.18"

# Set the working directory
WORKDIR /app

# copy package json file to the working directory of the container
COPY package.json .

# Install the dependencies
RUN npm install

# Copy the rest of the files to the working directory of the container
COPY . .

# Run the command to run the index file
CMD ["npm", "run", "dev"]