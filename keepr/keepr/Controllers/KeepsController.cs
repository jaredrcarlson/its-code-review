namespace keepr.Controllers;

[ApiController]
[Route("api/[controller]")]
public class KeepsController : ControllerBase
{
  private readonly Auth0Provider _auth0Provider;
  private readonly KeepsService _keepsService;

  public KeepsController(Auth0Provider auth0Provider, KeepsService keepsService)
  {
    _auth0Provider = auth0Provider;
    _keepsService = keepsService;
  }

  [HttpPost]
  [Authorize]
  public async Task<ActionResult<Keep>> Create([FromBody] Keep data)
  {
    try
    {
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      data.CreatorId = user.Id;
      Keep keep = _keepsService.Create(data);
      return Ok(keep);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpGet]
  public ActionResult<List<Keep>> Get()
  {
    try
    {
      List<Keep> keeps = _keepsService.Get();
      return Ok(keeps);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpGet("{id}")]
  public ActionResult<Keep> Get(int id)
  {
    try
    {
      Keep keep = _keepsService.GetById(id, true);
      return Ok(keep);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpPut("{id}")]
  [Authorize]
  public async Task<ActionResult<Keep>> Update(int id, [FromBody] Keep data)
  {
    try
    {
      data.Id = id;
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      Keep keep = _keepsService.Update(data, user);
      return Ok(keep);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpDelete("{id}")]
  [Authorize]
  public async Task<ActionResult<Keep>> Remove(int id)
  {
    try
    {
      Account user = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      _keepsService.Remove(id, user);
      return Ok($"Removed resource with ID: {id} successfully.");
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }
}
