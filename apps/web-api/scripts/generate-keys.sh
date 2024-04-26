# comandos para criar par de chaves privada e pública com OpenSSL

cd ..

mkdir credentials

cd credentials

# -----------------------------------------------------
# --- Criar chaves pelo git bash: 

openssl genrsa -out private.pem 2048

# Notes:
# private.pem -> nome do arquivo que dei para armazenar a chave privada
# 2048 -> tamanho da chave que pode ser alterado. 

# -----------------------------------------------------
# --- Gerar chave pública a partir da privada: 

openssl rsa -in private.pem -pubout -out public.pem

# Notes:
# public.pem -> nome do arquivo que dei para armazenar a chave pública

# -----------------------------------------------------