namespace keepr.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VaultsController : ControllerBase
{
  private readonly Auth0Provider _auth0Provider;
  private readonly VaultsService _vaultsService;
  private readonly VaultKeepsService _vaultKeepsService;

  public VaultsController(Auth0Provider auth0Provider, VaultsService vaultsService, VaultKeepsService vaultKeepsService)
  {
    _auth0Provider = auth0Provider;
    _vaultsService = vaultsService;
    _vaultKeepsService = vaultKeepsService;
  }

  [HttpPost]
  [Authorize]
  public async Task<ActionResult<Vault>> Create([FromBody] Vault data)
  {
    try
    {
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      data.CreatorId = user.Id;
      Vault vault = _vaultsService.Create(data);
      return Ok(vault);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Vault>> GetById(int id)
  {
    try
    {
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      Vault vault = _vaultsService.GetById(id, user);
      return Ok(vault);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpGet("{id}/keeps")]
  public async Task<ActionResult<List<Keep>>> GetKeeps(int id)
  {
    try
    {
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      List<Keep> keeps = _vaultKeepsService.GetKeepsByVaultId(id, user);
      return Ok(keeps);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpPut("{id}")]
  [Authorize]
  public async Task<ActionResult<Vault>> Update(int id, [FromBody] Vault data)
  {
    try
    {
      data.Id = id;
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      Vault vault = _vaultsService.Update(data, user);
      return Ok(vault);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpDelete("{id}")]
  [Authorize]
  public async Task<ActionResult<Vault>> Remove(int id)
  {
    try
    {
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      _vaultsService.Remove(id, user);
      return Ok($"Removed resource with ID: {id} successfully.");
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }
}
