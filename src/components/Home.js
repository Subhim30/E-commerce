import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Login from "./login";
import Signup from "./signup";

function Home() {

    const [authModal, setAuthModal] = useState(null);

    const navigate = useNavigate();


    return (

        <div>

            {/* =====================================
                YOUR EXISTING HOME PAGE
            ====================================== */}

            <nav>
                {/* Your existing navbar */}
            </nav>


            <main>

                {/* Your existing hero */}

                {/* Your existing products */}

                {/* Your existing filters */}

            </main>


            {/* =====================================
                LOGIN MODAL
            ====================================== */}

            {authModal === "login" && (

                <Login
                    onClose={() => setAuthModal(null)}
                    onSignup={() => setAuthModal("signup")}
                />

            )}


            {/* =====================================
                SIGNUP MODAL
            ====================================== */}

            {authModal === "signup" && (

                <Signup
                    onClose={() => setAuthModal(null)}
                    onLogin={() => setAuthModal("login")}
                />

            )}

        </div>
    );
}

export default Home;