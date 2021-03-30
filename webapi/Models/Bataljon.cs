using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace webapi.Models 
{
    [Table("Bataljon")]
    public class Bataljon {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("BrPuk")]
        public int BrPuk { get; set; }  
        [Column("Br")]
        public int Br { get; set; }
        [Column("MaxJedinica")]
        public int MaxJedinica { get; set; }
        [Column("BrJedinica")]
        public int BrJedinica { get; set; }
        [JsonIgnore]
        public Puk Puk {get; set;}

    }
}