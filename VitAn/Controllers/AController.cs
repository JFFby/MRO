using System.Web.Mvc;
using Services;

namespace VitAn.Controllers
{
    public class AController : Controller
    {
        public ActionResult Resize()
        {
            var service = new ImageSizeService();
            service.AdjustImages(HttpContext.Server.MapPath);
            return Json(new {success = true}, JsonRequestBehavior.AllowGet);
        }
    }
}