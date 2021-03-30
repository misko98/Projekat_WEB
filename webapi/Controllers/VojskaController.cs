using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VojskaController : ControllerBase
    {
       
        public VojskaContext Context {get; set;}
        public VojskaController(VojskaContext context)
        {
          Context = context;
        }

        [Route("PreuzmiVojske")]
        [HttpGet]
        public async Task<List<Vojska>> PreuzmiVojske()
        {
            return await Context.vojske.Include(p => p.Pukovi).ThenInclude(q => q.Bataljoni).ToListAsync();
        }
       
        [Route("PreuzmiVojsku/{id}")]
        [HttpGet]
        public async Task<ActionResult<Vojska>> PreuzmiVojsku(int id)
        {
            return Context.vojske.Include(p => p.Pukovi).ThenInclude(q => q.Bataljoni).SingleOrDefault(x => x.ID == id);
        }

       [Route("UpisiVojsku")]
       [HttpPost]
       public async Task<ActionResult> UpisiVojsku([FromBody] Vojska vojska)
       {
           Context.vojske.Add(vojska);
           await Context.SaveChangesAsync();
           int id = vojska.ID;
           return Ok(id);
       }

       [Route("IzmeniVojsku/{id}")]
       [HttpPut]
       public async Task IzmeniVojsku(int id,[FromBody] Vojska vojska)
       {
           var entity = Context.vojske.SingleOrDefault(e => e.ID == id);

           entity.Naziv = vojska.Naziv;
           entity.Drzava = vojska.Drzava;
           entity.Novac = vojska.Novac;
           entity.Snaga = vojska.Snaga;
           entity.BrPukova = vojska.BrPukova;

           await Context.SaveChangesAsync();
       }

       [Route("IzbrisiVojsku/{id}")]
       [HttpDelete]
       public async Task IzbrisiVojsku(int id)
       {
           var vojska = await Context.vojske.FindAsync(id);
           Context.Remove(vojska);
           await Context.SaveChangesAsync();
       }

       [Route("UpisiPuk/{idVojske}")]
       [HttpPost]
       public async Task<ActionResult> UpisiPuk(int idVojske, [FromBody] Puk puk)
       {
           var vojska = await Context.vojske.FindAsync(idVojske);
           puk.Vojska = vojska;
           Context.pukovi.Add(puk);
           await Context.SaveChangesAsync();
           var id = puk.ID;
           return Ok(id);
           
       }

        [Route("IzmeniPuk/{idVojske}/{idPuka}")]
       [HttpPut]
       public async Task IzmeniPuk(int idVojske, int idPuka, [FromBody] Puk puk)
       {
           var entityV = Context.vojske.SingleOrDefault(e => e.ID == idVojske);
           var entityP = Context.pukovi.SingleOrDefault(e => e.ID == idPuka);
           entityP.Tip = puk.Tip;
           entityP.BrBataljona = puk.BrBataljona;
           entityP.MaxBataljona = puk.MaxBataljona;
           //entityP.Vojska = entityV;
           await Context.SaveChangesAsync();
       }

        [Route("IzbrisiPuk/{id}")]
       [HttpDelete]
       public async Task IzbrisiPuk(int id)
       {
           var puk = await Context.pukovi.FindAsync(id);
           Context.Remove(puk);
           await Context.SaveChangesAsync();
       }

       [Route("UpisiBataljon/{idPuka}")]
       [HttpPost]
       public async Task<ActionResult> UpisiBataljon(int idPuka, [FromBody] Bataljon bataljon)
       {
           var puk = await Context.pukovi.FindAsync(idPuka);
           bataljon.Puk = puk;
           Context.bataljoni.Add(bataljon);
           await Context.SaveChangesAsync();
           var id = bataljon.ID;
           return Ok(id);
       }

        [Route("IzmeniBataljon/{idVojske}/{idPuka}/{idBataljona}")]
       [HttpPut]
       public async Task IzmeniBataljon(int idVojske, int idPuka, int idBataljona, [FromBody] Bataljon bataljon)
       {
           var entityP = Context.pukovi.SingleOrDefault(e => e.ID == idPuka);
           var entityB = Context.bataljoni.SingleOrDefault(e => e.ID == idBataljona);
           entityB.BrPuk = bataljon.BrPuk;
           entityB.Br = bataljon.Br;
           entityB.MaxJedinica = bataljon.MaxJedinica;
           entityB.BrJedinica = bataljon.BrJedinica;
           //entityB.Puk = entityP;
           await Context.SaveChangesAsync();
       }

       [Route("IzbrisiBataljon/{id}")]
       [HttpDelete]
       public async Task IzbrisiBataljon(int id)
       {
           var bataljon = await Context.bataljoni.FindAsync(id);
           Context.Remove(bataljon);
           await Context.SaveChangesAsync();
       }
    }
}
