# FORR3FV05EU - Verkefni 5

Mikael Andri Ingason - Tækniskólinn - 2020

### Verkefnalýsing
Ég er að búa til app sem bendir á staðsetningu miðað við staðsetningu/snúning þinn.  
Notandinn slær inn staðsetningu og örin snýr í átt að henni (eins og einhverskonar áttaviti)

Það býr ekki til leiðir að staðsetningunni heldur bendir bara í beina átt að því svo að notandinn viti í hvaða átt hann á að fara.  
Appið virkar best fyrir mobile (síma og spjaldtölvur) en virkar samt fyrir tölvur (eini gallinn er að það er ekki responsive)

Verkefnið mun nota map API og skynjara símans til að virka. Örin er SVG og mun mögulega nota Anime.js til að virka.  
Í bakgrunninum verður kort sem sýnir staðsetningu notanda og endapunkts.

Mögulega mun ég bæta við skrefamæli og texta sem sýnir lengdina á milli.

***

### Skýringarmyndir
*Þetta sýnir ekki 100% virkni appsins, fer allt bara eftir snúning notandans og kortsins.*
<p>
<img src="https://github.com/MikaelAndriIngason/FORR3FV05EU-Verkefni-5/blob/main/skyringarmynd.png" alt="Skýringarmynd" width="250" height="444">
<img src="https://github.com/MikaelAndriIngason/FORR3FV05EU-Verkefni-5/blob/main/skyringarmynd2.png" alt="Skýringarmynd2" width="250" height="444">
</p>

***

### Myndband af notkun
https://photos.app.goo.gl/eLhTbA5zkHzrLgDd8

***

### Greinagerð um frumgerð
Í þessu verkefni notaði ég [LeafletJS](https://leafletjs.com/) fyrir kortið, það er ágætlega létt að nota og virkar vel, sum leiðinleg atriði við það en að mestu leiti gerði það sína vinnu. Leaflet kemur ekki með search bar en það er til plugin fyrir það sem kallast [Leaflet.Control.Search](https://leaflet-search.readthedocs.io/en/latest/) og það gerði notundum kleift að leita af staðsetningum.

Kóðinn sem reiknar fjarlægð á milli punkta er ekki 100% nákvæm, en það skiptir ekki mestu máli ef staðsetninganar eru ekki of langt frá (það reikar ekki með sveigju jarðarinar)  
Leaflet er með distanceTo() function en ég náði ekki að láta það virka.
***

### Útkoman
Verkefnið gekk ekki eins vel og ég vildi, átti samt von á því að það myndi enda þannig. Það er ekki nógu gott documentation um áttavita með Javascript, mest af því tengist bara hvernig síminn snýr og það gefur ekki réttar áttir. Það er til library sem kallast Compass.js, en það virkaði ekki heldur.  
Fann síðan út að símar nota magnetometer sensor til að finna út áttir, en það var líka lítið documentation með það.

Vegna þessa leiðinda þurfti ég að breyta því í í frekar venjulegt kort, það skynjar staðsetninguna þína og uppfærir fjarlægðina og punktinn þinn á kortinu.  
Ég hefði viljað hafa svg sem sýndi litlan spýtukall sem labbar þegar maður er á hreyfingu og stendur ef maður er kyrr.

Mistökin mín voru að reyna láta áttavitann virka, ég var bara svo þrjóskur að ég reyndi ekkert annað en það... þangað til að skilin byrjuðu að skríða inn, þá þurfti ég að reyna eitthvað annað.

***

### Github pages og innihald
Allur kóðinn og innihald er fyrir ofan (í main).

Hér er github pages  
https://mikaelandriingason.github.io/FORR3FV05EU-Verkefni-5/
