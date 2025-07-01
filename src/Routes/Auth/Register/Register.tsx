import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { AuthApi } from "../../../Api/AuthApi";
import { type RegisterRequest } from "../../../Contracts/Requests/Auth/RegisterRequest.ts";
import { useNavigate } from "react-router";

import "./Register.css";

export default function Register() {
    const [request, setRequest] = useState<RegisterRequest>({ name: null, email: null, password: null });
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const cardFooter = (
        <a href="/entrar" style={{textDecoration: "none"}}>Já sou cadastrado</a>
    );

    const onRegister = () => {
        if (!(request.email && request.password)) {
            toast.current?.show({ severity: "error", summary: "Falha", detail: "Há campos não preenchidos" });
            return;
        }

        AuthApi
            .register(request!)
            .then(() => {
                navigate("/");
            })
            .catch(e => {
                toast.current?.show({ severity: "error", summary: "Falha", detail: e.message });
            });
    };

    return (
        <div id="register">
            <Toast ref={toast}/>
            <Card title="Entrar" className="flex flex-col" footer={cardFooter}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <InputText placeholder="Usuário" type="text" onChange={(e) => setRequest({...request, name: e.target.value})}></InputText>
                    <InputText placeholder="E-Mail" type="email" onChange={(e) => setRequest({...request, email: e.target.value})}></InputText>
                    <InputText placeholder="Senha" type="password" onChange={(e) => setRequest({...request, password: e.target.value})}></InputText>
                    <Button label="Logar" onClick={onRegister}></Button>
                </div>
            </Card>
        </div>
    )
}

