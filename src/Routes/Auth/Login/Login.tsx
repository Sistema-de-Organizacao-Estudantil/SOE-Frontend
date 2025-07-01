import { AuthApi } from "../../../Api/AuthApi.ts";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { type LoginRequest } from "../../../Contracts/Requests/Auth/LoginRequest.ts";
import { useAuth } from "../../../Contexts/AuthContext.tsx";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";

import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    const auth = useAuth();

    if (auth.user) {
        navigate("/");
    }

    const [request, setRequest] = useState<LoginRequest>({ email: null, password: null });
    const toast = useRef<Toast>(null);

    const cardFooter = (
        <a href="/registrar" style={{textDecoration: "none"}}>Não sou cadastrado</a>
    );

    const onLogin = () => {
        if (!(request.email && request.password)) {
            toast.current?.show({ severity: "error", summary: "Falha", detail: "Há campos não preenchidos" });
            return;
        }

        AuthApi
            .login(request!)
            .then(() => {
                navigate("/");
            })
            .catch(e => {
                toast.current?.show({ severity: "error", summary: "Falha", detail: e.message });
            });
    };

    return (
        <div id="login">
            <Toast ref={toast}/>
            <Card title="Entrar" className="flex flex-col" footer={cardFooter}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <InputText placeholder="E-Mail" type="email" onChange={(e) => setRequest({...request, email: e.target.value})}></InputText>
                    <InputText placeholder="Senha" type="password" onChange={(e) => setRequest({...request, password: e.target.value})}></InputText>
                    <Button label="Logar" onClick={onLogin}></Button>
                </div>
            </Card>
        </div>
    )
}

