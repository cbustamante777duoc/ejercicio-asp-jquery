using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarSexo()
        {
            PruebaDataContext db = new PruebaDataContext();
            var lista = db.Sexos.Where(p => p.BHABILITADO.Equals(1)).
                Select(p => new { IID = p.IIDSEXO, p.NOMBRE });

            return Json(lista,JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarAlumnos()
        {
            //instacia de la base de datos
            PruebaDataContext db = new PruebaDataContext();

            var lista = (db.Alumnos.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new
                {
                    p.IIDALUMNO,
                  mininombre =(  p.NOMBRE.ToLower()),
                  miniApellido = (  p.APPATERNO.ToLower()),
                  miniApellidoM =(  p.APMATERNO.ToLower()),
                    p.TELEFONOPADRE
                })).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FiltrarAlumnoPorSexo(int iidsexo)
        {
            PruebaDataContext db = new PruebaDataContext();
           var lista =  db.Alumnos.Where(p => p.BHABILITADO.Equals(1) &&
            p.IIDSEXO.Equals(iidsexo)).Select(p => new
            {
                p.IIDALUMNO,
               mininombre =( p.NOMBRE.ToLower()),
               miniApellido = (p.APPATERNO.ToLower()),
               miniApellidoM = (p.APMATERNO.ToLower()),
                p.TELEFONOPADRE
            }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}