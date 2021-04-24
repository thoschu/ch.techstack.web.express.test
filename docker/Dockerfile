#################
## Temporary build image, will be thrown away below once the runtime image build begins
##
## hadolint ignore=DL3007

FROM internal-development-docker-common.techstack.ch/build/build_node:latest AS builder

ARG ENVIRONMENT
ARG NPM_TOKEN

USER root

# Make the working directory.
RUN mkdir -p /usr/src/app

# Set the working directory.
WORKDIR /usr/src/app

# Copy the ressources from your host to your current location.
COPY . .

RUN cat /root/.npmrc && echo $ENVIRONMENT
RUN npm ci
RUN npm run build:$ENVIRONMENT
#RUN npm run build
#RUN NPM_AUDIT_ITEMS=$(npm audit fix --_auth='' --registry=https://registry.npmjs.org --dry-run --only=prod --parseable);echo "$NPM_AUDIT_ITEMS"; if [ -n "$NPM_AUDIT_ITEMS" ]; then echo "ERROR: Check for vulnerabilities in npm using 'npm audit fix --_auth='' --registry=https://registry.npmjs.org --dry-run --only=prod --parseable' and fix them."; exit 166; fi

USER nobody

##########################################################################################

FROM internal-development-docker-common.techstack.ch/base/assets:latest

LABEL maintainer="thoschulte@gmail.com"

COPY --from=builder /usr/src/app/dist /app/
#COPY --from=builder /usr/src/app/* /app/
