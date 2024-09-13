using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace To_Do_List.Model
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum StatusEnum
    {
        not_started,
        in_progress,
        completed
    }

    public class TodoTask
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Title {  get; set; }
        [Required]
        public required string Description { get; set; }
        [Required]
        public StatusEnum Status { get; set; } 
    }
}
