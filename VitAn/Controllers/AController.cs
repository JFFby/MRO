using System.Web.Mvc;
using Services;

namespace VitAn.Controllers
{
    public class AController : Controller
    {
        public ActionResult Resize()
        {
            var service = new ImageService();
            service.AdjustImages(HttpContext.Server.MapPath);
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Determine(string path, bool resize = false)
        {

            var service = new ImageService();
            return Json(service.Define(path, resize), JsonRequestBehavior.AllowGet);
        }
    }
}