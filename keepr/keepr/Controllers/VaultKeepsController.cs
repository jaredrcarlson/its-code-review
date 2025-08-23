namespace keepr.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VaultKeepsController : ControllerBase
{
  private readonly Auth0Provider _auth0Provider;
  private readonly VaultKeepsService _vaultKeepsService;

  public VaultKeepsController(Auth0Provider auth0Provider, VaultKeepsService vaultKeepsService)
  {
    _auth0Provider = auth0Provider;
    _vaultKeepsService = vaultKeepsService;
  }

  [HttpPost]
  [Authorize]
  public async Task<ActionResult<VaultKeep>> Create([FromBody] VaultKeep data)
  {
    try
    {
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      VaultKeep vk = _vaultKeepsService.Create(data, user);
      return Ok(vk);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpDelete("{id}")]
  [Authorize]
  public async Task<ActionResult<VaultKeep>> Remove(int id)
  {
    try
    {
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      _vaultKeepsService.Remove(id, user);
      return Ok($"Removed resource with ID: {id} successfully.");
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }
}
