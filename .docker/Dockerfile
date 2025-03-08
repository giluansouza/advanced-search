# Usar imagem base leve
FROM php:8.4-fpm-alpine

# Instalar dependências essenciais e extensões PHP necessárias
RUN apk add --no-cache \
  postgresql-dev \
  icu-dev \
  oniguruma-dev \
  && docker-php-ext-install \
  pdo_pgsql \
  intl \
  mbstring \
  bcmath \
  && docker-php-ext-enable opcache

# Configurar OPcache para produção
RUN printf "[opcache]\n\
  opcache.memory_consumption=128\n\
  opcache.interned_strings_buffer=8\n\
  opcache.max_accelerated_files=10000\n\
  opcache.revalidate_freq=0\n\
  opcache.validate_timestamps=0\n\
  opcache.enable_cli=1\n" > /usr/local/etc/php/conf.d/opcache-recommended.ini

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar apenas arquivos essenciais para otimizar cache do Docker
COPY . .

# Instalar Composer de forma otimizada
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader --no-interaction \
  && rm -rf /usr/bin/composer \
  && rm -rf /root/.composer/cache

# Ajustar permissões apenas para diretórios necessários
RUN chown -R www-data:www-data storage bootstrap/cache \
  && chmod -R 775 storage bootstrap/cache

# Comando padrão do contêiner
CMD ["php-fpm"]
