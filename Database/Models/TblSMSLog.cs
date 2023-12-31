﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
    public partial class TblSMSLog
    {
        [Key]
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsSucceeded { get; set; }
        public string? ErrorMessage { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
    }
}
