import { userUser } from "../../Contexts/UserContext"

export default function Home() {
    const userContext = userUser();

    return (
        <>{userContext.user?.name}</>
    )
}

