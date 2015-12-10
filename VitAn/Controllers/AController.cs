using System.Web.Mvc;
using Services;

namespace VitAn.Controllers
{
    public class AController : Controller
    {
        public JsonResult Index()
        {
            return Json("Hello worl", JsonRequestBehavior.AllowGet);
        }

        public ActionResult Resize()
        {
            var service = new ImageService();
            service.AdjustImages(HttpContext.Server.MapPath);
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Determine(string path, bool resize = false)
        {
            var service = new ImageService();
            return path == null 
                ? Json("fail", JsonRequestBehavior.AllowGet) 
                : Json(service.Define(path, resize), JsonRequestBehavior.AllowGet);
        }
    }
}