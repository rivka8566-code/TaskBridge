using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json;

namespace TaxPracticumAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExecController : ControllerBase
    {
        private readonly string _connectionString;

        public ExecController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [HttpPost("POST")]
        public IActionResult ExecuteProcedure([FromBody] RequestData request)
        {
            if (request == null || string.IsNullOrEmpty(request.procedureName))
            {
                return BadRequest("Procedure name is required.");
            }

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    SqlCommand cmd = new SqlCommand(request.procedureName, conn);
                    cmd.CommandType = CommandType.StoredProcedure;

                    if (request.parameters != null)
                    {
                        foreach (var p in request.parameters)
                        {
                            string paramName = p.Key.StartsWith("@") ? p.Key : "@" + p.Key;
                            object value = p.Value;

                            if (value is JsonElement element)
                            {
                                value = element.ValueKind switch
                                {
                                    JsonValueKind.String => element.GetString(),
                                    JsonValueKind.Number => element.TryGetInt32(out int i) ? i : element.GetDouble(),
                                    JsonValueKind.True => true,
                                    JsonValueKind.False => false,
                                    JsonValueKind.Null => DBNull.Value,
                                    _ => element.GetRawText()
                                };
                            }
                            cmd.Parameters.AddWithValue(paramName, value ?? DBNull.Value);
                        }
                    }

                    DataTable dt = new DataTable();
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }

                    var list = new List<Dictionary<string, object>>();
                    foreach (DataRow row in dt.Rows)
                    {
                        var dict = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            dict[col.ColumnName] = row[col];
                        }
                        list.Add(dict);
                    }

                    return Ok(list);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }

    public class RequestData
    {
        public string procedureName { get; set; }
        public Dictionary<string, object>? parameters { get; set; }
    }
}