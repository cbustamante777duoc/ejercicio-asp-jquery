using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public string mensaje()
        {
            return "bienvenido al curso";
        }

        public string saludo(string nombre)
        {
            return "hola " + nombre;
        }

        public string nombreCompleto(string nombre, string apellido)
        {
            return "hola" + nombre + " " + apellido;
        }

        public JsonResult listarCurso()
        {
            //conecion a la base de datos 
            PruebaDataContext db = new PruebaDataContext();
            var lista = db.Cursos.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION}).ToList();

            return Json(lista,JsonRequestBehavior.AllowGet);

        }

        public JsonResult buscarCursoPorNombre(string nombre)
        {
            PruebaDataContext db = new PruebaDataContext();
            var lista = db.Cursos.Where(p => p.BHABILITADO.Equals(1) && 
            p.NOMBRE.Contains(nombre))
               .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();

            return Json(lista,JsonRequestBehavior.AllowGet);

        }
    }
}