/// <reference path="../jquery-1.10.2.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    //loadData();

    $("#btnCadastrar").click(function () {

        $('#Login').val("");
        $('#Senha').val("");

        var usuario = new Object();
        usuario.Login = $('#txtLogin').val();
        usuario.Senha = $('#txtSenha').val();
        if (usuario != null) {
            $.ajax({
                type: "POST",
                url: "/Usuario/NovoUsuario",
                data: JSON.stringify(usuario),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (response) {
                    if (response == "Sucesso") {
                        swal({
                            type: 'success',
                            title: 'Usuário cadastrado com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        $('#modal-novousuario').modal('hide');
                    } else {

                        swal({
                            type: 'error',
                            title: 'Não foi possível cadastrar o usuário.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        $('#modal-novousuario').modal('hide');

                    }
                },
                failure: function (response) {
                    swal({
                        type: 'error',
                        title: 'Não foi possível cadastrar o usuário.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $('#modal-novousuario').modal('hide');
                },
                error: function (response) {
                    swal({
                        type: 'error',
                        title: 'Não foi possível cadastrar o usuário.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $('#modal-novousuario').modal('hide');
                }
            });
        }
    });
});


function Logar() {

    var usuarioObj = {
        Login: $('#Login').val(),
        Senha: $('#Senha').val(),
    };
    $.ajax({
        url: "/Usuario/ValidaLogin",
        data: JSON.stringify(usuarioObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == "Erro") {

                $('#Login').val("");
                $('#Senha').val("");

                swal({
                    type: 'error',
                    title: 'Login e/ou senha inválido',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                window.location.href = result;
            }
        },
        error: function (errormessage) {

            $('#Login').val("");
            $('#Senha').val("");

            swal({
                type: 'error',
                title: 'Login e/ou senha inválido',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}