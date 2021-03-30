using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models 
{
    [Table("Vojska")]
    public class Vojska {
        [Key]
        [Column("ID")]
        public int ID { get; set;}
        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv {get; set;}
        [Column("Drzava")]
        public string Drzava { get; set; }
        [Column("Novac")]
        public int Novac { get; set; }
        [Column("Snaga")]
        public int Snaga { get; set; }
        [Column("BrPukova")]
        public int BrPukova{ get; set; }  
        public virtual List<Puk> Pukovi { get; set; }
    }
}