import { userUser } from "../../Contexts/UserContext"

export default function Home() {
    const auth = userUser();

    return (
        <>{auth.user?.name}</>
    )
}

