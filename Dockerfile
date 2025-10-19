# Image de base avec Node.js
FROM node:20-alpine AS base

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY docusaurus.config.js ./
COPY sidebars.js ./

# Installer les dépendances
RUN npm install --omit=dev

# Copier les sources (CSS, pages, etc.)
COPY src ./src
COPY static ./static

# Copier la documentation markdown (sera aussi montée en volume)
COPY docs ./docs
# Build de la documentation
RUN npm run build

# Stage final avec Nginx
FROM nginx:alpine

# Configuration Nginx optimisée
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    gzip on; \
    gzip_vary on; \
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss; \
}' > /etc/nginx/conf.d/default.conf

# Copier le build depuis le stage précédent
COPY --from=base /app/build /usr/share/nginx/html

# Script pour rebuild à la volée si docs changent
COPY --from=base /app /app
COPY --from=base /usr/local/bin/node /usr/local/bin/node
COPY --from=base /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=base /usr/local/bin/npm /usr/local/bin/npm

# Script de démarrage
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'if [ -d "/docs" ]; then' >> /docker-entrypoint.sh && \
    echo '  echo "📝 Documentation détectée dans /docs, rebuild..."' >> /docker-entrypoint.sh && \
    echo '  cd /app' >> /docker-entrypoint.sh && \
    echo '  rm -rf docs' >> /docker-entrypoint.sh && \
    echo '  ln -s /docs docs' >> /docker-entrypoint.sh && \
    echo '  npm run build' >> /docker-entrypoint.sh && \
    echo '  rm -rf /usr/share/nginx/html/*' >> /docker-entrypoint.sh && \
    echo '  cp -r build/* /usr/share/nginx/html/' >> /docker-entrypoint.sh && \
    echo '  echo "✅ Documentation mise à jour!"' >> /docker-entrypoint.sh && \
    echo 'fi' >> /docker-entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
