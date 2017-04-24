# MMM-Rejseplanen

This an module for the [MagicMirror](https://github.com/MichMich/MagicMirror).

IDeparture board Danish stations for IC (InterCity), LYN (Lyntog), REG (Regionaltog), S (S-Tog), TOG (other train), BUS (Bus), EXB (Express Buss), NB (Nattbus), TB (Telebus, other form of transport), F (Ferry) and M (Metro).

Monitoring your favorite local departure station, with up to 20 departure for the destination.
There are data from the Danish, Findrejsen.dk API.

Furthermore, support for some Swedish stations (has not been tested)

## Installation
Open a terminal session, navigate to your MagicMirror's `modules` folder and execute `git clone https://github.com/poketcalulator/MMM-Rejseplanen.git`, a new folder called MMM-Rejseplanen will be created.

Complete the installation by adding the following to config.js as shown below.

(Find your stationID in the list below)

## Using the module
````javascript
modules: [
		{
			module:	'MMM-Rejseplanen',
			header: 'Findrejsen.dk',
			position:	'top_left',
			config: {
				stationID: 'ENTER YOUR STATION ID HERE',
			}
		},
````

## Station vs stationID

|Station|stationID|
|:---|:---:|
|Albertslund|8600621|
|Alken|8600260|
|Allerød|8600681|
|Arden|8600029|
|Arnbjerg (Varde Sommerl)|8600250|
|Aulum|8600300|
|Avedøre|8600765|
|Bagsværd|8600692|
|Ballerup|8600708|
|Bedsted Thy|8600398|
|Bernstorffsvej|8600672|
|Birk Centerpark|8600269|
|Birkerød|8600678|
|Bispebjerg|8600739|
|Bjerringbro|8600172|
|Bording|8600271|
|Borris|8600280|
|Borup|8600614|
|Bramming|8600219|
|Brande|8600291|
|Bred|8600507|
|Bredebro|8600430|
|Brejning|8600076|
|Brøndby Strand|8600766|
|Brøndbyøster|8600679|
|Brønderslev|8600015|
|Brøns|8600426|
|Brørup|8600222|
|Buddinge|8600690|
|Bur|8600195|
|Børkop|8600077|
|Charlottenlund|8600657|
|Danshøj|8600742|
|Den Permanente|8600139|
|Dybbølsbro|8600634|
|Dyssegård|8600780|
|Døstrup Sønderjylland|8600428|
|Egedal|8600956|
|Ejby|8600504|
|Emdrup|8600688|
|Engesvang|8600270|
|Enghave|8600625|
|Esbjerg|8600215|
|Eskilstrup|8600822|
|Espergærde|8600667|
|Europaplads|8600128|
|Farum|8600696|
|Flintholm|8600736|
|Fredericia|8600079|
|Frederikshavn|8600001|
|Frederikssund|8600714|
|Friheden|8600764|
|Fruens Bøge|8600533|
|Fuglebakken|8600640|
|Gadstrup|8600800|
|Gedser|8600830|
|Gelsted|8600505|
|Gentofte|8600673|
|Give|8600289|
|Gjesing st.|8600228|
|Glostrup|8600622|
|Glumsø|8600773|
|Gredstedbro|8600421|
|Grenaa|8600165|
|Greve|8600770|
|Grøndal|8600641|
|Gråsten|8600322|
|Guldager|8600214|
|Gørding|8600220|
|Gårde|8600209|
|Hadsten|8600047|
|Hammerum|8600274|
|Hareskov|8600694|
|Haslev|8600807|
|Havdrup|8600801|
|Hedehusene|8600619|
|Hedensted|8600071|
|Hee|8600199|
|Hellerup|8600655|
|Helsingør|8600669|
|Herfølge|8600805|
|Herlev|8600706|
|Herning|8600275|
|Hillerød|8600683|
|Hinnerup|8600048|
|Hjallese|8600559|
|Hjerm|8600191|
|Hjortshøj|8600153|
|Hjørring|8600009|
|Hobro|8600032|
|Holbæk|8600719|
|Holme-Olstrup|8600809|
|Holmstrup|8600511|
|Holstebro|8600192|
|Holsted|8600221|
|Holte|8600677|
|Hornslet|8600156|
|Horsens|8600066|
|Hovmarken|8600164|
|Humlebæk|8600666|
|Humlum|8600390|
|Hundige|8600769|
|Hurup Thy|8600397|
|Husum|8600705|
|Hvalsø|8600716|
|Hvidbjerg|8600394|
|Hviding|8600424|
|Hvidovre|8600600|
|Højby Fyn|8600560|
|Høje Taastrup|8600798|
|Højslev|8600182|
|Hørdum|8600400|
|Hørning|8600059|
|Høvelte|8600909|
|Ikast|8600273|
|Ishøj|8600768|
|Islev|8600704|
|Jelling|8600285|
|Jersie|8600791|
|Jyderup|8600723|
|Jyllingevej|8600734|
|Jægersborg|8600674|
|Kalundborg|8600727|
|Karlslunde|8600771|
|Kauslunde|8600502|
|KB Hallen|8600740|
|Kibæk|8600278|
|Kildebakke|8600781|
|Kildedal|8600955|
|Klampenborg|8600659|
|Kliplev|8600318|
|Knabstrup|8600721|
|Kokkedal|8600664|
|Kolding|8600083|
|Kolind|8600160|
|Korsør|8600601|
|Kvissel|8600005|
|Kværndrup|8600565|
|København H|8600626|
|Københavns Lufth. Kastrup / CPH Airport|8600858|
|Køge|8600803|
|Langgade|8600701|
|Langå|8600044|
|Laven|8600263|
|Lejre|8600715|
|Lem|8600203|
|Lille Skensved|8600802|
|Lindholm|8600116|
|Lundby|8600814|
|Lunderskov|8600086|
|Lyngby|8600675|
|Lyngs|8600395|
|Lystrup|8600152|
|Løgten|8600155|
|Malmparken|8600756|
|Middelfart|8600501|
|Mørke|8600157|
|Mørkøv|8600722|
|Måløv|8600709|
|Nivå|8600665|
|Nordhavn|8600653|
|Ny Ellebjerg|8600783|
|Nyborg|8600518|
|Nykøbing F|8600824|
|Næstved|8600810|
|Næstved Nord|8600793|
|Nørre Alslev|8600821|
|Nørre Åby|8600503|
|Nørrebro|8600642|
|Nørreport|8600646|
|Oddesund nord|8600392|
|Odense|8600512|
|Odense sygehus|8600526|
|Ordrup|8600658|
|Padborg|8600100|
|Pederstrup|8600562|
|Peter Bangs Vej|8600702|
|Randers|8600040|
|Regstrup|8600720|
|Rejsby|8600425|
|Ribe|8600423|
|Ribe Nørremark|8600436|
|Ringe|8600563|
|Ringkøbing|8600200|
|Ringsted|8600611|
|Roskilde|8600617|
|Rudme|8600564|
|Rungsted Kyst|8600663|
|Ry|8600261|
|Ryomgård|8600159|
|Ryparken|8600644|
|Rødby Færge|8600840|
|Rødekro|8600094|
|Rødkærsbro|8600174|
|Rødovre|8600680|
|Sejstrup|8600420|
|Sig|8600211|
|Silkeborg|8600266|
|Sindal|8600007|
|Sjælør|8600761|
|Sjørring|8600403|
|Skalbjerg|8600508|
|Skalborg|8600022|
|Skanderborg|8600061|
|Skive|8600183|
|Skjern|8600205|
|Skodsborg|8600661|
|Skolebakken|8600129|
|Skovbrynet|8600693|
|Skovlunde|8600707|
|Skærbæk|8600427|
|Skødstrup st. (Århus)|8600154|
|Skørping|8600027|
|Slagelse|8600605|
|Snedsted|8600401|
|Snekkersten|8600668|
|Solrød Strand|8600790|
|Sorgenfri|8600636|
|Sorø|8600608|
|Spangsbjerg st.|8600227|
|Stengården|8600691|
|Stenløse|8600711|
|Stenstrup|8600566|
|Stenstrup Syd|8600567|
|Stoholm|8600180|
|Struer|8600189|
|Studsgård|8600277|
|Støvring|8600026|
|Svanemøllen|8600654|
|Svebølle|8600724|
|Svejbæk|8600264|
|Svendborg|8600551|
|Svendborg vest|8600555|
|Svenstrup|8600023|
|Sydhavn|8600760|
|Sønderborg|8600327|
|Tarm|8600206|
|Taulov|8600081|
|Thisted|8600404|
|Thyregod|8600290|
|Tim|8600198|
|Tinglev|8600097|
|Tistrup|8600210|
|Tjæreborg|8600218|
|Tolne|8600006|
|Tommerup|8600509|
|Torsøvej|8600151|
|Trekroner|8600755|
|Troldhede|8600279|
|Trustrup|8600162|
|Tureby|8600806|
|Tølløse|8600717|
|Tønder|8600432|
|Tønder Nord|8600434|
|Tårnby|8600857|
|Taastrup|8600620|
|Uglev|8600393|
|Ulfborg|8600197|
|Ulstrup|8600171|
|Valby|8600624|
|Vallensbæk|8600767|
|Vamdrup|8600087|
|Vangede|8600689|
|Vanløse|8600703|
|Varde|8600212|
|Varde Kaserne|8600249|
|Varde Nord|8600213|
|Vedbæk|8600662|
|Vejen|8600223|
|Vejle|8600073|
|Vejle sygehus|8600281|
|Veks·|8600710|
|Vemb|8600196|
|Vesterport|8600645|
|Vestre Strandalle|8600149|
|Viborg|8600176|
|Viby Sjælland|8600615|
|Vigerslev All·|8600804|
|Vildbjerg|8600298|
|Vinderup|8600187|
|Vipperød|8600718|
|Virum|8600676|
|Visby|8600431|
|Vojens|8600091|
|Vordingborg|8600816|
|Vrå|8600013|
|Værløse|8600695|
|Ydby|8600396|
|Ølby|8600792|
|Ølgod|8600208|
|Ølstykke|8600712|
|Ørestad|8600856|
|Østbanetorvet|8600148|
|Østerport|8600650|
|Aalborg|8600020|
|Aalborg Vestby|8600117|
|Ålholm|8600741|
|Åmarken|8600763|
|Århus H|8600053|
|Årslev|8600561|
|Aarup|8600506|
|Alvesta|7400004|
|Bergåsa|7401537|
|Bromölla|7400141|
|Bräkne-Hoby|7400368|
|Båstad N|7414048|
|Dösjebro|7400939|
|Emmaboda|7400096|
|Falkenberg|7400257|
|Glumslöv|7401558|
|Gunnesbo|7400941|
|Göteborg|7400002|
|Halmstad|7400080|
|Helsingborg C|7400044|
|Hovmantorp|7400511|
|Häljarp|7416681|
|Hässleholm|7400006|
|Höör|7400185|
|Kalmar C|7400020|
|Karlshamn|7400073|
|Karlskrona|7400230|
|Kattarp|7401544|
|Kristianstad C|7400200|
|Kungsbacka|7400161|
|Kävlinge|7400945|
|Laholm V|7400058|
|Landskrona|7400211|
|Lessebo|7400235|
|Lund|7400120|
|Malmö Central|7400003|
|Maria|7401542|
|Mölndals Nedre|7400315|
|Mörrum|7400366|
|Nybro|7400189|
|Osby|7400295|
|Ramlösa|7401270|
|Ronneby|7400069|
|Rydebäck|7401557|
|Skurup|7400138|
|Svedala|7400397|
|Svågertorp|7401546|
|Sölvesborg|7400079|
|Varberg|7400110|
|Vinslöv|7400179|
|Växjö|7400250|
|Ystad|7400028|
|Älmhult|7400045|
|Ängelholm|7400064|
|Ödåkra|7401543|
