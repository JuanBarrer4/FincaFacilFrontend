async function iniciarSesion() {
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, contraseña })
        });

        const data = await res.json();
        const mensajeDiv = document.getElementById('mensaje');

        if (res.ok) {
            localStorage.setItem('usuario', data.usuario);
            localStorage.setItem('nombre', data.nombre);
            localStorage.setItem('rol', data.rol);

            setTimeout(() => {
                window.location.href = '/chivosList.html';
            }, 200);
        } else {
            mensajeDiv.innerText = data.mensaje;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('mensaje').innerText = 'Error al conectar con el servidor.';
    }
}
