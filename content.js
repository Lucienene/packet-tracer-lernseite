window.LEARNING_CONTENT = {
  basics: {
    intro: "Du musst noch nichts können. Öffne in Packet Tracer ein Gerät, folge den Klickwegen und prüfe danach das Ergebnis. Diese Seite begleitet dich vom ersten Feld bis zum funktionierenden Netz. Die Zahlen hier sind Übungswerte: In deiner Klassenarbeit gelten die Angaben aus dem Auftrag.",
    terms: [
      { term: "IP-Adresse", description: "Die eigene Adresse eines Geräts. Beispiel: Der Firmenserver hat 192.168.99.3." },
      { term: "Subnetzmaske", description: "Bestimmt zusammen mit der IP-Adresse, welche Adressen im selben Netz liegen. Übernimm die Maske aus dem Auftrag; nicht jedes Gerät hat automatisch 255.255.255.0." },
      { term: "Default Gateway", description: "Die Routeradresse im eigenen Netz. Darüber erreicht ein Gerät andere Netze. Die PCs nutzen 192.168.20.1, der Firmenserver 192.168.99.1 und DNS ISP 192.168.10.1." },
      { term: "DNS Server", description: "Die Adresse des Geräts, das Namen in IP-Adressen übersetzt. In dieser Übung ist das immer 192.168.10.2, wenn ein Gerät einen Namen nachschlagen soll." },
      { term: "Static oder DHCP", description: "Static heißt: Du trägst feste Werte ein. DHCP heißt: Das Gerät holt sich seine Einstellungen automatisch. Unsere Server verwenden Static, die fünf PCs DHCP." },
      { term: "Server und Dienst", description: "Ein Server ist ein Gerät. Ein Dienst ist eine seiner Aufgaben. Unser Firmenserver bietet DHCP, HTTP und HTTPS an; DNS läuft auf einem anderen Server." }
    ],
    order: [
      "Arbeitskopie speichern: File → Save As. Den Aufgabentext lesen und IP-Adressen, Masken, Gateways, Namen und Zugangsdaten heraussuchen.",
      "Beide Server öffnen: Desktop → IP Configuration → Static. Alle Werte mit der Adresstabelle vergleichen, besonders das Gateway auf DNS ISP.",
      "DHCP einrichten und die Einstellungen auf den PCs neu abholen.",
      "DNS einrichten, dann Webseite über HTTP und HTTPS bereitstellen.",
      "SSH einrichten, wenn es der Auftrag verlangt; anschließend vom PC anmelden.",
      "Alle Dienste prüfen und die gesamte .pkt-Datei mit File → Save speichern."
    ],
    addresses: [
      { device: "Firmenserver · DHCP und Web", ip: "192.168.99.3", mask: "255.255.255.248", gateway: "192.168.99.1", dns: "192.168.10.2" },
      { device: "DNS ISP · Namensauflösung", ip: "192.168.10.2", mask: "255.255.255.0", gateway: "192.168.10.1", dns: "192.168.10.2" },
      { device: "PC1 bis PC5 · automatisch", ip: "192.168.20.150 bis .154", mask: "255.255.255.0", gateway: "192.168.20.1", dns: "192.168.10.2" },
      { device: "SOHO-Router · SSH-Ziel", ip: "192.168.20.1", mask: "bereits vorbereitet", gateway: "–", dns: "–" }
    ],
    note: "Für unser Beispielnetz setzen wir voraus: Verkabelung, Routeradressen, Routing und DHCP-Relay sind vorbereitet. Du richtest die Serverdienste und SSH selbst ein. Nach dem Öffnen deiner Packet-Tracer-Datei kurz warten, bis die Verbindungen grün sind."
  },
  services: [
    {
      id: "dhcp", title: "DHCP", subtitle: "PCs automatisch versorgen", description: "DHCP gibt einem PC seine IP-Adresse, Subnetzmaske, sein Gateway und den DNS-Server. Du stellst diese Angaben einmal auf dem DHCP-Server ein und aktivierst DHCP auf den PCs.",
      example: "„Die fünf Arbeitsplatz-PCs erhalten ihre Netzwerkeinstellungen automatisch. Die Vergabe beginnt bei 192.168.20.150. Verwenden Sie die Maske 255.255.255.0, das Gateway 192.168.20.1 und den DNS-Server 192.168.10.2.“",
      assignment: [
        { label: "automatisch", value: "DHCP", meaning: "Auf jedem Arbeitsplatz-PC DHCP auswählen." },
        { label: "beginnt bei", value: "192.168.20.150", meaning: "Das kommt in Start IP Address." },
        { label: "fünf PCs", value: "5", meaning: "Das kommt in Maximum Number of Users. Vergeben werden 192.168.20.150 bis 192.168.20.154." },
        { label: "Gateway", value: "192.168.20.1", meaning: "Das kommt in Default Gateway. Es ist die Routeradresse im PC-Netz." },
        { label: "DNS-Server", value: "192.168.10.2", meaning: "Das kommt in DNS Server. Es ist die Adresse von DNS ISP, nicht die des Webservers." }
      ],
      steps: [
        { title: "Den richtigen Server öffnen", text: "Klicke auf Firmenserver → Services → DHCP. Stelle den Schalter Service auf On." },
        { title: "Den Bereich auswählen", text: "Klicke unten in der Tabelle auf Firmennetz. Oben muss danach im Feld Pool Name ebenfalls Firmennetz stehen. Bearbeite in unserer Datei nicht serverPool oder DNS Mgmt Netz." },
        { title: "Die Werte eintragen", text: "Vergleiche jedes Feld mit dem Auftrag. Die Startadresse gehört zum Netz der PCs, obwohl der DHCP-Server selbst im Servernetz steht.", fields: [
          { label: "Pool Name", value: "Firmennetz" }, { label: "Default Gateway", value: "192.168.20.1" }, { label: "DNS Server", value: "192.168.10.2" }, { label: "Start IP Address", value: "192.168.20.150" }, { label: "Subnet Mask", value: "255.255.255.0" }, { label: "Maximum Number of Users", value: "5" }
        ] },
        { title: "Den Bereich speichern", text: "Bei einem bestehenden Bereich drückst du Save. Wenn laut Auftrag ein ganz neuer Bereich angelegt werden soll, trägst du einen neuen Pool Name und alle Werte ein und drückst Add. Lege keinen zweiten Bereich für dasselbe Netz an, wenn du nur vorhandene Werte ändern sollst." },
        { title: "Die PCs umstellen", text: "Öffne jeden PC → Desktop → IP Configuration → DHCP. Warte auf DHCP request successful. Stehen noch alte Werte dort, klicke kurz Static und anschließend wieder DHCP. Dadurch holt der PC die aktuellen Angaben ab." },
        { title: "Das Ergebnis ablesen", text: "Jeder PC muss eine andere Adresse zwischen 192.168.20.150 und 192.168.20.154 haben. Auf allen müssen Maske 255.255.255.0, Gateway 192.168.20.1 und DNS Server 192.168.10.2 stehen. Welcher PC welche der fünf Adressen bekommt, ist egal." }
      ],
      success: ["Am PC steht DHCP request successful.", "Alle fünf PCs haben unterschiedliche Adressen aus dem vorgegebenen Bereich.", "Gateway und DNS-Server am PC stimmen mit dem Auftrag überein."],
      errors: [
        { problem: "Der PC hat noch 192.168.20.3 und DNS 192.168.99.3.", fix: "Im Bereich Firmennetz DNS 192.168.10.2 und die neue Startadresse speichern. Am PC kurz Static, dann DHCP wählen. Eine Änderung am Server ersetzt alte PC-Werte nicht sofort." },
        { problem: "DHCP failed oder eine Adresse beginnt mit 169.254.", fix: "Service On, gespeicherten Bereich, freie Adressen und Verbindung prüfen. Liegt der Server in einem anderen Netz, braucht es einen passenden DHCP-Relay und Routing." },
        { problem: "Die Änderung wirkt nicht.", fix: "Prüfen, ob wirklich Firmennetz ausgewählt war und Save gedrückt wurde. Danach DHCP am PC neu anfordern." }
      ]
    },
    {
      id: "dns", title: "DNS", subtitle: "Den Webseitennamen auffindbar machen", description: "DNS beantwortet die Frage: Welche IP-Adresse gehört zu diesem Namen? Der PC fragt DNS ISP und bekommt die Adresse des Firmenservers zurück. DNS liefert die Adresse; die Webseite selbst kommt vom Webserver.",
      example: "„Richten Sie auf dem DNS-Server einen A-Eintrag ein. Die Firmenwebseite soll unter www.lernfirma.test erreichbar sein. Der Webserver besitzt die Adresse 192.168.99.3.“",
      assignment: [
        { label: "auf dem DNS-Server", value: "DNS ISP", meaning: "Hier wird der Namenseintrag angelegt." },
        { label: "unter diesem Namen", value: "www.lernfirma.test", meaning: "Das kommt ins Feld Name – ohne http:// und ohne /index.html." },
        { label: "A-Eintrag", value: "A Record", meaning: "Diesen Typ auswählen. Er ordnet dem Namen eine IPv4-Adresse zu." },
        { label: "Adresse des Webservers", value: "192.168.99.3", meaning: "Das kommt in Address. Dort liegt die Webseite." }
      ],
      steps: [
        { title: "Den Rückweg prüfen", text: "Öffne DNS ISP → Desktop → IP Configuration. Wähle Static und prüfe IP 192.168.10.2, Maske 255.255.255.0 und Default Gateway 192.168.10.1. Das Gateway ist nötig, damit Antworten das andere Netz der PCs erreichen." },
        { title: "DNS aktivieren", text: "Öffne auf DNS ISP den Reiter Services → DNS. Stelle DNS Service auf On." },
        { title: "Den Namen zuordnen", text: "Für einen neuen Namen trägst du die drei Werte ein und drückst Add. Gibt es genau diesen Namen bereits, wähle seine Tabellenzeile, bearbeite die Werte und drücke Save. Anschließend muss der richtige Eintrag unten in der Tabelle stehen. Ein alter, anders benannter Übungseintrag kann bestehen bleiben.", fields: [{ label: "Name", value: "www.lernfirma.test" }, { label: "Type", value: "A Record" }, { label: "Address", value: "192.168.99.3" }] },
        { title: "Den PCs den DNS-Server mitteilen", text: "Am PC muss unter Desktop → IP Configuration als DNS Server 192.168.10.2 stehen. Bei DHCP korrigierst du diese Angabe im DHCP-Bereich und lässt den PC die Einstellungen neu abholen." },
        { title: "Den Namen testen", text: "Öffne PC1 → Desktop → Command Prompt. Gib den folgenden Befehl ein und drücke Enter. In der Antwort muss beim angefragten Namen die Adresse 192.168.99.3 stehen.", code: "nslookup www.lernfirma.test" }
      ],
      success: ["Der A Record zeigt www.lernfirma.test → 192.168.99.3.", "nslookup fragt 192.168.10.2 und liefert für den Namen 192.168.99.3."],
      errors: [
        { problem: "Host Name Unresolved", fix: "DNS-Adresse am PC, DNS Service On, Schreibweise des A Records und Gateway auf DNS ISP prüfen. Den Namen in der URL genauso schreiben wie im DNS-Eintrag." },
        { problem: "Im DNS-Eintrag steht 192.168.10.2.", fix: "Address muss hier 192.168.99.3 sein: die Adresse des Webservers. 192.168.10.2 gehört in das DNS-Server-Feld der PCs." },
        { problem: "Der Eintrag stimmt, aber der PC fragt 192.168.99.3.", fix: "Im DHCP-Bereich als DNS Server 192.168.10.2 speichern und am PC kurz Static, dann DHCP wählen." }
      ]
    },
    {
      id: "http", title: "HTTP", subtitle: "Eine eigene Webseite anzeigen", description: "HTTP liefert die HTML-Datei vom Webserver an den Browser. Du schaltest den Dienst ein, speicherst eine Startseite und öffnest ihre Adresse auf einem PC.",
      example: "„Aktivieren Sie den Webdienst auf dem Firmenserver. Erstellen Sie eine Startseite mit der Überschrift ‚Willkommen bei Lernfirma‘ und dem Satz ‚Unser Firmennetz funktioniert.‘ Die Seite soll über HTTP erreichbar sein.“",
      assignment: [
        { label: "Webdienst über HTTP", value: "HTTP: On", meaning: "Auf dem Firmenserver den HTTP-Dienst aktivieren." },
        { label: "Startseite", value: "index.html", meaning: "Diese Datei bearbeiten. Sie wird üblicherweise beim Aufruf ohne Dateinamen geladen." },
        { label: "Überschrift", value: "Willkommen bei Lernfirma", meaning: "Den Text zwischen <h1> und </h1> schreiben." },
        { label: "über HTTP erreichbar", value: "http://www.lernfirma.test/index.html", meaning: "Diese vollständige Adresse im Browser von PC1 öffnen." }
      ],
      steps: [
        { title: "HTTP einschalten", text: "Öffne Firmenserver → Services → HTTP. Stelle HTTP auf On. Für den Test müssen die IP-Einstellungen des Servers stimmen und PC1 den Server erreichen können." },
        { title: "Die richtige Datei öffnen", text: "Suche index.html in der Dateiliste. Klicke in derselben Zeile auf (edit). Achte darauf, dass oben als File Name wirklich index.html steht." },
        { title: "Die Startseite schreiben", text: "Ersetze den bisherigen Inhalt durch dieses kleine Beispiel. <h1> macht eine große Überschrift, <p> einen Absatz.", code: "<html>\n<body>\n  <h1>Willkommen bei Lernfirma</h1>\n  <p>Unser Firmennetz funktioniert.</p>\n</body>\n</html>" },
        { title: "Speichern bestätigen", text: "Drücke Save. Bei der Nachfrage zum Überschreiben wählst du Yes. Danach kannst du erneut (edit) öffnen und kontrollieren, ob dein Text gespeichert ist." },
        { title: "Auf dem PC aufrufen", text: "Öffne PC1 → Desktop → Web Browser. Trage die vollständige Adresse ein, klicke Go und warte einige Sekunden.", code: "http://www.lernfirma.test/index.html", note: "Falls der Name noch nicht funktioniert, teste http://192.168.99.3/index.html. Klappt die IP, aber der Name nicht, prüfe DNS." },
        { title: "Andere Dateinamen verstehen", text: "Wenn du statt index.html beispielsweise seite.html bearbeitest, musst du /seite.html aufrufen. Eine Datei auf DNS ISP zu bearbeiten ändert die Webseite auf dem Firmenserver nicht. Für diese Übung bleibst du bei Firmenserver und index.html." }
      ],
      success: ["Im Browser erscheinen deine Überschrift und dein Satz.", "Die URL beginnt mit http:// und zeigt auf die Datei, die du bearbeitet hast."],
      errors: [
        { problem: "Die Seite ist weiß oder unverändert.", fix: "Go drücken und kurz warten. Dann HTTP On, richtigen Server, richtigen Dateinamen sowie Save und Yes prüfen. Die weiße Seite allein beweist noch keinen bestimmten Fehler." },
        { problem: "Ich habe Text geschrieben, sehe aber die Standardseite.", fix: "Wahrscheinlich wurde eine andere Datei bearbeitet oder der Inhalt noch nicht gespeichert. index.html auf dem Firmenserver kontrollieren und erneut aufrufen." },
        { problem: "Mein Back-Link bringt mich nicht weiter.", fix: "Ein Link auf index.html öffnet index.html. Steht er in index.html selbst, führt er wieder auf dieselbe Seite. Für den Auftrag brauchst du keinen Back-Link." }
      ]
    },
    {
      id: "https", title: "HTTPS", subtitle: "Dieselbe Webseite verschlüsselt aufrufen", description: "HTTPS überträgt die Webseite über eine verschlüsselte Verbindung. In unserem Packet-Tracer-Auftrag genügt der eigene HTTPS-Schalter auf dem Firmenserver. Der Inhalt bleibt dieselbe HTML-Datei.",
      example: "„Stellen Sie die Firmenwebseite zusätzlich über HTTPS bereit. Der Zugriff über HTTP soll weiterhin möglich sein.“",
      assignment: [
        { label: "zusätzlich über HTTPS", value: "HTTPS: On", meaning: "Den eigenen HTTPS-Schalter aktivieren. HTTP On allein reicht nicht." },
        { label: "HTTP weiterhin möglich", value: "HTTP: On lassen", meaning: "In diesem Auftrag sind beide Dienste gleichzeitig aktiv." },
        { label: "verschlüsselt aufrufen", value: "https://www.lernfirma.test/index.html", meaning: "Im Browser https:// verwenden. Der Dateiname bleibt gleich." }
      ],
      steps: [
        { title: "HTTPS einschalten", text: "Öffne Firmenserver → Services → HTTP. Rechts befindet sich HTTPS. Stelle diesen Schalter auf On. HTTP bleibt für unsere Übung ebenfalls auf On." },
        { title: "Die vorhandene Seite verwenden", text: "Du brauchst keine zweite HTML-Datei. Der Firmenserver stellt index.html auch über HTTPS bereit. Eigene Zertifikate werden in diesem Übungsauftrag nicht eingerichtet." },
        { title: "Die HTTPS-Adresse öffnen", text: "Öffne PC1 → Desktop → Web Browser. Gib die folgende Adresse ein, klicke Go und warte einige Sekunden.", code: "https://www.lernfirma.test/index.html" },
        { title: "Beide Zugriffsarten vergleichen", text: "Rufe die gleiche Datei anschließend mit http:// auf. In beiden Fällen muss dein Text erscheinen. Entscheidend für diesen Test ist das Protokoll am Anfang der URL, nicht eine andere Seitenüberschrift." }
      ],
      success: ["Deine Seite erscheint unter einer URL mit https://.", "Auch der vom Auftrag weiterhin geforderte HTTP-Aufruf funktioniert."],
      errors: [
        { problem: "HTTP funktioniert, HTTPS nicht.", fix: "Auf Firmenserver → Services → HTTP den eigenen HTTPS-Schalter prüfen und die URL mit https:// schreiben." },
        { problem: "Auch HTTPS zeigt Host Name Unresolved.", fix: "Das ist zunächst ein DNS-Problem. DNS-Adresse am PC, A Record und DNS-Gateway prüfen." },
        { problem: "Die HTTPS-Seite bleibt weiß.", fix: "Die vollständige URL mit /index.html aufrufen. Falls du eine andere Datei bearbeitet hast, deren genauen Namen verwenden. Danach Schalter und gespeicherten Inhalt prüfen." }
      ]
    },
    {
      id: "ssh", title: "SSH", subtitle: "Vom PC auf die Gerätekonsole zugreifen", description: "SSH ermöglicht einen verschlüsselten Fernzugriff auf einen Router oder Switch. Für unsere Übung richtest du SSH auf dem SOHO-Router ein und meldest dich von PC1 an. Routeradressen und Routing bleiben bestehen.",
      example: "„Richten Sie auf dem SOHO-Router SSH Version 2 ein. Verwenden Sie den Hostnamen r-firma, die Domäne lernfirma.test und den lokalen Benutzer admin mit dem Passwort lernen2026. Erzeugen Sie einen RSA-Schlüssel mit 2048 Bit. Auf den VTY-Leitungen 0 bis 4 soll nur SSH mit lokaler Anmeldung erlaubt sein.“",
      assignment: [
        { label: "Hostname und Domäne", value: "r-firma / lernfirma.test", meaning: "Diese Angaben werden vor der Schlüsselerzeugung eingetragen." },
        { label: "lokaler Benutzer", value: "admin / lernen2026", meaning: "Damit meldest du dich später an. Es sind erfundene Übungszugangsdaten." },
        { label: "RSA-Schlüssel", value: "2048 Bit", meaning: "Diese Zahl bei der Frage nach der Schlüssellänge eingeben." },
        { label: "Version 2, lokal, nur SSH", value: "ip ssh version 2 / login local / transport input ssh", meaning: "Diese drei Einstellungen gehören zur geforderten SSH-Konfiguration." }
      ],
      steps: [
        { title: "Die Konsole öffnen und den Modus beachten", text: "Klicke SOHO-Router → CLI. Drücke bei Bedarf Enter. Bei Router> beginnst du mit enable. Bei Router# lässt du enable weg und beginnst mit configure terminal. Enthält der Prompt (config), (config-if) oder (config-line), gib zuerst end ein und beginne danach bei Router# mit configure terminal. Den angezeigten Routerprompt tippst du nicht mit." },
        { title: "Namen und Benutzer einrichten", text: "Die folgende Folge beginnt bei Router>. Gib jede Zeile einzeln ein und bestätige mit Enter. Der Domainname hier erzeugt keinen DNS-Eintrag auf DNS ISP.", code: "enable\nconfigure terminal\nhostname r-firma\nip domain-name lernfirma.test\nusername admin secret lernen2026\ncrypto key generate rsa" },
        { title: "Die Schlüssellänge beantworten", text: "Bei How many bits in the modulus [512]: gibst du die folgende Zahl ein und drückst Enter. Warte auf die erfolgreiche Schlüsselerzeugung.", code: "2048", note: "Die 2048 ist die Antwort auf die Rückfrage, kein gewöhnlicher Konfigurationsbefehl. Der hier verwendete Router in Packet Tracer 9.0.1 unterstützt sie." },
        { title: "SSH für die Fernanmeldung zulassen", text: "Fahre im Konfigurationsmodus mit diesen Zeilen fort. login local nutzt den angelegten Benutzer; transport input ssh lässt auf den ausgewählten Fernzugriffsleitungen nur SSH zu.", code: "ip ssh version 2\nline vty 0 4\nlogin local\ntransport input ssh\nend\ncopy running-config startup-config" },
        { title: "Die Routerkonfiguration speichern", text: "Bei Destination filename [startup-config]? drückst du nur Enter. Danach soll [OK] erscheinen. Die ganze Packet-Tracer-Datei speicherst du zusätzlich mit File → Save." },
        { title: "Vom PC aus anmelden", text: "Öffne PC1 → Desktop → Command Prompt. Gib diesen Befehl ein. Das Zeichen nach dem Bindestrich ist ein kleines L. Bei Password: gibst du lernen2026 ein und drückst Enter. Beim Tippen erscheint das Passwort nicht.", code: "ssh -l admin 192.168.20.1", note: "Wenn der Auftrag SSH bereits vorbereitet hat und nur eine Verbindung verlangt, genügt dieser Anmeldeschritt mit den vorgegebenen Zugangsdaten." },
        { title: "Den Erfolg erkennen", text: "Nach der Anmeldung erscheint r-firma>. Du bedienst jetzt die Routerkonsole über das Netz. Gib exit ein, um die Verbindung zu beenden. Direkt am Router kann show ip ssh den SSH-Status anzeigen." }
      ],
      success: ["Am Router wurden die RSA-Schlüssel erfolgreich erzeugt und SSH Version 2 eingerichtet.", "Die Anmeldung von PC1 führt zum Prompt r-firma>.", "Die Routerkonfiguration und die .pkt-Datei sind gespeichert."],
      errors: [
        { problem: "Invalid input bei enable oder configure terminal.", fix: "Den Prompt prüfen. enable gehört bei Router>, configure terminal bei Router#. Mit end verlässt du einen Konfigurations-Untermodus." },
        { problem: "Bei der Schlüsselerzeugung fehlt ein Domainname.", fix: "Im globalen Konfigurationsmodus zuerst hostname und ip domain-name setzen, danach crypto key generate rsa erneut ausführen." },
        { problem: "Die Anmeldung wird abgelehnt.", fix: "Benutzer und Passwort genau prüfen. Auf den VTY-Leitungen müssen login local und transport input ssh stehen; RSA-Schlüssel und SSH-Dienst müssen vorhanden sein." },
        { problem: "Die Verbindung erreicht den Router nicht.", fix: "PC-Adresse und Verbindung prüfen. In unserem Netz ist das SSH-Ziel 192.168.20.1. Auf dem PC vorher ping 192.168.20.1 testen." }
      ]
    },
    {
      id: "relay", title: "DHCP-Relay", subtitle: "Zusatz: DHCP über einen Router hinweg", description: "Dieser Abschnitt ist optional. In unserer Startdatei ist DHCP-Relay vorbereitet. Wenn der DHCP-Server in einem anderen Netz als die PCs steht, leitet ein Relay ihre DHCP-Anfragen zum Server weiter.",
      example: "„Der DHCP-Server mit der Adresse 192.168.99.3 befindet sich im Servernetz. Richten Sie am Router eine DHCP-Weiterleitung für die Clients im LAN ein. Die LAN-seitige Schnittstelle heißt GigabitEthernet0/0/1.“",
      assignment: [
        { label: "LAN-seitige Schnittstelle", value: "GigabitEthernet0/0/1", meaning: "Diesen Anschluss wählst du am Router aus. Er liegt auf der Seite der PCs." },
        { label: "DHCP-Server", value: "192.168.99.3", meaning: "Diese Adresse kommt hinter ip helper-address. Es ist nicht die DNS-Adresse." }
      ],
      steps: [
        { title: "Prüfen, ob Relay überhaupt verlangt ist", text: "Stehen Server und PCs im selben Netz, brauchen ihre DHCP-Anfragen dafür keinen Router-Relay. In verschiedenen Netzen müssen zusätzlich passende Routerverbindungen und Routen vorhanden sein. In unserer Übungsdatei ist das vorbereitet." },
        { title: "Nur bei geforderter Einrichtung", text: "Öffne den zuständigen Router → CLI und gib die folgenden Zeilen passend zum Auftrag ein. Die Schnittstelle kann morgen anders heißen. Der Eintrag gehört auf die Seite der Clients.", code: "enable\nconfigure terminal\ninterface GigabitEthernet0/0/1\nip helper-address 192.168.99.3\nend\ncopy running-config startup-config" },
        { title: "Speichern und erneut anfordern", text: "Bei der Dateinamenfrage Enter drücken. Auf dem PC anschließend Desktop → IP Configuration → kurz Static → DHCP. Der Server benötigt weiterhin einen passenden Adressbereich für das Netz der PCs." }
      ],
      success: ["Der PC erhält auch über die Netzgrenze hinweg eine passende DHCP-Adresse."],
      errors: [
        { problem: "Als Helper ist die DNS-Adresse eingetragen.", fix: "Die Helper-Adresse muss auf den DHCP-Server zeigen. In unserer Übung ist das 192.168.99.3." },
        { problem: "Trotz Helper kommt keine Adresse.", fix: "Client-seitige Schnittstelle, DHCP-Dienst, passenden Pool und Routing prüfen. Ein Helper-Eintrag allein ersetzt diese Voraussetzungen nicht." }
      ]
    }
  ],
  troubleshooting: [
    { problem: "Host Name Unresolved", checks: ["PC → Desktop → IP Configuration: DNS Server muss 192.168.10.2 sein.", "Bei DHCP den DNS-Wert im Bereich Firmennetz korrigieren, Save drücken und am PC Static → DHCP wählen.", "DNS ISP → Services → DNS: On und A Record www.lernfirma.test → 192.168.99.3.", "DNS ISP → Desktop → IP Configuration: Gateway 192.168.10.1. In unserer Startdatei muss es ergänzt werden; nicht jede andere Übungsdatei hat diesen Fehler.", "Im PC-Command-Prompt nslookup www.lernfirma.test ausführen."] },
    { problem: "Die Webseite bleibt weiß", checks: ["Im Browser Go drücken und einige Sekunden warten.", "Firmenserver → Services → HTTP: den zur URL passenden HTTP- oder HTTPS-Schalter auf On stellen.", "Auf genau diesem Server die gewünschte HTML-Datei bearbeiten, Save drücken und Überschreiben mit Yes bestätigen.", "Die vollständige URL samt bearbeitetem Dateinamen aufrufen, beispielsweise /index.html oder /seite.html.", "Testweise http://192.168.99.3/index.html öffnen. Wenn nur der Name scheitert, DNS prüfen."] },
    { problem: "Der PC hat alte oder falsche Werte", checks: ["Auf dem DHCP-Server unten Firmennetz auswählen; oben den Poolnamen überprüfen.", "Gateway, DNS, Startadresse, Maske und Benutzeranzahl mit dem Auftrag vergleichen; Save drücken.", "Auf dem PC kurz Static, danach DHCP wählen und auf den Erfolg warten."] },
    { problem: "HTTP funktioniert, HTTPS nicht", checks: ["HTTPS hat auf Firmenserver → Services → HTTP einen eigenen On-Schalter.", "Die URL muss mit https:// beginnen.", "Die gespeicherte Datei und der Dateiname bleiben dieselben wie beim HTTP-Test."] },
    { problem: "SSH funktioniert nicht", checks: ["Zieladresse und Erreichbarkeit des Routers prüfen: in unserer Übung 192.168.20.1.", "Benutzer admin und Übungspasswort lernen2026 genau schreiben.", "Hostname, Domainname, erzeugte RSA-Schlüssel und ip ssh version 2 prüfen.", "Unter line vty 0 4 müssen login local und transport input ssh stehen.", "Bei Befehlsfehlern den aktuellen Routerprompt prüfen; mit end zurück zu Router# wechseln."] }
  ],
  practice: {
    title: "Beispielauftrag wie in der Klassenarbeit",
    intro: "Du erhältst ein vorbereitetes Netzwerk. Kabel, Routeradressen, Routing und DHCP-Relay sind vorhanden. Nimm die folgenden Dienste in Betrieb. Die Vorgaben hier sind ein vollständiger erfundener Übungsauftrag.",
    tasks: [
      { title: "Server vorbereiten", text: "Konfigurieren Sie den Firmenserver mit 192.168.99.3, Maske 255.255.255.248, Gateway 192.168.99.1 und DNS 192.168.10.2. Der DNS-Server verwendet 192.168.10.2, Maske 255.255.255.0 und Gateway 192.168.10.1." },
      { title: "DHCP bereitstellen", text: "Die fünf Arbeitsplatz-PCs sollen automatisch Adressen ab 192.168.20.150 erhalten. Verwenden Sie die Maske 255.255.255.0, das Gateway 192.168.20.1 und DNS 192.168.10.2. Bearbeiten Sie den vorhandenen Bereich Firmennetz. Es sollen genau fünf Adressen vergeben werden." },
      { title: "DNS einrichten", text: "Erstellen Sie einen A Record für www.lernfirma.test. Dieser Name soll auf den Firmenserver 192.168.99.3 zeigen." },
      { title: "HTTP und HTTPS anbieten", text: "Die Firmenstartseite index.html soll die Überschrift „Willkommen bei Lernfirma“ und den Text „Unser Firmennetz funktioniert.“ enthalten. Stellen Sie dieselbe Seite über HTTP und HTTPS bereit." },
      { title: "SSH konfigurieren", text: "Richten Sie auf dem SOHO-Router SSH Version 2 ein. Hostname: r-firma. Domäne: lernfirma.test. Benutzer: admin. Passwort: lernen2026. RSA-Schlüssellänge: 2048 Bit. Für VTY 0 bis 4 sind lokale Anmeldung und ausschließlich SSH zu verwenden." },
      { title: "Funktion prüfen und speichern", text: "Prüfen Sie die Adressvergabe auf allen fünf PCs. Öffnen Sie die Webseite auf PC1 über ihren Namen mit HTTP und HTTPS. Melden Sie sich von PC1 per SSH an 192.168.20.1 an. Speichern Sie die Routerkonfiguration und Ihre Packet-Tracer-Datei." }
    ],
    checklist: ["Fünf unterschiedliche PC-Adressen von 192.168.20.150 bis .154.", "Auf den PCs stehen das richtige Gateway und DNS 192.168.10.2.", "nslookup www.lernfirma.test liefert 192.168.99.3.", "Der eigene Text erscheint unter http://www.lernfirma.test/index.html.", "Derselbe Text erscheint unter https://www.lernfirma.test/index.html.", "SSH-Anmeldung mit admin führt zu r-firma>.", "Routerkonfiguration und eigene .pkt-Datei sind gespeichert."]
  },
  sources: [
    { title: "Cisco: SSH auf Routern einrichten", url: "https://www.cisco.com/c/en/us/support/docs/security-vpn/secure-shell-ssh/4145-ssh.html" },
    { title: "Packet-Tracer-Hilfe: Server konfigurieren", url: "https://tutorials.ptnetacad.net/help/default/config_servers.htm" },
    { title: "Cisco: DHCP-Relay konfigurieren", url: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipaddr_dhcp/configuration/15-s/dhcp-15-s-book/dhcp-relay-agent.html" }
  ],
  footer: "Für die lokale Übung in Packet Tracer 9.0.1. Menüs und unterstützte Befehle können je nach Gerät und Version abweichen. Übungswerte und erfundene Zugangsdaten immer durch die Angaben deines Auftrags ersetzen."
};
