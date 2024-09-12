using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using To_Do_List.Data;
using To_Do_List.Model;

namespace To_Do_List.Controllers
{
    [ApiController]
    [Route("task")]
    public class TaskController : Controller
    {
        private readonly TaskContext _context;

        public TaskController(TaskContext context)
        {
            _context = context;
        }

        [HttpPost("new")]
        public IActionResult NewTask(TodoTask task)
        {
            if(task == null)
            {
                return BadRequest();
            }

            _context.Add(task);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
        }

        [HttpGet("find/all")]
        public IActionResult GetAllTasks()
        {
            var AllTasks = _context.Tasks.ToList();

                return Ok(AllTasks);
        }

        [HttpGet("find/{id}")]
        public IActionResult GetTaskById(int id)
        {
            var task = _context.Tasks.Find(id);

            if(task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpGet("find/status")]
        public IActionResult GetTaskByStatus(StatusEnum status)
        {
            var task = _context.Tasks.Where(task => task.Status == status).ToList();
            
            if(task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateWholeTaskById(int id, TodoTask task)
        {
            if(task == null)
            {
                return BadRequest();
            }

            var taskToModify = _context.Tasks.Find(id);

            if( taskToModify == null)
            {
                return NotFound();
            }

            taskToModify.Title = task.Title;
            taskToModify.Description = task.Description;
            taskToModify.Status = task.Status;

            _context.Tasks.Update(taskToModify);
            _context.SaveChanges();

            return Ok(taskToModify);
        }

        [HttpPatch("update/{id}")]
        public IActionResult UpdateTaskById(int id, [FromBody] JsonPatchDocument<TodoTask> patchDoc)
        {
            if(patchDoc == null)
            {
                return BadRequest();
            }

            var taskToModify = _context.Tasks.Find(id);

            if(taskToModify == null)
            {
                return NotFound();
            }

            patchDoc.ApplyTo(taskToModify, ModelState);

            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Update(taskToModify);
            _context.SaveChanges();

            return Ok(taskToModify);

        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteTaskById(int id)
        {
            var task = _context.Tasks.Find(id);

            if( task == null )
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
