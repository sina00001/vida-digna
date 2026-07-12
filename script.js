
    // ==========================================
    // 1. MENÚ DE NAVEGACIÓN MÓVIL (Dinámico)
    // ==========================================
    
    const headerNav = document.querySelector('header nav');
    const navList = document.querySelector('header nav ul');
    
    // Crear el botón de menú dinámicamente (para no ensuciar tu HTML)
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰'; // Icono de hamburguesa
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
    
    // Insertar el botón antes de la lista de navegación
    headerNav.insertBefore(mobileMenuBtn, navList);

    // Función para alternar el menú
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Cambiar el icono: si está abierto mostramos "X", si no "☰"
        if (navList.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '✕';
        } else {
            mobileMenuBtn.innerHTML = '☰';
        }
    });

    // Cerrar el menú automáticamente al hacer clic en un enlace
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });


    // ==========================================
    // 2. VALIDACIÓN DEL FORMULARIO DE RESERVA
    // ==========================================
    
    const form = document.querySelector('.booking-form');
    const dateInput = document.getElementById('fecha');

    // Configurar fecha mínima: No permitir seleccionar días pasados
    const hoy = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', hoy);

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue inmediatamente

        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
                                                                          //añadir la const service
        const fecha = dateInput.value;

        // Validaciones
        if (nombre === '' || email === '' || fecha === '') {
            mostrarAlerta('Por favor, completa todos los campos.', 'error');
            return;
        }

        if (!validarEmail(email)) {
            mostrarAlerta('Por favor, ingresa un correo electrónico válido.', 'error');
            return;
        }

        // Simulación de envío exitoso
        mostrarAlerta(`¡Gracias ${nombre}! Hemos recibido tu solicitud para el ${fecha}. Te contactaré pronto.`, 'success');
        form.reset(); // Limpiar el formulario
    });

    // Función auxiliar para validar formato de email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Función para mostrar alertas personalizadas (más bonito que un simple alert())
    function mostrarAlerta(mensaje, tipo) {
        // Crear elemento de alerta
        const alertaDiv = document.createElement('div');
        alertaDiv.className = `alerta alerta-${tipo}`;
        alertaDiv.textContent = mensaje;

        // Estilos temporales para la alerta (inyectados por JS)
        alertaDiv.style.position = 'fixed';
        alertaDiv.style.bottom = '20px';
        alertaDiv.style.right = '20px';
        alertaDiv.style.padding = '15px 25px';
        alertaDiv.style.borderRadius = '5px';
        alertaDiv.style.color = '#fff';
        alertaDiv.style.fontFamily = 'sans-serif';
        alertaDiv.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        alertaDiv.style.zIndex = '2000';
        alertaDiv.style.transition = 'opacity 0.5s ease';

        // Color según tipo
        if (tipo === 'error') {
            alertaDiv.style.backgroundColor = '#d32f2f'; // Rojo
        } else {
            alertaDiv.style.backgroundColor = '#4CAF50'; // Verde
        }

        document.body.appendChild(alertaDiv);

        // Eliminar alerta después de 4 segundos
        setTimeout(() => {
            alertaDiv.style.opacity = '0';
            setTimeout(() => alertaDiv.remove(), 500);
        }, 4000);
    }                                                                     // revisar que el fecth funcione correctamente
    // Suponiendo que tu formulario tiene la clase "booking-form"
const formulario = document.querySelector('.booking-form');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // 1. Obtener valores (incluyendo la nueva línea de servicio)
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const servicio = document.getElementById('servicio').value;
    const fecha = document.getElementById('fecha').value; // o dateInput.value

    // 2. Crear el objeto de datos
    const datosEnvio = {
        nombre: nombre,
        email: email,
        servicio: servicio,
        fecha: fecha
    };

    try {                                    
        // 3. Ejecutar el fetch
        const respuesta = await fetch('TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI', {
            method: 'POST',
            mode: 'no-cors', // Requerido para evitar bloqueos con Google Scripts
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosEnvio)
        });

        // Con 'no-cors' no podemos leer la respuesta JSON, 
        // pero si no cae en el catch, es que se envió.
        alert('¡Solicitud de cita enviada correctamente!');
        formulario.reset(); // Limpia los campos

    } catch (error) {
        console.error('Error al enviar:', error);
        alert('Hubo un error al conectar con el servidor.');
    }
});