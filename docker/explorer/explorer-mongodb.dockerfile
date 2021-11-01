FROM mongo:latest

ARG USER_ID
ARG GROUP_ID

RUN if [ $USER_ID != '0' ]; then \
        groupmod -g ${GROUP_ID} mongodb; \
        usermod -u ${USER_ID} -g ${GROUP_ID} mongodb; \
    fi
