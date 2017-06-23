using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EzInsurance.Web.ViewModels
{
    public class AddressViewModel
    {
        public int Id { get; set; }

        [DisplayName("Street 1")]
        [Required(ErrorMessage = "Street 1 is required"), StringLength(100, ErrorMessage = "Street 1 must be at most 75 characters")]
        public string Street1 { get; set; }

        public string Street2 { get; set; }

        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }

        [Required(ErrorMessage = "State is required")]
        public string State { get; set; }

        [RegularExpression(@"^\d{5}(?:[-\s]\d{4})?$", ErrorMessage = "Please enter a valid zipcode")]
        [Required(ErrorMessage = "ZipCode is required")]
        public string ZipCode { get; set; }
    }
}
