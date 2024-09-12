using Microsoft.EntityFrameworkCore;
using To_Do_List.Model;

namespace To_Do_List.Data
{
    public class TaskContext : DbContext
    {
        public DbSet<TodoTask> Tasks { get; set; }
        public TaskContext(DbContextOptions<TaskContext> options) : base(options) { }

    }
}
