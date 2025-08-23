using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace keepr.Repositories;

public class VaultKeepsRepository
{
  private readonly IDbConnection _db;

  public VaultKeepsRepository(IDbConnection db)
  {
    _db = db;
  }

  internal VaultKeep Create(VaultKeep data)
  {
    string sql = @"
    INSERT INTO vaultkeeps
    (creatorId, vaultId, keepId)
    VALUES
    (@CreatorId, @VaultId, @KeepId)
    ;
    SELECT LAST_INSERT_ID()
    ;";

    int id = _db.ExecuteScalar<int>(sql, data);
    return GetById(id);
  }

  internal VaultKeep GetById(int id)
  {
    string sql = @"
    SELECT * FROM vaultkeeps
    WHERE id = @id
    ;";

    VaultKeep vk = _db.QueryFirstOrDefault<VaultKeep>(sql, new {id});
    return vk;
  }

  // internal List<VaultKeep> GetByVaultId(int id)
  // {
  //   string sql = @"
  //   SELECT * FROM vaultkeeps
  //   WHERE vaultId = @id
  //   ;";

  //   List<VaultKeep> vks = _db.Query<VaultKeep>(sql, new {id}).ToList();
  //   return vks;
  // }

  internal void Remove(int id)
  {
    string sql = @"
    DELETE FROM vaultkeeps
    WHERE id = @id
    ;";

    _db.Execute(sql, new {id});
  }
}
