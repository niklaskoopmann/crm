<!-- 

Dokumentenverwaltung:
h2669567.stratoserver.net:8080/intranet/jsondocs.jsp

jsonlint.com to validate json

http://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF for colours

bootstrap 4 filters implementieren

http://h2669567.stratoserver.net:8080/intranet/login.jsp login data:
email: mjanich@me.com
passwd: 12345

logo: logojoy.com

to do:
- Kommunikationsevents: Telefonate, Briefe, Mails
- Richtung der Kommunikation

file:///Applications/Brackets.app/Contents/www/LiveDevelopment/launch.html

-->
<!doctype html>
<html lang="de">
<meta charset="UTF-8">

<head>
    <link rel="Icon" href="./crm.png">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Customer Relationship Manager</title>
    <script src="jquery-3.3.1.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js" integrity="sha384-u/bQvRA/1bobcXlcEYpsEdFVK/vJs3+T+nXLsBYJthmdBuavHvAW6UsmqO2Gd/F9" crossorigin="anonymous"></script>
</head>

<body ononline="updateOnline(true)">
    <nav>
        <span><a href="#tasks">Aufgaben</a></span>
        <span><a href="#appointments">Termine</a></span>
        <span><a href="#people">Personen</a></span>
        <span><a href="#companies">Firmen</a></span>
        <span><a href="#offers">Angebote</a></span>
        <span><a href="#projects">Projekte</a></span>
    </nav>
    <main>
        <p id="welcome">
            Herzlich willkommen in Ihrem Customer Relationship Management System!
        </p>
        <div class="alert alert-danger alert-dismissible fade show">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>Danger!</strong> This BS4-alert-box tells you that we had no fucking clue what to do and simply started working on your global requirements...
        </div>
        <div id="docsbox">
        </div>
        <div id="people">
            <div id="people_header">
                <span id="people_header_span">
                    <h1>Personen</h1>
                    <span id="people_btns">
                        <button type="button" id="add_person">+</button>
                    </span>
                </span>
                <div id="add_person_data">
                    <p>Person hinzufügen</p>
                    Name: <input type="text"><br>
                    Firma: <input type="text"><br>
                    Telefonnummer: <input type="tel"><br>
                    E-Mail-Adresse: <input type="email"><br>
                    <button type="button" id="add_person_btn">Hinzufügen</button>
                    <button type="button" id="abort_add_person_btn">Abbrechen</button>
                </div>
            </div>
        </div>
        
        <div id="companies">
            <h1>Firmen</h1><br>
            <div id="firma">
                Name: <p id="company_name">Deutsche Bundesbank</p><br>
                Branche: <p id="company_branch">Finanzdienstleistungen</p><br>
                Ansprechpartner: <a id="company_contact"></a>
            </div>
            <div id="firma">
                Name: <p id="company_name">Deutsche Bundesbank</p><br>
                Branche: <p id="company_branch">Finanzdienstleistungen</p><br>
                Ansprechpartner: <a id="company_contact"></a>
            </div>
        </div>
    </main>
</body>
<script type="text/javascript">
var obj = { "status": "ok", "docs": [{ "id": 1, "name": "Abrechnung Feb18 Lidl/Schwarz", "filename": "testdocument.pdf", "owner": { "id": 1, "firstname": "Michael", "lastname": "Janich", "role": 0 }, "tags": [{ "id": 9, "category": "Kategorie", "label": "DRINGEND" }, { "id": 6, "category": "Kunde", "label": "LidlSchwarz" }, { "id": 2, "category": "Abteilung", "label": "Buchhaltung" }], "creationDate": "Mar 8, 2018 2:45:30 PM", "mimetype": "application/pdf", "bytelength": 18453 }, { "id": 2, "name": "Productbild Florida Pink Grapefruit Artikel-Nr.:32054", "filename": "F32054.jpg", "owner": { "id": 1, "firstname": "Michael", "lastname": "Janich", "role": 0 }, "tags": [{ "id": 9, "category": "Kategorie", "label": "DRINGEND" }, { "id": 6, "category": "Kunde", "label": "LidlSchwarz" }, { "id": 2, "category": "Abteilung", "label": "Buchhaltung" }], "creationDate": "Mar 8, 2018 2:45:30 PM", "mimetype": "image/jpeg", "bytelength": 16989 }] };

obj.docs.forEach(function(element) {

    var h1 = document.createElement("H1");

    var textnode = document.createTextNode(element.name);

    h1.appendChild(textnode);

    $("#docsbox").append(h1);
});

$.ajax({
    url: 'https://randomuser.me/api/?results=1',
    dataType: 'json',
    success: function(data) {
        if(data.results.length > 0){
            var removePersonBtn = document.createElement("button");
            removePersonBtn.setAttribute("id", "remove_person");
            removePersonBtn.append("-");
            document.getElementById("people_btns").appendChild(removePersonBtn);
        }
        data.results.forEach(function(data) {
            console.log(data);
            var br = document.createElement("br");
            var person = document.createElement("span");
            person.setAttribute("id", "person");
            var name = document.createTextNode(data.name.first + ' ' + data.name.last);
            var img = new Image();
            img.src = data.picture.medium;
            img.append(br);
            person.append(img);
            person.append(name);
            $("#people").append(person);
        })
    }
});

$.ajax({
   url: 'h2669567.stratoserver.net:8080/intranet/jsonevents.jsp',
        success: function(data) {
        console.log("Löppt");
    }
});
    
    // use button to add person
    var addPerson = document.getElementById("add_person");
    addPerson.onclick = function(){
        document.getElementById("remove_person").style.visibility = "hidden";
        document.getElementById("add_person_data").style.display = "block";
    };
    
    // abort adding person button logic
    var abortPerson = document.getElementById("abort_add_person_btn");
    abortPerson.onclick = function(){
        document.getElementById("remove_person").style.visibility = "visible";
        document.getElementById("add_person_data").style.display = "none";
    }
    
</script>
<footer>
    <div id="iconref">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    <div>
        <span id="linksfooter">Datenschutz</span>
        <span id="linksfooter">Impressum</span>
        <span id="linksfooter">Entwickler</span>
    </div>
</footer>

</html>