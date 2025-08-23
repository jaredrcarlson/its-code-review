namespace keepr.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfilesController : ControllerBase
{
  private readonly AccountService _accountService;
  private readonly Auth0Provider _auth0Provider;
  private readonly KeepsService _keepsService;
  private readonly VaultsService _vaultsService;

  public ProfilesController(AccountService accountService, Auth0Provider auth0Provider, KeepsService keepsService, VaultsService vaultsService)
  {
    _accountService = accountService;
    _auth0Provider = auth0Provider;
    _keepsService = keepsService;
    _vaultsService = vaultsService;
  }

  [HttpGet("{id}")]
  public ActionResult<Profile> Get(string id)
  {
    try
    {
      Profile profile = _accountService.GetProfileById(id);      
      return Ok(profile);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpGet("{id}/keeps")]
  public ActionResult<List<Keep>> GetKeeps(string id)
  {
    try
    {
      List<Keep> keeps = _keepsService.GetByProfileId(id);
      return Ok(keeps);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpGet("{id}/vaults")]
  public async Task<ActionResult<List<Vault>>> GetVaults(string id)
  {
    try
    {
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      List<Vault> vaults = _vaultsService.GetByCreatorId(id, user);
      return Ok(vaults);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }
}
