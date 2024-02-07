import { Link } from "react-router-dom";

export function HomePage() {



    return (
        <main className="homepage flex">
            <h1>Welcome to Vite React Starter Library</h1>
            <p>Start your project with ease using our React library built on top of Vite.</p>
            <Link>Get Started</Link>
        </main>
    )
}