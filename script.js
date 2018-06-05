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
    
    // use button to add event
    var addEvent = document.getElementById("add_event");
    addEvent.onclick = function(){
        document.getElementById("remove_event").style.visibility = "hidden";
        document.getElementById("add_event_data").style.display = "block";
    };
    
    // abort adding event button logic
    var abortEvent = document.getElementById("abort_add_event_btn");
    abortEvent.onclick = function(){
        document.getElementById("remove_event").style.visibility = "visible";
        document.getElementById("add_event_data").style.display = "none";
    }
    