

# Instalação no windows

O backend no windows basta executar o arquivo "sistema-feeder.exe", clicando no mesmo ou executando via terminal 
Para executar via terminal basta abrir o termina na pasta backend e rodar o comando "./sistema-feeder.exe"

O frontend para rodar pode ser apenas acessando a pasta dist e clicando no index.html
A pasta dist pode ser hospedada como um site simples pois usa apenas o html, css e javascript.
Então funciona com apache ou qualquer outro metodo de exibir páginas web, deve funcionar até mesmo com o iis

Mas se preferir para rodar ele também pode usar o node
https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi

Basta instalar e acessar a pasta front e rodar o comando 
"node run dev" ou "node run preview"

Ele vai rodar em localhost:3000

# Instalação no linux

Recomendado o uso de docker para facilitar
Para o frontend basta usar o webdevops/apache:latest
Para o backend basta usar o golang:1.19.4 ou superior
