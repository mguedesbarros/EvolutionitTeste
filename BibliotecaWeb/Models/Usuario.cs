using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BibliotecaWeb.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Display(Name = "Login")]
        [Required(ErrorMessage = "Informe o seu Login", AllowEmptyStrings = false)]
        public string Login { get; set; }

        [Required(ErrorMessage = "Informe a sua senha", AllowEmptyStrings = false)]
        [DataType(System.ComponentModel.DataAnnotations.DataType.Password)]
        public string Senha { get; set; }
    }
}