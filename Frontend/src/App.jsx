import { useEffect, useState } from "react"
import { Alert, Button, Card, Container, Form, Nav, Navbar, NavDropdown, Spinner } from "react-bootstrap"
import { ModalComponent } from "./components/Modal";
import { API } from './utils/api.js';
import { FormAdicionarTarefa } from "./components/FormAdicionarTarefa/index.jsx";

function App() {
  const [tasks, setTasks] = useState();
  const [showModalForm, setShowModalForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cache, setCache] = useState();

  const handleCloseForm = () => setShowModalForm(false);
  const handleShowForm = () => setShowModalForm(true);

  useEffect(() => {
    API.get('/find/all').then((response) => {
      setTasks(response.data);
    }).catch(error => console.log(error));
    setIsLoading(false);
  }, []);

  const handleStatusChange = (taskId, newStatus) => {
    const data = [{
      "op": "replace",
      "value": newStatus,
      "path": "/status"
    }]

    API.patch(`/update/${taskId}`, data)
      .catch((error) => console.error(error))
      .finally(()=> window.location.reload());
  };

  const handleDelete = (taskId) => {
    API.delete(`/delete/${taskId}`)
      .catch((error) => console.error(error))
      .finally(() => window.location.reload());
  };

  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      API.get(`find/${e.target.value}`).then((response) => {
        if (response.status === 200) {
          setCache(tasks);
          setTasks([response.data])
        }
      }).catch(error => console.log('ERRO:', error));
    } else {
      setTasks(cache);
    }
  }

  const handleGetByStatus = (e) => {
    API.get(`/find/status?status=${e.target.id}`).then((response) => {
      if (response.data.length > 0) {
        setCache(tasks);
        setTasks(response.data);
      }
    }).catch(error => console.log('erro: ', error));
  }


  return (
    <>
      <div className="bg-light-blue">
        <Navbar expand="md">
          <Container>
            <Navbar.Brand className="fs-4 fw-bold fst-italic">To do App</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link onClick={handleShowForm}>Adicionar Tarefa</Nav.Link>
              <NavDropdown title="Tarefas por status" id="nav-dropdown">
                <NavDropdown.Item id="not_started" onClick={handleGetByStatus}>Não iniciada</NavDropdown.Item>
                <NavDropdown.Item id="in_progress" onClick={handleGetByStatus}>Em progresso</NavDropdown.Item>
                <NavDropdown.Item id="completed" onClick={handleGetByStatus}>Finalizada</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Busque pelo id..." className="me-2" aria-label="Search" onInput={handleSearch} />
            </Form>
          </Container>
        </Navbar>
      </div>
      <main className="mt-5" >
        <Container className="d-flex row-gap-4 justify-content-evenly flex-wrap">
          {isLoading ? (
            <Button variant="light" disabled>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Button>

          ) : tasks && tasks.length > 0 ?
            (
              <>
                {tasks.map((task, id) => {
                  let cardBgColor;
                  switch (task.status) {
                    case 0:
                      cardBgColor = 'secondary';
                      break;
                    case 1:
                      cardBgColor = 'primary';
                      break;
                    case 2:
                      cardBgColor = 'success';
                      break;
                    default:
                      cardBgColor = 'secondary';
                      break;
                  }

                  return (
                    <Card
                      bg={cardBgColor}
                      border={cardBgColor}
                      text='light'
                      style={{ width: '18rem' }}
                      key={id}
                    >
                      <Card.Header className="d-flex justify-content-between">
                        <Card.Title>{task.title}</Card.Title>
                        <span title="Id da tarefa" className="fw-bolder">{task.id}</span>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          {task.description}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="d-flex justify-content-between align-items-center">
                        <div>
                          <Form.Select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                            <option value="0">Não iniciado</option>
                            <option value="1">Em progresso</option>
                            <option value="2">Finalizado</option>
                          </Form.Select>
                        </div>
                        <div><Button variant="danger" onClick={() => handleDelete(task.id)}>Deletar</Button></div>
                      </Card.Footer>
                    </Card>
                  );
                })}
              </>
            ) : (
              <Container>
                <Alert variant="primary">
                  Não há tarefa adicionada, que tal adicionar uma nova tarefa?
                </Alert>
                <Button variant="success" className="float-end" onClick={handleShowForm}>
                  Adicionar nova tarefa
                </Button>
              </Container>
            )}

        </Container>
        <ModalComponent
          showModal={showModalForm}
          title={"Bora adicionar uma tarefa?"}
          content={
            <>
              <FormAdicionarTarefa closeForm={handleCloseForm} />
            </>
          }
          handleClose={handleCloseForm}
        />
      </main>
    </>
  )
}

export default App
