FROM node

# Install cec-utils for HDMI communication
RUN apt-get update && apt-get install -y \
    cec-utils gpiod libgpiod3 libgpiod-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app
