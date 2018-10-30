using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibliotecaWeb.Repository
{
    public interface IDapperContext
    {
        void ExecuteWithoutReturn(string strProcedureName, DynamicParameters parameters);

        T GetItem<T>(string strProcedureName, DynamicParameters parameters);
        IEnumerable<T> GetItems<T>(string strProcedureName, DynamicParameters parameters);
    }
}
