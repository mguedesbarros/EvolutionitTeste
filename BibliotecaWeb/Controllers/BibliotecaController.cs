using BibliotecaWeb.Models;
using Dapper;
using SweetAlert.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BibliotecaWeb.Controllers
{
    public class BibliotecaController : SweetController
    {
        private readonly Repository.DapperContext dapperContext;
        public BibliotecaController()
        {
            dapperContext = new Repository.DapperContext();
        }

        public ActionResult Home()
        {
            return View();
        }

        public JsonResult CadastroLivro(Livro livro)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", livro.Id);
                parameters.Add("@Nome", livro.Nome);
                parameters.Add("@Descricao", livro.Descricao);
                parameters.Add("@Editora", livro.Editora);
                parameters.Add("@Ano", livro.Ano);
                parameters.Add("@Autor", livro.Autor);

                dapperContext.ExecuteWithoutReturn("LivroAddOrEdit", parameters);

            }
            catch (Exception Ex)
            {
                Console.Write(Ex);
                return Json("Erro");
            }

            return Json("Sucesso");
        }

        public JsonResult Consulta(string strNome, string strAutor)
        {
            List<Livro> lLivro = new List<Livro>();

            try
            {
                DynamicParameters parameters = new DynamicParameters();
                lLivro = dapperContext.GetItems<Livro>("USP_LIVRO", parameters).ToList();

                if (!string.IsNullOrEmpty(strNome))
                    lLivro = lLivro.Where(x => x.Nome.ToLower() == strNome.ToLower()).ToList();

                if (!string.IsNullOrEmpty(strAutor))
                    lLivro = lLivro.Where(x => x.Autor.ToLower() == strAutor.ToLower()).ToList();
            }
            catch (Exception Ex)
            {
                Console.Write(Ex);
            }

            return Json(lLivro, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDadosLivro(int Id)
        {
            Livro livro = new Livro();

            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", Id);

                livro = dapperContext.GetItem<Livro>("USP_LIVRO", parameters);

            }
            catch (Exception Ex)
            {
                Console.Write(Ex);
            }

            return Json(livro, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Editar(Livro livro)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", livro.Id);
                parameters.Add("@Nome", livro.Nome);
                parameters.Add("@Descricao", livro.Descricao);
                parameters.Add("@Editora", livro.Editora);
                parameters.Add("@Ano", livro.Ano);
                parameters.Add("@Autor", livro.Autor);

                dapperContext.ExecuteWithoutReturn("LivroAddOrEdit", parameters);

            }
            catch (Exception Ex)
            {
                Console.Write(Ex);
                return Json("Erro");
            }

            return Json("Sucesso");
        }

        public JsonResult Deletar(int Id)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", Id);

                dapperContext.ExecuteWithoutReturn("DeletarLivro", parameters);

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