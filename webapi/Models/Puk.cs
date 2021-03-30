using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace webapi.Models 
{
    [Table("Puk")]
    public class Puk {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("Tip")]
        [MaxLength(255)]
        public string Tip { get; set; }
        [Column("BrBataljona")]
        public int BrBataljona { get; set; }
        [Column("MaxBataljona")]
        public int MaxBataljona { get; set; }
        [Column("Bataljoni")]
        public virtual List<Bataljon> Bataljoni { get; set; }
        [JsonIgnore]
        public Vojska Vojska { get; set;}
    }
}