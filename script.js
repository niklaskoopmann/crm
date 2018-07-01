getCustcommData();

var custcommJSON;
var customerTypes;
var custcommId = 0;
var view = "grid";

// search bar logic, filter by text on cards
$(document).ready(function () {
    $("#searchbar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        if (view == "list") {
            $(".table_row").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        } else {
            $(".card").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }

    });
});


// switch list grid view
// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// List View
function listView() {

    if (view == "grid") {

        $("#table_header").css("display", "table-row");
        elements[0].firstChild.childNodes.forEach(function (data) {
            $("#table_header").append($("<p class='table_cell'>" + data.firstChild.textContent + "</p>"));
        });

        for (var i = 0; i < elements.length; i++) {
            // add new div per card
            var newTableRow = $("<div class='table_row'></div>");
            // iterate through table rows
            elements[i].firstChild.childNodes.forEach(function (data) {

                newTableRow.append("<p class='table_cell'>" + data.lastChild.textContent + "</p>");
            });
            // append div to table_body
            newTableRow.css("display", "table-row");
            $("#table_body").append(newTableRow);

            elements[i].style.display = "none";
            /*var tableRows = $($(elements[i]).children()[0]).children();
            for(var j = 0; j < tableRows.length; j++) {
                $(tableRows[j]).children()[0].style.width = "30%";
                $(tableRows[j]).children()[1].style.width = "80%"; // backup solution
            }*/
        }

        $(".table_cell").css("display", "table-cell");
        notification("success", "Hurra! Liste! (Tabelle stylen)");
    }
    view = "list";
}

// Grid View
function gridView() {

    // delete all children of #table_header and #table_body
    $("#table_header").empty();
    $("#table_body").empty();

    for (var i = 0; i < elements.length; i++) {

        elements[i].style.display = "initial";
        elements[i].style.width = "9cm";
        elements[i].style.float = "left";
        elements[i].style.padding = "10px";
        elements[i].style.margin = "2%";
    }
    if (view == "list") notification("success", "Hurra! Kacheln!");
    view = "grid";
}

// convert weird date format to normal interpretable format
function convertDateElement(weirdDate) {

    // function assumes format MMM DD, YYYY HH:MM:SS (AM/PM) WITH leading zeroes
    // returns date of format YYYY-MM-DDTHH:MM:SS to be parsed into a date object

    var normalDate;

    //Auslesen der einzelnen Teile als neue Strings
    var MonatBuchstaben = weirdDate.substring(0, 3);
    var Tag = weirdDate.substring(4, 6);
    var Jahr = weirdDate.substring(8, 12);
    var Zeit12h = weirdDate.substring(13, 21);
    var AmPm = weirdDate.substring(22, 24);

    //Umwandeln des Monats in eine Zahl
    var MonatZahl;
    switch (MonatBuchstaben) {
        case "Jan":
            MonatZahl = "01";
            break;
        case "Feb":
            MonatZahl = "02";
            break;
        case "Mar":
            MonatZahl = "03";
            break;
        case "Apr":
            MonatZahl = "04";
            break;
        case "May":
            MonatZahl = "05";
            break;
        case "Jun":
            MonatZahl = "06";
            break;
        case "Jul":
            MonatZahl = "07";
            break;
        case "Aug":
            MonatZahl = "08";
            break;
        case "Sep":
            MonatZahl = "09";
            break;
        case "Oct":
            MonatZahl = "10";
            break;
        case "Nov":
            MonatZahl = "11";
            break;
        case "Dec":
            MonatZahl = "12";
            break;
        default:
            MonatZahl = "XX";
            break;
    }

    //Umwandeln der Zeit in das 24h-System
    var Zeit24h;
    var Stunden = Number(Zeit12h.substring(0, 2));
    var StundenCopy = Stunden;
    switch (AmPm) {
        case "AM":
            if (Stunden == 12) Stunden = 0;
            Zeit24h = Zeit12h;
            break;
        case "PM":
            if (Stunden != 12) Stunden = (12 + Stunden) % 24;
            Zeit24h = Zeit12h.replace(StundenCopy, Stunden);
            break;
    }

    //Zusammensetzen der einzelnen Bestandteile
    normalDate = Jahr.concat("-", MonatZahl, "-", Tag, "T", Zeit24h);

    return normalDate;
}

function createBS4card(data) { // update card appending using jquery (see display notes 22 lines below)

    // create div for card
    var currentCard = $("<div>").addClass("card column");

    // table for card
    var cardTable = $("<table>").attr("id", "card_table");

    // card header (customer)
    cardTable.append($("<tr id='customer-name'><th>Name</th><td>" + data.customer.name + "</td></tr>"));

    // set communication type in card
    var commType = "";
    if (data.type == 2) commType = "Anruf";
    else if (data.type == 3) commType = "E-Mail";
    else commType = "Andere";
    cardTable.append($("<tr id='customer-commtype'><th>Kom&shy;mu&shy;ni&shy;ka&shy;ti&shy;ons&shy;typ</th><td>" + commType + "</td></tr>"));

    // display customer type
    var custType = "";
    if (data.customer.type == 1) custType = "bereits Kunde";
    else if (data.customer.type == 2) custType = "voraussichtlicher Kunde";
    else custType = "Andere";
    cardTable.append($("<tr id='customer-type'><th>Art</th><td>" + custType + "</td></tr>"));

    // display communication date
    cardTable.append($("<tr id='customer-datetime'><th>Datum und Uhr&shy;zeit</th><td>" + data.commDate + "</td></tr>"));

    // display notes
    cardTable.append($("<tr id='customer-name'><th>Notizen</th><td><pre class='card-text'><small class = 'text-muted'>" + data.details + "</small></pre></td></tr>"));

    // append all to card
    $(currentCard).append(cardTable);

    return currentCard;
}

function addButtonsToCard(card) {
    var divButtons = $("<div>").attr("id", "card-buttons");
    var editButton = $("<button type='button' id='edit-card-button' onclick='editCardDetails(event)'>Bearbeiten</button>");
    var delButton = $("<button type='button' id='delete-card-button' onclick='deleteCard()'>Löschen</button>");
    $(divButtons).append(editButton);
    $(divButtons).append(delButton);
    $(card).append(divButtons);
    return card;
}

function showAddEventForm() {
    $("#add_event_data").css("display", "block");
    $('#add_card').css("visibility", "hidden");
}

function hideAddEventForm() {
    $("#add_event_data").css("display", "none");
    $("#add_card").css("visibility", "visible");
    resetAddEventForm();
}

function resetAddEventForm() {
    $("#add_event_data")[0].reset();
}

// edit card button logic
var cardDetailsBackup = [];

function editCardDetails(event) {

    // create invisible form for easier submit
    $(event.target).parent().parent().append($("<form id='edit-event-data' name='edit-form' style='visibility:none'>"));

    // save everything to array
    var editedCardChildren = $(event.target).parent().parent().find("#card_table").children();
    for (var i = 0; i < editedCardChildren.length; i++) {
        cardDetailsBackup[i] = $(editedCardChildren[i]).children()[1].innerText;
    }

    // text field for name
    var textField = $("<input type='text'>").val(cardDetailsBackup[0]);
    $($(editedCardChildren[0]).children()[1]).replaceWith(textField);

    // radio buttons for communication type
    var radioButtonsCommType = $("<div id='edit-card-commtype-radio-group'>");
    radioButtonsCommType.append($("<input type='radio' name='edit-card-radio-commtype' id='edit-commtype-tel'><label for='edit-commtype-tel'>Telefon</label><br>"));
    radioButtonsCommType.append($("<input type='radio' name='edit-card-radio-commtype' id='edit-commtype-mail'><label for='edit-commtype-mail'>E-Mail</label>"));
    $($(editedCardChildren[1]).children()[1]).replaceWith(radioButtonsCommType);
    if (cardDetailsBackup[1] == "Anruf") $("#edit-commtype-tel").prop("checked", true);
    else if (cardDetailsBackup[1] == "E-Mail") $("#edit-commtype-mail").prop("checked", true);

    // datetime-picker for communication time and date
    var datetimepicker = $("<input type='datetime-local'>").val(convertDateElement(cardDetailsBackup[3]));
    $($(editedCardChildren[3]).children()[1]).replaceWith(datetimepicker);

    // textarea for notes
    var textAreaNotes = $("<textarea id='edit-comm-notes'>").val(cardDetailsBackup[4]);
    $($(editedCardChildren[4]).children()[1]).replaceWith(textAreaNotes);

    // manage buttons
    editedCardChildren.parent().parent().find("#edit-card-button").hide();
    editedCardChildren.parent().parent().find("#delete-card-button").hide();
    editedCardChildren.parent().parent().find("#card-buttons").append("<button type='button' id='save-edit-card-button' onclick='saveEditCardDetails(event)'>Speichern</button>");
    editedCardChildren.parent().parent().find("#card-buttons").append("<button type='button' id='abort-edit-card-button' onclick='abortEditCardDetails(event)'>Abbrechen</button>");
}

// abort editing of card details -> revert to original data
function abortEditCardDetails(event) {
    var editedCardChildren = $(event.target).parent().parent().find("#card_table").children();
    for (var i = 0; i < editedCardChildren.length - 1; i++) {
        $($(editedCardChildren[i]).children()[1]).replaceWith("<td>" + cardDetailsBackup[i] + "</td>");
    }
    $($(editedCardChildren[editedCardChildren.length - 1]).children()[1]).replaceWith("<td><pre class='card-text'><small class = 'text-muted'>" + cardDetailsBackup[editedCardChildren.length - 1] + "</small></pre></td>");
    notification("info", "Bearbeitung abgebrochen.");
    view == "list" ? listView() : gridView();
    editedCardChildren.parent().parent().find("#edit-card-button").show();
    editedCardChildren.parent().parent().find("#delete-card-button").show();
    editedCardChildren.parent().parent().find("#abort-edit-card-button").remove();
    editedCardChildren.parent().parent().find("#save-edit-card-button").remove();
}

function saveEditCardDetails(event) {
    abortEditCardDetails(event);
    notification("error", "Diese Funktion sollte die Änderungen speichern und posten. Allerdings existiert dafür noch kein Action Code.");
}

function deleteCard() {
    notification("error", "Diese Funktion sollte die Karte und damit das Kommunikationsevent löschen können. Allerdings existiert dafür noch kein Action Code.");
}

function notification(type, msg) {
    $("#alertbox").empty();
    var box = document.createElement("div");
    box.innerHTML = "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
    switch (type) {
        case "success":
            box.setAttribute("class", "alert alert-success alert-dismissible");
            box.innerHTML += ("<strong>Erfolg! </strong> " + msg);
            break;
        case "info":
            box.setAttribute("class", "alert alert-info alert-dismissible");
            box.innerHTML += ("<strong>Info! </strong> " + msg);
            break;
        case "error":
            box.setAttribute("class", "alert alert-danger alert-dismissible");
            box.innerHTML += ("<strong>Fehler! </strong> " + msg);
            break;
        default:
            alert("Error in notification(type, msg)!");
            break;
    }
    document.getElementById("alertbox").append(box);
}

// post to server on submit
$("#add_event_data").submit(function (data) {
    var updateJSON = $(this).serializeArray();
    console.log(updateJSON);

    // decide communication type
    var commType = 0;
    if ($("#contact_tel").prop("checked", true)) commType = 2;
    else if ($("#contact_mail").prop("checked", true)) commType = 3;

    // customer element
    var customer = {
        "id": "1",
        "name": $("#contact_name").val(),
        "type": "1"
    };

    // post to server
    $.ajax({
        type: "POST",
        url: "http://h2669567.stratoserver.net:8080/intranet/update.jsp?action=newcustcomm",
        cache: false,
        data: {
            id: custcommId,
            customer: customer,
            type: commType,
            commDate: $("#contact_datetime").val(),
            details: $("#contact_notes").val()
        },
        success: function (result) {
            console.log(result);
            //getCustcommData();
        }
    });
});

function getCustcommData() {
    $.get("http://h2669567.stratoserver.net:8080/intranet/jsoncustcomm.jsp", function (data, status) {
        if (data.status != "ok") {
            notification("error", "Datensatz Customer Communication fehlerhaft!");
        }
        console.log("Data Communication: \n" + JSON.stringify(data) + "\n\nStatus :\n" + status);
        custcommJSON = data;
        custcommId = 0;
        data.custcomm.forEach(function (data) {
            custcommId++;
            var cardWithData = createBS4card(data);
            var cardWithButtons = addButtonsToCard(cardWithData, data);
            $("#bs4cards").append(cardWithButtons);
        });
        notification("success", "Daten erfolgreich geladen!");
    });
}

function getUserData() {
    $.get("http://h2669567.stratoserver.net:8080/intranet/user.jsp", function (data, status) {
        if (data.status != "ok") {
            notification("error", "Datensatz User fehlerhaft!");
        }
        console.log("Data Users: \n" + JSON.stringify(data) + "\n\nStatus :\n" + status);

    });
}
