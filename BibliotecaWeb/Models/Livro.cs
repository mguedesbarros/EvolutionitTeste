using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BibliotecaWeb.Models
{
    public class Livro
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome é obrigatório")]
        public string Nome { get; set; }

        [DataType(DataType.MultilineText)]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Editora é obrigatório")]
        public string Editora { get; set; }

        [Range(0, 9999)]
        [Required(ErrorMessage = "Ano é obrigatório")]
        public int Ano { get; set; }

        [Required(ErrorMessage = "Autor é obrigatório")]
        public string Autor { get; set; }
    }
}