﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaderAnalytics.Web
{
    public class EmailMsg
    {
        public string To { get; set; }
        public string Msg { get; set; }
        public string CaptchaCode { get; set; }
        public string IP_Address { get; set; }
    }
}
