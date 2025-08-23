namespace keepr.Services;

public class VaultsService
{
  private readonly VaultsRepository _vaultsRepository;

  public VaultsService(VaultsRepository vaultsRepository)
  {
    _vaultsRepository = vaultsRepository;
  }

  internal Vault Create(Vault data)
  {
    Vault vault = _vaultsRepository.Create(data);
    return vault;
  }

  internal Vault GetById(int id, Account user)
  {
    Vault vault = _vaultsRepository.GetById(id) ?? throw new Exception("Unable to retrieve requested resource.");
    if(vault.IsPrivate == true)
    {
      if(user != null && user.Id == vault.CreatorId)
      {
        return vault;
      }
      throw new Exception("Action cannot be performed.");
    }
    return vault;
  }

  internal List<Vault> GetByCreatorId(string id, Account user = null)
  {
    List<Vault> allVaults = _vaultsRepository.GetByCreatorId(id);
    if (user != null && user.Id == id) {
      return allVaults;
    }

    List<Vault> publicVaults = allVaults.FindAll(vault => vault.IsPrivate == false);
    return publicVaults;
  }

  internal Vault Update(Vault data, Account user)
  {
    Vault vault = GetById(data.Id, user);
    if(user == null || user.Id != vault.CreatorId)
    {
      throw new Exception("Action cannot be performed.");
    }

    vault.Name = data.Name ?? vault.Name;
    vault.Description = data.Description ?? vault.Description;
    vault.Img = data.Img ?? vault.Img;
    vault.IsPrivate = data.IsPrivate ?? vault.IsPrivate;

    vault = _vaultsRepository.Update(vault);
    return vault;
  }

  internal void Remove(int id, Account user)
  {
    Vault vault = GetById(id, user);
    if(user == null || user.Id != vault.CreatorId)
    {
      throw new Exception("Action cannot be performed.");
    }

    _vaultsRepository.Remove(id);
  }
}
