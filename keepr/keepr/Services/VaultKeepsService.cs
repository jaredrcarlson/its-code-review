namespace keepr.Services;

public class VaultKeepsService
{
  private readonly VaultKeepsRepository _vaultKeepsRepository;
  private readonly KeepsService _keepsService;
  private readonly VaultsService _vaultsService;

  public VaultKeepsService(VaultKeepsRepository vaultKeepsRepository, KeepsService keepsService, VaultsService vaultsService)
  {
    _vaultKeepsRepository = vaultKeepsRepository;
    _keepsService = keepsService;
    _vaultsService = vaultsService;
  }

  internal VaultKeep Create(VaultKeep data, Account user)
  {
    Vault vault = _vaultsService.GetById(data.VaultId, user);
    if(user.Id != vault.CreatorId) {
      throw new Exception("Action cannot be performed.");
    }
    data.CreatorId = user.Id;
    VaultKeep vk = _vaultKeepsRepository.Create(data);
    return vk;
  }

  internal VaultKeep GetById(int id)
  {
    VaultKeep vk = _vaultKeepsRepository.GetById(id);
    return vk;
  }

  internal List<Keep> GetKeepsByVaultId(int id, Account user)
  {
    _vaultsService.GetById(id, user);  // throws Exception for bad user if vault is private
    List<Keep> keeps = _keepsService.GetByVaultId(id);
    return keeps;
  }

  internal void Remove(int id, Account user)
  {
    VaultKeep vk = GetById(id);
    if(user == null || user.Id != vk.CreatorId)
    {
      throw new Exception("Action cannot be performed.");
    }
    _vaultKeepsRepository.Remove(id);
    _keepsService.DecrementKeptCount(vk.KeepId);
  }
}
