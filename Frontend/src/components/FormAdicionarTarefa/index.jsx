import { Button, Form } from "react-bootstrap";
import { API } from "../../utils/api";

export function FormAdicionarTarefa({ closeForm }) {

    const handleForm = (e) => {
        e.preventDefault();

        if (e.target.checkValidity()) {

            const data = new FormData(e.target);
            const formValues = Object.fromEntries(data.entries());

            API.post('/new', formValues)
                .then((response) => console.log(response))
                .catch((error) => console.error(error));

            closeForm()

            window.location.reload();
        }


    };

    return (
        <Form onSubmit={handleForm}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Titulo</Form.Label>
                <Form.Control required type="text" name="Title" placeholder="Qual titulo da sua tarefa?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Descrição</Form.Label>
                <Form.Control type="text" name="description" placeholder="Escreva uma descrição da sua tarefa..." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="Status" aria-label="Status">
                    <option value="0" defaultValue>Não iniciado</option>
                    <option value="1">Em progresso</option>
                    <option value="2">Finalizado</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="float-end">
                Enviar
            </Button>
        </Form>
    )
}