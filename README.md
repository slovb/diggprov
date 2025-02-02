# Digg arbetsprov

Detta projekt är ett arbetsprov skrivet åt Digg användande Quarkus och Vue.


## Byggprocess

Kör följande från mappen där den här filen finns:

```shell
docker build -t diggprov .
```

Detta bygger först projektet med hjälp av maven och sen skapas den faktiska image:n.


## Starta image

För att köra den image som byggts skriv:

```shell
docker run -p 8080:8080 diggprov
```

Port 8080 är viktig för att frontend är konfigurerad för att anta att den hittar backend där och då frontenden är byggd i förhand är det extra svårt att ändra det även om det finns i en konfigurationfil.

## Använd system

Frontend hittas med browser på <http://localhost:8080>.

API hittas på <http://localhost:8080/digg/user/> med OpenAPI på <http://localhost:8080/q/openapi?format=json>.

Health hittas på <http://localhost:8080/q/health>.
