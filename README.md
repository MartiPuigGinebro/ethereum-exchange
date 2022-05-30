# Introducció general.

## Passos per crear projecte.

1. Descarregar repositori.
2. npm install per instal·lar les dependències necessàries.
3. npm run dev crearà un live server al nostre local host.
4. npm run build per crear un projecte optimitzat per producció.

## Objectiu i àmbit del projecte.

La finalitat en aquest treball final era crear una aplicació completament des de zero, amb un front-end i un back-end diferenciats.

He intentat sortir de la meva zona de confort, per tant, aprendre i posar en practica dues tecnologies completament noves per mi, com eren React.js i Solidity.

L&#39;aplicació creada es basa en la web 3.0, una evolució de la web que està a l&#39;ordre del dia, però que encara està en fase de desenvolupament.

A part de treballar amb tecnologies totalment noves per mi, he volgut crear una aplicació en què l&#39;usuari pot interactuar amb el contracte intel·ligent. Aquest contracte intel·ligent, per al moment, està desplegat en la xarxa de prova Ropsten, però no suposaria cap mena de problema desplegar-ho en una xarxa Ethereum real, ja que l&#39;arquitectura és exactament la mateixa.

## Descripció de recursos emprats.

Els recursos emprats han sigut:

- React: He fet servir React per crear l&#39;estructura front-end de l&#39;aplicació, així com la lògica dels components i com aquests components interactuen amb el back-end. He seguit la filosofia d&#39;escriure un component per cada aspecte de la vista.
- Solidity: És un llenguatge relativament nou, basat en JavaScript, per desenvolupar contractes intel·ligents. Aquest llenguatge està dissenyat especialment per Ethereum. Ho he fet servir per a la creació i desplegament del contracte intel·ligent.
- Vite: Serveix per poder crear entorns locals de manera molt simple.
- Tailwind CSS: És una llibreria de CSS que ajuda a crear la maquetació de manera molt més simple i ràpida.

## Planificació temporal setmanal de les tasques.

| Creació estructuració de la web | Creació contracte. | Arreglar errors. | Revisió. | Documentació. |
|--------------------------------:|--------------------|------------------|----------|---------------|
| 1, 2, 3, 6                      | 4, 5               | 6                | 6        | 7             |

# Descripció del projecte.

A nivell front-end, l&#39;aplicació consta de diversos components que formen una sola SPA.

A nivell back-end, l&#39;aplicació consta d&#39;un contracte intel·ligent. El contracte dona la possibilitat de fer transferències entre comptes de la xarxa, així com un registre d&#39;aquestes.

# Estructura del programa/lloc web:

## Menús / Enllaços.

A React hi han diverses maneres d&#39;enfocar l&#39;encaminament. Vaig triar el component _BrowserRouter_, ja que et dona la possibilitat d&#39;enfocar parts d&#39;una mateixa pàgina amb la propietat _to_.

Per altra banda, la distinció entre la versió mòbil o tauleta/ordinador, amb la qual la forma del menú canvia, tenint una lògica pròpia, amb un menú com a desplegable, amb la possibilitat de mostrar i amagar.

## Coherència de l&#39;estructura.

L&#39;estructuració de l&#39;aplicació es basa en el principi de React de la composició a través de components.

## Facilitat / intuïtivitat de l&#39;estructura.

S&#39;ha intentat fer una estructura la més simple possible, fàcil i intuïtiva de comprendre per qualsevol persona que la visiti. Les diferents parts de la web estan diferenciades entre si amb un correcte spacing. A més, els elements de la web estan separats per funcionalitats de tal manera que les diferents seccions es vegin clares i destaquin per si mateixes.

# Aspecte visual.

## Estil de colors.

He triat un estil de color com fons més fosc, amb un conjunt de text més clar, d&#39;aquesta manera es crea un contrast i el text és més fàcil de llegir.

## Estructura i estil dels llistats.

He triat un estil de llistats molt senzill, sense marques de llista, de manera que la informació sigui més llegible.

Els enllaços tampoc tenen diferent aspecte de la resta de text de la pàgina.

# Codificació front-end.

## Estructuració de carpetes i del projecte:

L&#39;estructuració de la carpeta client/src s&#39;estructura de la següent manera:

- assets: on es troben la imatge del logo.
- componets: els components de l&#39;aplicació, cada un encarregat de diferents parts del renderitzat.
- context: gestionar les dades que passen per les diferents vistes.
- hooks: hooks personalitzats.
- utils: funcions d&#39;utilitat.

Per altra banda, a més dels arxius d&#39;estils, tenim els arxius App.jsx, encarregat d&#39;estructurar els components i main.jsx, encarregat de renderitzar l&#39;app amb el context TransactionContext. El principal motiu de tindre aquest context és per tal de mantenir les dades compartides entre components sense haver de passar els valors per propietats.

## Components
- Navbar: on es renderitza la barra de navegació. Mostra el logo de l&#39;aplicació, i els elements de la barra de navegació.
- Welcome: Aquest component es relaciona amb el TransactionContext a través del submit del formulari amb la funció sendTransaction. A més, fa comprovacions si hi ha un compte connectat, per mostrar o amagar certes parts, amb currentAccount. També comprova si la transferència es troba en procés per carregar Loader.
- LineChart: es comunica amb una API externa encarregada de proveir de dades amb l&#39;històric de preus d&#39;Ethereum, amb aquestes dades, construeix una gràfica amb la llibreria Chart.
- Loader: en el moment de fer una transacció, mostra un spinner a sota del formulari.
- Services: llistat de serveis que proporciona l&#39;aplicació.
- Transactions: s&#39;encarrega de fer crides al TransactionContext per obtenir el total dels registres. A més, també fa crides a la utilitat useFetch, per aconseguir els GIF personalitzats amb la paraula clau de la transferència.
- Footer: renderització de l&#39;apartat web 3.0 i nom de la marca.

## Context

El core del front-end. Encarregat de comunicar-se amb el contracte i gestionar les dades de les transaccions. Les seves funcions són:

- getEthereumContract: Retorna una instància del contracte que està connectat a la xarxa Ethereum.
- handleChange: Quan l&#39;usuari escriu a l&#39;input, la funció handleChange actualitzarà l&#39;estat de formData amb el nou valor.
- getAllTransactions: Assoleix totes les transaccions del contracte intel·ligent i després estableix l&#39;estat de les transaccions a structuredTransaction.
- checkIfWalletIsConnected: Si l&#39;usuari no està connectat a MetaMask, aviseu-vos perquè es connecti. Si estan connectats, guarda el primer compte de la llista de comptes i configureu-la com el compte actual. Posteriorment, obté totes les transaccions del compte corrent.
- connectWallet: Si no hi ha cap objecte Ethereum, aviseu l&#39;usuari perquè es connecti a MetaMask. Si hi ha un objecte Ethereum, sol·liciteu els comptes de l&#39;usuari i establiu el compte actual com a compte.
- checkIfTransactionExists: agafa el recompte de transferències i les guarda al navegador.
- sendTransaction: envia la transferència a través de la cadena de blocs.

## Hooks

Hooks personalitzats, en aquest cas només un anomenat useFetch. En el moment que es crea la targeta amb la transferència, comprova i tramet la keyword a l&#39;API de Giphy, que retorna un GIF temàtic de les paraules trameses.

## Utils
- constants: Constants amb les dades necessàries del contracte desplegat.
- shortenAddress: Funció utilitzada per retallar les direccions dels wallets en el moment de pintar-les.
- Transactions: JSON amb totes les dades del contracte creat.

# Codificació back-end.

## Estructuració de carpetes i del projecte:

L&#39;estructuració de la carpeta smart\_contracts s&#39;estructura de la següent manera:

- contracts: Els contractes creats.
- scripts: Arxiu que desplegarà els contractes.

## Contracts

El contracte Transactions és el core de l&#39;aplicació a nivell back-end. És el responsable de què el sistema de transferències funcioni. Té les funcions següents:

- addToBlock: Afegeix la transferència a la cadena de blocs.
- getAllTransfer: Retorna el total de transferències.
- getTransferCount: Retorna un comptador amb el total de transferències.

## Scripts

L&#39;arxiu deploy és el responsable d&#39;integrar el contracto abans creat a la cadena de blocs.

# Manual d&#39;usuari.

- Primerament, s&#39;ha de tindre l&#39;extensió MetaMask instal·lada amb un compte actiu.
- Seguidament, per fer la connexió entre l&#39;aplicació i el compte, clic al botó Connect Wallet.
- En aquest moment ja serem capaços d&#39;enviar transferències a través de la xarxa.
- En fer l&#39;enviament, es carregarà un llistat amb el total de les transferències remeses a través de l&#39;aplicació.
- Podem consultar directament a la xarxa si fem clic a les targetes creades amb les transferències.

# Bibliografia web i altres fonts d&#39;informació.

[https://es.reactjs.org](https://es.reactjs.org/)

[https://ethereum.org/es](https://ethereum.org/es/)

[https://www.youtube.com](https://www.youtube.com/)

[https://tailwindcss.com](https://tailwindcss.com/)

[https://solidity-es.readthedocs.io/es/latest](https://solidity-es.readthedocs.io/es/latest/)

[https://vitejs.dev](https://vitejs.dev/)

[https://www.chartjs.org](https://www.chartjs.org/)

# Conclusions finals.

Crec que el projecte ha estat tot un èxit, ja que, com he comentat a l&#39;apartat Objectiu i àmbit del projecte, m&#39;ha servit per aprendre molt sobre React. La seva sintaxi, com els components, les rutes, la gestió d&#39;estats, l&#39;estil de codificació de React i les diferents formes de crear i llançar un projecte React.

Per la part de Solidity, aquest llenguatge és molt poderós, i ha estat una molt bona experiència conèixer-lo.

A més, he treballat amb cadena de blocs, i aquesta experiència també ha estat molt satisfactòria. En general, he trobat molt fàcil crear, configurar i administrar la infraestructura.

Per finalitzar, crec que s&#39;ha aconseguit els objectius del projecte, que eren crear una aplicació web amb React i Solidity, i a més, he après moltes coses noves.

# Valoració global del projecte.

En general, el projecte ha estat molt satisfactori, i m&#39;ha ajudat a estar al dia en les últimes tecnologies del món del desenvolupament. A més, he après moltes coses noves, com ara React, Solidity i la cadena de blocs.

# Comparativa entre les expectatives inicials i resultat final.

El projecte ha estat més satisfactori del que esperava, ja que m&#39;he descobert amb problemes i he pogut resoldre&#39;ls, i això em fa sentir més confiat a l&#39;hora de fer projectes en el futur. A més, he après moltes coses noves i interessants.
