document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();
        const mensaje = document.getElementById("mensaje");

        if (!usuario || !contraseña) {
            mensaje.textContent = "Ambos campos son obligatorios.";
            return;
        }

        try {
            const res = await fetch("https://tubackend.vercel.app/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, contraseña }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("usuario", data.usuario);
                localStorage.setItem("nombre", data.nombre);
                localStorage.setItem("rol", data.rol);
                window.location.href = "/chivosList.html";
            } else {
                mensaje.textContent = data.mensaje || "Credenciales incorrectas.";
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            mensaje.textContent = "Error al conectar con el servidor.";
        }
    });
});
