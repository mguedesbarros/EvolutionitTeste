/// <reference path="../jquery-1.10.2.intellisense.js" />

$(document).ready(function () {
    loadData();
});

function loadData() {
    $.ajax({
        url: "/Biblioteca/Consulta",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Nome + '</td>';
                html += '<td>' + item.Autor + '</td>';
                html += '<td>' + item.Editora + '</td>';
                html += '<td><a href="#" data-toggle="tooltip" data-placement="top" title="Detalhe" class="btn btn-primary" onclick="return GetDadosLivro(' + item.Id + ', true)"><i class="glyphicon glyphicon-zoom-in"></i></a>';
                html += '<a href = "#" data-toggle="tooltip" data-placement="top" title="Editar" class="btn btn-primary" onclick = "return GetDadosLivro(' + item.Id + ', false)" > <i class="glyphicon glyphicon-edit" /></a >';
                html += '<a href="#" data-toggle="tooltip" data-placement="top" title="Excluir" class="btn btn-danger" onclick="Deletar(' + item.Id + ')"><i class="glyphicon glyphicon-remove"></i></a></td > ';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Não foi possível consultar'
            });
        }
    });
}

function Consultar() {

    $.ajax({
        url: "/Biblioteca/Consulta",
        type: "GET",
        data: {
            strNome: $('#NomeFiltro').val(),
            strAutor: $('#AutorFiltro').val()
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Nome + '</td>';
                html += '<td>' + item.Autor + '</td>';
                html += '<td>' + item.Editora + '</td>';
                html += '<td><a href="#" data-toggle="tooltip" data-placement="top" title="Detalhe" class="btn btn-primary" onclick="return GetDadosLivro(' + item.Id + ', true)"><i class="glyphicon glyphicon-zoom-in"></i></a>';
                html += '<a href = "#" data-toggle="tooltip" data-placement="top" title="Editar" class="btn btn-primary" onclick = "return GetDadosLivro(' + item.Id + ', false)" > <i class="glyphicon glyphicon-edit" /></a >';
                html += '<a href="#" data-toggle="tooltip" data-placement="top" title="Excluir" class="btn btn-danger" onclick="Deletar(' + item.Id + ')"><i class="glyphicon glyphicon-remove"></i></a></td > ';
                html += '</tr>';
            });
            $('.tbody').html(html);

            $('#NomeFiltro').val("");
            $('#AutorFiltro').val("");
        },
        error: function (errormessage) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Não foi possível consultar'
            });
        }
    });
}

function Adicionar() {

    var res = Validacao();
    if (res == false) {
        return false;
    }
    var livroObj = {
        Id: $('#Id').val(),
        Nome: $('#Nome').val(),
        Editora: $('#Editora').val(),
        Autor: $('#Autor').val(),
        Ano: $('#Ano').val(),
        Descricao: $('#Descricao').val()
    };
    $.ajax({
        url: "/Biblioteca/CadastroLivro",
        data: JSON.stringify(livroObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();

            $('#modalAddOrEdit').modal('toggle');
            $('.modal-backdrop').css('display', 'none');

            if (result == 'Sucesso')
                swal({
                    type: 'success',
                    title: 'Livro adicionado com sucesso',
                    showConfirmButton: false,
                    timer: 2000
                })
            else
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Não foi possível adicionar o livro'
                });
        },
        error: function (errormessage) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Não foi possível adicionar o livro'
            });
        }
    });
}

function GetDadosLivro(Id, detalhe) {

    $('#Nome').css('border-color', 'lightgrey');
    $('#Editora').css('border-color', 'lightgrey');
    $('#Autor').css('border-color', 'lightgrey');
    $('#Ano').css('border-color', 'lightgrey');
    $('#Descricao').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Biblioteca/GetDadosLivro/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Nome').val(result.Nome);
            $('#Editora').val(result.Editora);
            $('#Autor').val(result.Autor);
            $('#Ano').val(result.Ano);
            $('#Descricao').val(result.Descricao);

            $('#modalAddOrEdit').modal('show');

            if (detalhe) {

                $("#Nome").prop('disabled', true);
                $("#Editora").prop('disabled', true);
                $("#Autor").prop('disabled', true);
                $("#Ano").prop('disabled', true);
                $("#Descricao").prop('disabled', true);

                $('#btnAtualizar').hide();
                $('#btnAdicionar').hide();
            } else {

                $("#Nome").prop('disabled', false);
                $("#Editora").prop('disabled', false);
                $("#Autor").prop('disabled', false);
                $("#Ano").prop('disabled', false);
                $("#Descricao").prop('disabled', false);

                $('#btnAtualizar').show();
                $('#btnAdicionar').hide();
            }            
        },
        error: function (errormessage) {
           
        }
    });
    return false;
}

function Atualizar() {
    var res = Validacao();
    if (res == false) {
        return false;
    }
    var livroObj = {
        Id: $('#Id').val(),
        Nome: $('#Nome').val(),
        Autor: $('#Autor').val(),
        Editora: $('#Editora').val(),
        Ano: $('#Ano').val(),
        Descricao: $('#Descricao').val()
    };
    $.ajax({
        url: "/Biblioteca/Editar",
        data: JSON.stringify(livroObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#modalAddOrEdit').modal('hide');
            $('#Id').val("");
            $('#Nome').val("");
            $('#Editora').val("");
            $('#Ano').val("");
            $('#Autor').val("");
            $('#Descricao').val("");

            if (result == 'Sucesso')
                swal({
                    type: 'success',
                    title: 'Livro atualizado com sucesso',
                    showConfirmButton: false,
                    timer: 2000
                })
            else
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Não foi possível atualizar o livro'
                });

            
        },
        error: function (errormessage) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Não foi possível atualizar o livro'
            });
        }
    });
}

function Deletar(ID) {

    swal({
        title: 'Deseja excluir o livro?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, quero excluir!'
    }).then((result) => {
        if (result) {
            $.ajax({
                url: "/Biblioteca/Deletar/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadData();

                    if (result == 'Sucesso')
                        swal({
                            type: 'success',
                            title: 'Livro excluído com sucesso',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    else
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Não foi possível excluir o livro'
                        });
                },
                error: function (errormessage) {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Não foi possível excluir o livro'
                    });
                }
            });
        }
    });
}

function clearTextBox() {

    $("#Nome").prop('disabled', false);
    $("#Editora").prop('disabled', false);
    $("#Autor").prop('disabled', false);
    $("#Ano").prop('disabled', false);
    $("#Descricao").prop('disabled', false);

    $('#Id').val("");
    $('#Nome').val("");
    $('#Autor').val("");
    $('#Editora').val("");
    $('#Ano').val("");
    $('#Descricao').val("");
    $('#btnAtualizar').hide();
    $('#btnAdicionar').show();
}

function Validacao() {
    var isValid = true;
    if ($('#Nome').val().trim() == "") {
        $('#Nome').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nome').css('border-color', 'lightgrey');
    }
    if ($('#Autor').val().trim() == "") {
        $('#Autor').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Autor').css('border-color', 'lightgrey');
    }
    if ($('#Editora').val().trim() == "") {
        $('#Editora').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Editora').css('border-color', 'lightgrey');
    }
    if ($('#Ano').val().trim() == "") {
        $('#Ano').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Ano').css('border-color', 'lightgrey');
    }

    return isValid;
}