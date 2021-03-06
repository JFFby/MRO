﻿using System.Web.Mvc;
using System.Web.Routing;

namespace VitAn
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default2",
                url: "{action}",
                defaults: new { controller = "A" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}",
                defaults: new { controller = "A", action = "Index"}
            );
        }
    }
}