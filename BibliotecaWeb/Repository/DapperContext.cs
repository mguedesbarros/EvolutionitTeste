using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper;

namespace BibliotecaWeb.Repository
{
    public class DapperContext : IDapperContext
    {
        private static string connString;
        public DapperContext()
        {
            connString = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["conexao"].ConnectionString;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(connString);
            }
        }

        public void ExecuteWithoutReturn(string strProcedureName, DynamicParameters parameters)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                dbConnection.Execute(strProcedureName, parameters, commandType: CommandType.StoredProcedure);
                dbConnection.Close();
            }
        }

        public T GetItem<T>(string strProcedureName, DynamicParameters parameters)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<T>(strProcedureName, parameters, commandType:
                    CommandType.StoredProcedure).SingleOrDefault();
            }
        }

        public IEnumerable<T> GetItems<T>(string strProcedureName, DynamicParameters parameters)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<T>(strProcedureName, parameters, commandType:
                    CommandType.StoredProcedure);
            }
        }
    }
}