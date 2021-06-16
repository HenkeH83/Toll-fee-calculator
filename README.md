# Trängselskatt i Göteborg

### Flödet
Tanken är att stegvis göra kollar hurvida fordonet är relevant för debitering. Så fort det faller utanför ramarna hoppar programmet vidare till nästa fordon. Således utförs inte onödigt arbete och vi sparar tid och energi.

### Koden
Jag valde att dela upp koden i separata moduler för att issolera funktionalitet och öka läsbarheten.

Istället för att hårdkoda datum per år, vilket skapar en möjlighet för mänskligt fel (glömma skriva in nya datum en gång per år), så pratar jag med ett api för att få korrekt data oavsett år.
 
Förbättrings förslag här skulle vara att lägga upp en cronjob, alltså schemalägga ett api anrop, säg; 1 januari, klockan 00:00. Då läser vi in hela årets kalender och kollar sedan dagarna gentemot redan inläst data. Detta skulle minska http förfrågningarna rejält.


Filen test.js är inte relevant för programmet. Den har jag använt under utvecklingen för att ha simulerad data att testa med. Jag låter den vara kvar ifall ni vill testa själva. Testen är **inte** 100% täckning av programmet, det kan finnas buggar som jag inte tänkt på. Hade detta varit en situation där programmet skulle gå live hade jag lagt mycket mer tid och tanke bakom varje testmodell, så döm inte mina TDD skills på detta. Det är bara lite snabba alternativ jag ville kontrollera.

För att köra testen:

```
npm run test
```