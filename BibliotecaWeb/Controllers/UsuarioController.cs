using BibliotecaWeb.Models;
using Dapper;
using SweetAlert.Controllers;
using System;
using System.Web.Mvc;

namespace BibliotecaWeb.Controllers
{
    public class UsuarioController : SweetController
    {
        private readonly Repository.DapperContext dapperContext;
        public UsuarioController()
        {
            dapperContext = new Repository.DapperContext();
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ValidaLogin(Usuario usuario)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Login", usuario.Login);
                parameters.Add("@Senha", usuario.Senha);

                var oUsuario = dapperContext.GetItem<Usuario>("USP_USUARIO", parameters);

                if (!object.ReferenceEquals(oUsuario, null))
                {
                    return Json(Url.Action("Home", "Biblioteca"));
                }

                Alert("Login e/ou senha inválido", NotificationType.info);
            }
            catch (Exception Ex)
            {
                Console.Write(Ex);

                return Json("Erro");
            }


            return Json("Erro");
        }

        public ActionResult NovoUsuario()
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult NovoUsuario(Usuario usuario)
        {
            try
            {

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Login", usuario.Login);
                parameters.Add("@Senha", usuario.Senha);

                dapperContext.ExecuteWithoutReturn("UsuarioAddOrEdit", parameters);

                //Alert("Usuário cadastrado com sucesso!", NotificationType.success);

            }
            catch (Exception Ex)
            {
                Console.Write(Ex);
                return Json("Erro");
            }


            return Json("Sucesso");
        }
    }
}