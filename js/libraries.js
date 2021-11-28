function visibility() {
    let icon = document.getElementById("show-icon");
    if (icon.textContent == "visibility_off") {
        icon.innerHTML = "visibility";
        $('#btn-save').hide();
        $('#lib-table').hide();

    } else {
        icon.innerHTML = "visibility_off";
        $('#btn-save').show();
        $('#lib-table').show();

    }
};

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Lib/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);
            $('#lib-table').show();

        }
    });

});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printCategories(response);
        }
    });

});

function getLibs() {
    $.ajax({
        url: "http://localhost:8080/api/Lib/all",
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
        table += "<th>" + data[i].target + "</th>";
        table += "<th>" + data[i].capacity + "</th>";
        table += "<th>" + data[i].name + "</th>";
        table += "<th>" + data[i].description + "</th>";
        table += "<th>" + data[i].category.name + "</th>";
        table += "<th>" + "<button type='button' id='btn-view' class='btn btn-info btn-sm'  onClick='showDetail(" + dataToSend + ")'>" + "<span class='material-icons'>visibility</span></button><button type='button' id='btn-update' class='btn btn-warning btn-sm'  onClick='showUpdate(" + dataToSend + ")'>" + "<span class='material-icons'>update</span></button><button type='button' id='btn-delete' class='btn btn-danger btn-sm' onClick='showDelete(" + data[i].id + ")'>" + "<span class='material-icons'>delete</span ></button>" + "</th > ";
        table += "</tr>";
    }
    $("#result").empty();
    $("#result").append(table);
}

function printCategories(response) {
    let data = response;
    let select = "<select id='category-id' class='form-select' aria-label='Default select example'>";
    select += "<option selected>" + "Choose a cotegory" + "</option>";
    for (i = 0; i < data.length; i++) {
        select += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
    }
    select += "</select>";
    $("#category-id-save").empty();
    $("#category-id-save").append(select);


}


function saveInfo() {
    let myData = {
        target: $('#target').val(),
        capacity: parseInt($('#capacity').val()),
        category: { id: parseInt($('#category-id').val()) },
        name: $('#name').val(),
        description: $('#description').val()
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'url': 'http://localhost:8080/api/Lib/save',
        'type': 'POST',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#target').val();
            $('#capacity').val();
            $('#category-id').val();
            $('#name').val();
            $('#description').val();
            getLibs();
        },
    });

    $('#save-modal').modal('hide');
    $("#result").empty();
}

function updateInfo(id) {
    let myData = {
        id: id,
        target: $('#target-update').val(),
        name: $('#name-update').val(),
        description: $('#description-update').val(),
        capacity: parseInt($('#capacity-update').val()),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'url': 'http://localhost:8080/api/Lib/update',
        'type': 'PUT',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#target-update').val();
            $('#capacity-update').val();
            $('#name-update').val();
            $('#description-update').val();
            getLibs();
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
        'url': 'http://localhost:8080/api/Lib/' + data,
        'type': 'DELETE',
        'datatype': 'JSON ',
        success: function(response) {
            $('#result').empty();
            getLibs();
        },
    });
    $('#delete-lib-modal').modal('hide');
    $("#result").empty();

}


$(document).on("click", "#btn-save", function() {
    $('#target').val('');
    $('#capacity').val('');
    $('#category-id').val('');
    $('#name').val('');
    $('#description').val('');
    $('#save-modal').modal('show');
});

function showUpdate(data) {
    let = null;
    id = data.id;
    console.log(id)
    $("#target-update").val(data.target);
    $("#capacity-update").val(data.capacity);
    $("#name-update").val(data.name);
    $("#description-update").val(data.description);
    const update = document.querySelector("#update");
    update.addEventListener("click", function(event) {
        updateInfo(id);
    })
    $('#update-modal').modal('show');
};


function showDelete(id) {
    $('#modalTitleDelete').text('Are you sure ?');
    $('#delete-lib-modal').modal('show');
    const idLib = id;
    const confirm = document.querySelector("#btn-confirm");
    confirm.addEventListener("click", function(event) {
        deleteInfo(idLib);
    })
}


function showDetail(data) {
    $("#target-detail").text(data.target);
    $("#capacity-detail").text(data.capacity);
    $("#name-detail").text(data.name);
    $("#description-detail").text(data.description);
    $("#category-detail").text(data.category.name);
    $("#detail-modal").modal('show');
};