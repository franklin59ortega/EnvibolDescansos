document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const fecha = document.querySelector("#fecha").value;
        const turno = document.querySelector("#turno").value;
        const fechaEntrada = new Date(fecha);
        const diasDescanso = getDiasDescanso(turno, fechaEntrada);
        mostrarCalendario(diasDescanso);
    });
});

function getTurnoActual(turno, diasDesdeInicio) {
    const turnos = ["mañana", "noche", "tarde"];
    const indiceTurno = turnos.indexOf(turno);
    return turnos[(indiceTurno + Math.floor(diasDesdeInicio / 6)) % 3];
}

function getDiasDescanso(turno, fechaInicio) {
    const diasDescanso = [];
    let fechaActual = new Date(fechaInicio);
    for (let i = 0; i < 365; i++) {
        const diasDesdeInicio = Math.floor((fechaActual.getTime() - fechaInicio.getTime()) / (1000 * 3600 * 24));
        const turnoActual = getTurnoActual(turno, diasDesdeInicio);
        const esDiaDescanso = diasDesdeInicio % 8 >= 6;
        if (esDiaDescanso) {
            diasDescanso.push(fechaActual.toISOString().split('T')[0]);
        }
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return diasDescanso;
}

function mostrarCalendario(diasDescanso) {
    const calendarEl = document.getElementById("calendar");
    const events = diasDescanso.map(function(dia) {
        return {
            title: "Día de descanso",
            start: dia,
            color: "green"
        };
    });

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        events: events
    });

    calendar.render();
}
