function visibility() {
    let icon = document.getElementById("show-icon");
    if (icon.textContent == "visibility_off") {
        icon.innerHTML = "visibility";
        $('#client-table').hide();

    } else {
        icon.innerHTML = "visibility_off";
        $('#client-table').show();

    }
};

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);

        }
    });

});

function getClients() {
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);
        }
    });
}

function printTable(response) {
    let data = response;
    let table = "";
    for (i = 0; i < data.length; i++) {
        let dataToSend = JSON.stringify(data[i])
        table += "<tr class='table-info'>";
        table += "<th>" + data[i].name + "</th>";
        table += "<th>" + data[i].email + "</th>";
        table += "<th>" + data[i].age + "</th>";
        table += "<th>" + "<button type='button' id='btn-view' class='btn btn-info btn-sm'  onClick='showDetail(" + dataToSend + ")'>" + "<span class='material-icons'>visibility</span></button><button type='button' id='btn-update' class='btn btn-warning btn-sm'  onClick='showUpdate(" + dataToSend + ")'>" + "<span class='material-icons'>update</span></button><button type='button' id='btn-delete' class='btn btn-danger btn-sm' onClick='showDelete(" + data[i].idClient + ")'>" + "<span class='material-icons'>delete</span ></button>" + "</th > ";
        table += "</tr>";
    }
    $("#result").empty();
    $("#result").append(table);
}


//alert
let alertPlaceholder = document.getElementById('liveAlertPlaceholder')

function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)
}


function saveInfo() {
    let myData = {
        name: $('#name-client').val(),
        email: $('#email-client').val(),
        password: $('#password-client').val(),
        age: parseInt($('#age-client').val()),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'url': 'http://localhost:8080/api/Client/save',
        'type': 'POST',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#name-client').val();
            $('#email-client').val();
            $('#password-client').val();
            $('#age-client').val();
            getClients();
            alert('You have successfullly registered!', 'success');

        },
    });
    $('#name-client').val('');
    $('#email-client').val('');
    $('#password-client').val('');
    $('#age-client').val('');
    $('#save-model').modal('hide');
    $("#result").empty();
}

function updateInfo(id) {
    let myData = {
        idClient: id,
        name: $('#name-update').val(),
        email: $('#email-update').val(),
        password: $('#password-update').val(),
        age: parseInt($('#age-update').val()),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'url': 'http://localhost:8080/api/Client/update',
        'type': 'PUT',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#name-update').val();
            $('#email-update').val();
            $('#password-update').val();
            $('#age-update').val();
            getClients();
        },
    });

    $('#update-modal').modal('hide');
    $("#result").empty();
}

function deleteInfo(id) {
    let data = id;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'url': 'http://localhost:8080/api/Client/' + data,
        'type': 'DELETE',
        'datatype': 'JSON ',
        success: function(response) {
            $('#result').empty();
            getClients();
        },
    });
    $('#delete-client-modal').modal('hide');
    $("#result").empty();

}

function showUpdate(data) {
    let = null;
    id = data.idClient;
    console.log(id)
    $("#name-update").val(data.name);
    $("#email-update").val(data.email);
    $("#age-update").val(data.age);
    const update = document.querySelector("#update");
    update.addEventListener("click", function(event) {
        updateInfo(id);
    })
    $('#update-modal').modal('show');
};


function showDelete(id) {
    $('#delete-client-modal').modal('show');
    const idClient = id;
    const confirm = document.querySelector("#btn-confirm");
    confirm.addEventListener("click", function(event) {
        deleteInfo(idClient);
    })
}


function showDetail(data) {
    $("#name-detail").text(data.name);
    $("#email-detail").text(data.email);
    $("#age-detail").text(data.age);
    $("#detail-modal").modal('show');
};