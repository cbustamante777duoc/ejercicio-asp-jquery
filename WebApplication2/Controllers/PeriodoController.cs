using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarPeriodo()
        {
            //conexion a la base de datos
            PruebaDataContext db = new PruebaDataContext();
           var lista= ( db.Periodos.Where(p => p.BHABILITADO.Equals(1))
                .Select(p=> new {p.IIDPERIODO, p.NOMBRE,
                   fechaInicio= ( (DateTime) p.FECHAINICIO).ToShortDateString(),
                   fechaFin= ((DateTime) p.FECHAFIN).ToShortDateString() })).ToList();

            return Json(lista,JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuscarPeriodoPorNombre(string nombrePeriodo)
        {
            //conexion a la base de datos
            PruebaDataContext db = new PruebaDataContext();
            var lista = (db.Periodos.Where(p => p.BHABILITADO.Equals(1) && 
            p.NOMBRE.Contains(nombrePeriodo))
                 .Select(p => new {
                     p.IIDPERIODO,
                     p.NOMBRE,
                     fechaInicio = ((DateTime)p.FECHAINICIO).ToShortDateString(),
                     fechaFin = ((DateTime)p.FECHAFIN).ToShortDateString()
                 })).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

    }
}