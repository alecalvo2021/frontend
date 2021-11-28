function visibility() {
    let icon = document.getElementById("show-icon");
    if (icon.textContent == "visibility_off") {
        icon.innerHTML = "visibility";
        $('#btn-save').hide();
        $('#category-table').hide();

    } else {
        icon.innerHTML = "visibility_off";
        $('#btn-save').show();
        $('#category-table').show();

    }
};

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);
            $('#category-table').show();

        }
    });

});

function getCategories() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
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
        let dataToSend = JSON.stringify(data[i]);
        table += "<tr class='table-info'>";
        table += "<th>" + data[i].name + "</th>";
        table += "<th>" + data[i].description + "</th>"
        table += "<th>" + "<button type='button' id='btn-view' class='btn btn-info btn-sm'  onClick='showDetail(" + dataToSend + ")'>" + "<span class='material-icons'>visibility</span></button><button type='button' id='btn-update' class='btn btn-warning btn-sm'  onClick='showUpdate(" + dataToSend + ")'>" + "<span class='material-icons'>update</span></button><button type='button' id='btn-delete' class='btn btn-danger btn-sm' onClick='showDelete(" + data[i].id + ")'>" + "<span class='material-icons'>delete</span ></button>" + "</th > ";
        table += "</tr>";
    }
    $("#result-category").empty();
    $("#result-category").append(table);
}


function saveInfo() {
    let myData = {
        name: $('#name-category').val(),
        description: $('#description-category').val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'url': 'http://localhost:8080/api/Category/save',
        'type': 'POST',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#name-category').val();
            $('#description-category').val();
            getCategories();
        },
    });

    $('#save-category-modal').modal('hide');
    $("#result").empty();



}

function updateInfo(id) {
    let myData = {
        id: id,
        name: $('#name-update').val(),
        description: $('#description-update').val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'url': 'http://localhost:8080/api/Category/update',
        'type': 'PUT',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#target-update').val();
            $('#capacity-update').val();
            $('#name-update').val();
            $('#description-update').val();
            getCategories();
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
        'url': 'http://localhost:8080/api/Category/' + data,
        'type': 'DELETE',
        'datatype': 'JSON ',
        success: function(response) {
            $('#result').empty();
            getCategories();
        },
    });
    $('#delete-category-modal').modal('hide');
    $("#result").empty();

}

$(document).on("click", "#btn-save", function() {
    $('#name-category').val('');
    $('#description-category').val('');

    $('.modal-title').text('New Category');
    $('#save-category-modal').modal('show');
});

function showUpdate(data) {
    let = null;
    id = data.id;
    console.log(id)
    $("#name-update").val(data.name);
    $("#description-update").val(data.description);
    const update = document.querySelector("#update");
    update.addEventListener("click", function(event) {
        updateInfo(id);
    })
    $('#update-modal').modal('show');
};



function showDelete(id) {
    $('#delete-category-modal').modal('show');
    const idLib = id;
    const confirm = document.querySelector("#btn-confirm");
    confirm.addEventListener("click", function(event) {
        deleteInfo(idLib);
    })
}


function showDetail(data) {
    $("#name-detail").text(data.name);
    $("#description-detail").text(data.description);
    $("#detail-modal").modal('show');
};