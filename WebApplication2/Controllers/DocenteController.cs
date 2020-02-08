using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {
            return View();
        }

        //mostrar lista de docentes
        public JsonResult listarDocente()
        {
            PruebaDataContext db = new PruebaDataContext();
          /*  var lista = (from docente in db.Docentes
                         where docente.BHABILITADO.Equals(1)
                         select new
                         {
                             docente.IIDDOCENTE,
                             docente.NOMBRE,
                             docente.APPATERNO,
                             docente.APMATERNO,
                             docente.EMAIL
                         }).ToList();*/

            var lista2 = db.Docentes.Where(p => p.BHABILITADO.Equals(1))
                         .Select(p => new
                         {
                             p.IIDDOCENTE,
                             p.NOMBRE,
                             p.APPATERNO,
                             p.APMATERNO,
                             p.EMAIL
                         }).ToList();

            return Json(lista2,JsonRequestBehavior.AllowGet);
        }

        public JsonResult FiltarDocenteComboBox(int iidmodalidad)
        {
            PruebaDataContext db = new PruebaDataContext();
           
            var lista2 = db.Docentes.Where(p => p.BHABILITADO.Equals(1)
             && p.IIDMODALIDADCONTRATO.Equals(iidmodalidad))
                         .Select(p => new
                         {
                             p.IIDDOCENTE,
                             p.NOMBRE,
                             p.APPATERNO,
                             p.APMATERNO,
                             p.EMAIL
                         }).ToList();

            return Json(lista2, JsonRequestBehavior.AllowGet);
        }


        //sirve para mostra solo el combobox
        public JsonResult listarModalidadContacto()
        {
            PruebaDataContext db = new PruebaDataContext();
            var lista =( db.ModalidadContratos.Where(p => p.BHABILITADO.Equals(1))
                        .Select(p => new
                        {
                            IID = p.IIDMODALIDADCONTRATO,
                            p.NOMBRE

                        })).ToList();

            return Json(lista,JsonRequestBehavior.AllowGet);


        }




    }
}