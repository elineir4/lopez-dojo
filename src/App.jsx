import { useEffect, useState } from 'react'
import './App.css'
import fotoHero from './assets/hero2-Photoroom.png'
import logoDojo from './assets/WhatsApp Image 2026-09-27 at 19.25.21-Photoroom.png'
import fotoJulieta from './assets/julietadominguini.jpeg'
import fotoPaula from './assets/paulycalderon.jpeg'
import fotoSantiago from './assets/santiagozapata.jpeg'
import fotoLeandro from './assets/leandrosensei.jpeg'

// Enlaces y funciones que usamos en distintas partes de la página.
const enlaceWhatsApp = 'https://wa.me/5493513122622?text=Hola%20Lopez%20Dojo%2C%20quiero%20reservar%20una%20clase%20de%20prueba.'
const obtenerFoto = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=88`

// Información de las disciplinas que ofrece el dojo.
const disciplinas = [
  {
    numero: '01',
    publico: 'ADULTOS Y NIÑOS',
    subtitulo: 'ARTE SUAVE · NE-WAZA',
    titulo: 'JIU-JITSU BRASILEÑO (BJJ)',
    descripcion: 'Control posicional, sumisiones y combate en el suelo bajo los principios tradicionales de defensa personal y técnica pura.',
    pie: 'CON Y SIN GI · DEFENSA PERSONAL',
    imagen: obtenerFoto('photo-1555597673-b21d5c935865'),
  },
  {
    numero: '02',
    publico: 'ADULTOS Y NIÑOS',
    subtitulo: 'TRADICIÓN JAPONESA · KIHON & KATA',
    titulo: 'KARATE-DO TRADICIONAL',
    descripcion: 'Fundamentos, formas maestras y combate reglado. Disciplina mental, postura y potencia de impacto explosivo.',
    pie: 'GRADUACIÓN OFICIAL · FILOSOFÍA BUDŌ',
    imagen: obtenerFoto('photo-1606335543042-57c525922933'),
  },
  {
    numero: '03',
    publico: 'ADULTOS Y NIÑOS',
    subtitulo: 'STRIKING · ACONDICIONAMIENTO FÍSICO',
    titulo: 'KICKBOXING / BOXEO',
    descripcion: 'Trabajo técnico de golpeo, distancia, desplazamientos y acondicionamiento atlético combativo.',
    pie: 'FOCO EN POTENCIA Y RESISTENCIA',
    imagen: obtenerFoto('photo-1549719386-74dfcbf7dbed'),
  },
  {
    numero: '04',
    publico: 'EXCLUSIVO ADULTOS',
    subtitulo: 'INTEGRACIÓN MARCIAL TOTAL',
    titulo: 'MMA (ARTES MARCIALES MIXTAS)',
    descripcion: 'Integración de striking, derribos, clinch y lucha cuerpo a cuerpo en suelo.',
    pie: 'NIVEL INTERMEDIO Y AVANZADO',
    imagen: obtenerFoto('photo-1552074284-5e88ef1aef18'),
  },
]

// Equipo docente del programa infantil.
const docentes = [
  {
    nombre: 'JULIETA DOMINGUINI',
    especialidad: 'Jiu-Jitsu Niños',
    etiqueta: 'ESPECIALIDAD INFANTIL',
    codigo: 'DOJO KIDS BJJ',
    imagen: fotoJulieta,
  },
  {
    nombre: 'PAULA CALDERÓN',
    especialidad: 'Karate Niños',
    etiqueta: 'ESPECIALIDAD INFANTIL',
    codigo: 'DOJO KIDS KARATE',
    imagen: fotoPaula,
  },
  {
    nombre: 'SANTIAGO ZAPATA',
    especialidad: 'Kickboxing y Boxeo · Niños y Adultos',
    etiqueta: 'ESPECIALIDAD STRIKING',
    codigo: 'STRIKING & KIDS PROGRAM',
    imagen: fotoSantiago,
  },
]

// Horarios separados por grupo para que el cambio de pestaña sea simple.
const horariosAdultos = [
  {
    hora: '19:30 — 20:30',
    disciplina: 'KICKBOXING / BOXEO',
    descripcion: 'Striking técnico y combate de pie',
    publico: 'ADULTOS',
    color: 'blue',
  },
  {
    hora: '20:30 — 21:30',
    disciplina: 'KICKBOXING / MMA',
    descripcion: 'Transición de striking a suelo y jaula',
    publico: 'ADULTOS',
    color: 'purple',
  },
  {
    hora: '21:30 — 22:30',
    disciplina: 'JIU-JITSU',
    descripcion: 'Brazilian Jiu-Jitsu técnico y randori',
    publico: 'ADULTOS',
    color: 'blue',
  },
]

const horariosNinos = [
  {
    hora: '19:30 — 20:30',
    disciplina: 'JIU-JITSU',
    descripcion: 'Brazilian Jiu-Jitsu · fundamentos',
    publico: 'TODAS LAS EDADES',
    color: 'blue',
  },
  {
    hora: '20:40 — 22:30',
    disciplina: 'KARATE',
    descripcion: 'Karate-Do tradicional · kihon, kata y kumite',
    publico: 'TODAS LAS EDADES',
    color: 'purple',
  },
]

// Grilla completa, separada por días para mostrar dos tablas.
const gruposAdultos = [
  {
    dias: 'LUNES Y MIÉRCOLES',
    turno: 'TURNO TARDE / NOCHE',
    clases: [
      { hora: '19:30 — 20:30', disciplina: 'KICKBOXING / BOXEO', descripcion: 'Striking técnico y combate de pie', publico: 'ADULTOS', color: 'blue' },
      { hora: '20:30 — 21:30', disciplina: 'KICKBOXING / MMA', descripcion: 'Transición de striking a suelo y jaula', publico: 'ADULTOS', color: 'purple' },
      { hora: '21:30 — 22:30', disciplina: 'JIU-JITSU', descripcion: 'Jiu-Jitsu técnico y randori', publico: 'ADULTOS', color: 'blue' },
    ],
  },
  {
    dias: 'MARTES Y JUEVES',
    turno: 'TURNO TARDE / NOCHE',
    clases: [
      { hora: '19:30 — 20:30', disciplina: 'JIU-JITSU', descripcion: 'Jiu-Jitsu técnico y fundamentos', publico: 'ADULTOS', color: 'blue' },
      { hora: '20:40 — 22:30', disciplina: 'KARATE', descripcion: 'Karate-Do tradicional', publico: 'ADULTOS', color: 'purple' },
    ],
  },
]

const gruposNinos = [
  {
    dias: 'LUNES Y MIÉRCOLES',
    turno: 'TURNO TARDE',
    clases: [
      { hora: '17:30 — 18:30', disciplina: 'JIU-JITSU', descripcion: 'Jiu-Jitsu infantil · fundamentos', publico: 'NIÑOS', color: 'blue' },
      { hora: '18:30 — 19:30', disciplina: 'JIU-JITSU', descripcion: 'Jiu-Jitsu infantil · práctica', publico: 'NIÑOS', color: 'blue' },
    ],
  },
  {
    dias: 'MARTES Y JUEVES',
    turno: 'MAÑANA Y TARDE',
    clases: [
      { hora: '10:30 — 11:30', disciplina: 'JIU-JITSU', descripcion: 'Clase de Jiu-Jitsu por la mañana', publico: 'NIÑOS', color: 'blue' },
      { hora: '17:30 — 18:30', disciplina: 'KICKBOXING', descripcion: 'Kickboxing infantil', publico: 'NIÑOS', color: 'blue' },
      { hora: '18:30 — 19:30', disciplina: 'KARATE', descripcion: 'Karate-Do infantil', publico: 'NIÑOS', color: 'purple' },
    ],
  },
]

// Iconos simples en SVG para no depender de otra librería.
function Icono({ nombre }) {
  const propiedades = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.7',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (nombre === 'flecha') {
    return <svg {...propiedades}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
  }

  if (nombre === 'externo') {
    return <svg {...propiedades}><path d="M5 19 19 5M8 5h11v11" /></svg>
  }

  if (nombre === 'ubicacion') {
    return <svg {...propiedades}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.4" /></svg>
  }

  if (nombre === 'telefono') {
    return <svg {...propiedades}><path d="M6.5 4.5H10l1.6 4-2 1.4a11.5 11.5 0 0 0 5.5 5.5l1.4-2 4 1.6v3.5A1.5 1.5 0 0 1 19 20C10.7 20 4 13.3 4 5a1.5 1.5 0 0 1 1.5-1.5Z" /></svg>
  }

  if (nombre === 'menu') {
    return <svg {...propiedades}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  }

  if (nombre === 'cerrar') {
    return <svg {...propiedades}><path d="m6 6 12 12M18 6 6 18" /></svg>
  }

  if (nombre === 'instagram') {
    return <svg {...propiedades}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.5" /><circle cx="17.3" cy="6.8" r=".7" fill="currentColor" stroke="none" /></svg>
  }

  return null
}

function Marca() {
  return <span className="mark"><b>L</b><i>道</i></span>
}

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [pestana, setPestana] = useState('adultos')
  const [disciplinasElegidas, setDisciplinasElegidas] = useState([])

  const horarios = pestana === 'adultos' ? horariosAdultos : horariosNinos
  const gruposHorarios = pestana === 'adultos' ? gruposAdultos : gruposNinos
  const cerrarMenu = () => setMenuAbierto(false)

  // Cuota de ejemplo: cuantas más disciplinas se eligen, menor es el valor por actividad.
  const cuotasMensuales = {
    1: 40000,
    2: 68000,
    3: 90000,
    4: 110000,
  }
  const cuotaMensual = cuotasMensuales[disciplinasElegidas.length] || 0
  const mostrarPesos = (monto) => new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(monto)

  const cambiarDisciplina = (titulo) => {
    setDisciplinasElegidas((elegidas) => elegidas.includes(titulo)
      ? elegidas.filter((disciplina) => disciplina !== titulo)
      : [...elegidas, titulo])
  }

  const mensajeInscripcion = `Hola Lopez Dojo, quiero inscribirme en: ${disciplinasElegidas.join(', ')}. Cuota mensual estimada: ${mostrarPesos(cuotaMensual)}.`
  const enlaceInscripcion = `${enlaceWhatsApp.split('?')[0]}?text=${encodeURIComponent(mensajeInscripcion)}`

  // Las secciones aparecen cuando entran en pantalla al hacer scroll.
  useEffect(() => {
    const secciones = document.querySelectorAll('.scroll-reveal')
    const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefiereMenosMovimiento) {
      secciones.forEach((seccion) => seccion.classList.add('is-visible'))
      return undefined
    }

    const observador = new IntersectionObserver((entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible')
          observer.unobserve(entrada.target)
        }
      })
    }, { threshold: 0.12 })

    secciones.forEach((seccion) => observador.observe(seccion))
    return () => observador.disconnect()
  }, [])

  return (
    <div className="dojo-page">
      <header className="header">
        <div className="container header-inner">
          <a href="#inicio" className="brand">
            {logoDojo ? <img className="logo-dojo" src={logoDojo} alt="Lopez Dojo" /> : <Marca />}
            <span><b>LOPEZ</b><small>DOJO</small></span>
          </a>

          <nav className={menuAbierto ? 'nav nav--open' : 'nav'}>
            <a href="#disciplinas" onClick={cerrarMenu}>Disciplinas</a>
            <a href="#inscripcion" onClick={cerrarMenu}>Inscripción</a>
            <a href="#equipo" onClick={cerrarMenu}>Equipo docente</a>
            <a href="#horarios" onClick={cerrarMenu}>Horarios</a>
            <a href="#contacto" onClick={cerrarMenu}>Contacto</a>
          </nav>

          <a href={enlaceWhatsApp} className="header-cta" target="_blank" rel="noreferrer">
            CLASE DE PRUEBA <Icono nombre="externo" />
          </a>

          <button
            className="menu-button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <Icono nombre={menuAbierto ? 'cerrar' : 'menu'} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="micro">
                <span>BIENVENIDO AL TATAMI</span>
                <small><Icono nombre="ubicacion" /> VILLA ALLENDE, CÓRDOBA</small>
              </div>
              <h1><span className="nombre-dojo">LOPEZ</span> DOJO</h1>
              <p className="hero-text">
                Artes marciales para todos los niveles. Entrená con disciplina, técnica y respeto.
              </p>

              <div className="hero-actions">
                <a href={enlaceWhatsApp} className="button button--blue" target="_blank" rel="noreferrer">
                  RESERVAR CLASE DE PRUEBA <small>(WHATSAPP)</small> <Icono nombre="externo" />
                </a>
                <a href="#horarios" className="button button--dark">
                  VER HORARIOS <Icono nombre="flecha" />
                </a>
              </div>

              <div className="facts">
                <span><b>BJJ &amp; KARATE</b><small>LINAJE TRADICIONAL</small></span>
                <span><b>KICK &amp; MMA</b><small>STRIKING &amp; JAULA</small></span>
                <span><b>TODAS EDADES</b><small>INFANTILES Y ADULTOS</small></span>
                <span><b>V. ALLENDE</b><small>CP 5105 · CÓRDOBA</small></span>
              </div>
            </div>

            <article className="hero-person" aria-label="Imagen del sensei principal">
              <img src={fotoHero} alt="Entrenamiento de artes marciales" />
            </article>
          </div>
        </section>

        <section className="section scroll-reveal" id="disciplinas">
          <div className="container">
            <div className="section-head">
              <p className="tag">PROGRAMAS DE FORMACIÓN</p>
              <h2>DISCIPLINAS</h2>
              <p>Especialización técnica con enfoque pedagógico tradicional y deportivo de alta exigencia.</p>
            </div>

            <div className="discipline-grid">
              {disciplinas.map((disciplina) => (
                <article
                  className={disciplinasElegidas.includes(disciplina.titulo) ? 'discipline selected' : 'discipline'}
                  key={disciplina.titulo}
                  role="checkbox"
                  tabIndex="0"
                  aria-checked={disciplinasElegidas.includes(disciplina.titulo)}
                  onClick={() => cambiarDisciplina(disciplina.titulo)}
                  onKeyDown={(evento) => {
                    if (evento.key === 'Enter' || evento.key === ' ') {
                      evento.preventDefault()
                      cambiarDisciplina(disciplina.titulo)
                    }
                  }}
                >
                  <div className="discipline-image">
                    {disciplinasElegidas.includes(disciplina.titulo) && <span className="discipline-check">✓</span>}
                    <img src={disciplina.imagen} alt={disciplina.titulo} />
                    <span className="badge">{disciplina.publico}</span>
                    <i>{disciplina.numero}</i>
                  </div>
                  <div className="discipline-body">
                    <h3>{disciplina.titulo}</h3>
                    <p>{disciplina.descripcion}</p>
                    <footer>
                      <span>{disciplina.pie}</span>
                      <a href="#horarios" onClick={(evento) => evento.stopPropagation()}>HORARIOS <Icono nombre="flecha" /></a>
                    </footer>
                  </div>
                </article>
              ))}
            </div>

            <div className="discipline-selection">
              <div>
                <small>DISCIPLINAS ELEGIDAS</small>
                <p>{disciplinasElegidas.length ? disciplinasElegidas.join(' · ') : 'Hacé clic en una o varias disciplinas para inscribirte.'}</p>
              </div>
              <div className="discipline-selection-total">
                <small>CUOTA MENSUAL ESTIMADA</small>
                <strong>{disciplinasElegidas.length ? mostrarPesos(cuotaMensual) : '—'}</strong>
                <a
                  href={disciplinasElegidas.length ? enlaceInscripcion : '#disciplinas'}
                  className={disciplinasElegidas.length ? 'button button--blue' : 'button button--blue disabled'}
                  target={disciplinasElegidas.length ? '_blank' : undefined}
                  rel={disciplinasElegidas.length ? 'noreferrer' : undefined}
                  onClick={(evento) => {
                    if (!disciplinasElegidas.length) evento.preventDefault()
                  }}
                >
                  INSCRIBIRME <Icono nombre="externo" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="enrollment scroll-reveal" id="inscripcion">
          <div className="container">
            <div className="section-head">
              <p className="tag">INSCRIPCIÓN AL DOJO</p>
              <h2>ELEGÍ TU DISCIPLINA</h2>
              <p>Podés elegir una o varias disciplinas. La cuota mensual se calcula automáticamente con descuento por combinación.</p>
            </div>

            <div className="enrollment-layout">
              <div className="enrollment-options">
                {disciplinas.map((disciplina) => (
                  <label className={disciplinasElegidas.includes(disciplina.titulo) ? 'enrollment-option selected' : 'enrollment-option'} key={disciplina.titulo}>
                    <input
                      type="checkbox"
                      checked={disciplinasElegidas.includes(disciplina.titulo)}
                      onChange={() => cambiarDisciplina(disciplina.titulo)}
                    />
                    <span>
                      <b>{disciplina.titulo}</b>
                      <small>{disciplina.publico}</small>
                    </span>
                  </label>
                ))}
              </div>

              <aside className="enrollment-summary">
                <small>CUOTA MENSUAL ESTIMADA</small>
                <strong>{disciplinasElegidas.length ? mostrarPesos(cuotaMensual) : 'ELEGÍ UNA DISCIPLINA'}</strong>
                <p>{disciplinasElegidas.length ? `${disciplinasElegidas.length} disciplina${disciplinasElegidas.length > 1 ? 's' : ''} seleccionada${disciplinasElegidas.length > 1 ? 's' : ''}.` : 'Podés seleccionar más de una actividad.'}</p>
                <a
                  href={disciplinasElegidas.length ? enlaceInscripcion : '#inscripcion'}
                  className={disciplinasElegidas.length ? 'button button--blue' : 'button button--blue disabled'}
                  target={disciplinasElegidas.length ? '_blank' : undefined}
                  rel={disciplinasElegidas.length ? 'noreferrer' : undefined}
                  onClick={(evento) => {
                    if (!disciplinasElegidas.length) evento.preventDefault()
                  }}
                >
                  INSCRIBIRME POR WHATSAPP <Icono nombre="externo" />
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="team scroll-reveal" id="equipo">
          <div className="container">
            <div className="heading-row">
              <div>
                <p className="tag">CUERPO TÉCNICO OFICIAL</p>
                <h2>SENSEI &amp; EQUIPO DOCENTE</h2>
              </div>
              <p>Supervisión experta, responsabilidad pedagógica y linaje acreditado en la formación marcial de niños, jóvenes y adultos.</p>
            </div>

            <article className="lead">
              <div className="lead-image">
                <img src={fotoLeandro} alt="Sensei Leandro López" />
                <img src={obtenerFoto('photo-1567013127542-490d757e51fc')} alt="Sensei Leandro López" />
                <span className="badge">DIRECTOR TÉCNICO</span>
              </div>
              <div className="lead-copy">
                <p className="tag">SENSEI PRINCIPAL · FUNDADOR</p>
                <h3>SENSEI LEANDRO GERMÁN<br /><em>LÓPEZ</em></h3>
                <b>INSTRUCTOR A CARGO DE BJJ ADULTOS, KARATE, KICKBOXING Y MMA</b>
                <p>
                  Liderazgo marcial con décadas de trayectoria formativa, forjado en la preservación
                  de los valores de lealtad, disciplina estricta y defensa personal legítima. Dirige
                  integralmente los programas técnicos de combate y asegura la continuidad de los
                  estándares de excelencia en cada sesión sobre el tatami.
                </p>
                <div className="chips">
                  <span>BJJ ADULTOS &amp; RANDORI</span>
                  <span>KARATE-DO TRADICIONAL</span>
                  <span>KICKBOXING TÉCNICO</span>
                  <span>MMA PROFESIONAL &amp; AMATEURS</span>
                </div>
                
              </div>
            </article>

            <div className="people">
              {docentes.map((docente) => (
                <article className="person" key={docente.nombre}>
                  <div>
                    <img src={docente.imagen} alt={docente.nombre} />
                    <span>{docente.etiqueta}</span>
                  </div>
                  <h3>{docente.nombre}</h3>
                  <p>{docente.especialidad}</p>
                  <small>{docente.codigo}</small>
                </article>
              ))}
            </div>

            <div className="kids-note">
              <b>COORDINACIÓN PEDAGÓGICA INFANTIL:</b> Las clases para niños cuentan con el seguimiento continuo
              y articulado entre Paula Calderón y Santiago Zapata. <a href="#contacto">VER @LOPEZDOJOKIDS →</a>
            </div>
          </div>
        </section>

        <section className="schedule scroll-reveal" id="horarios">
          <div className="container">
            <div className="center-head">
              <p className="tag">PLANIFICACIÓN SEMANAL DE ENTRENAMIENTOS</p>
              <h2>HORARIOS OFICIALES</h2>
              <p>Estructura ordenada por grupos para garantizar máxima concentración y disponibilidad de tatami.</p>
            </div>

            <div className="tabs">
              <button className={pestana === 'adultos' ? 'active' : ''} onClick={() => setPestana('adultos')}>
                HORARIOS ADULTOS
              </button>
              <button className={pestana === 'ninos' ? 'active' : ''} onClick={() => setPestana('ninos')}>
                HORARIOS NIÑOS
              </button>
            </div>

            <div className="schedule-cards">
              {gruposHorarios.map((grupo) => (
                <article className="schedule-card" key={grupo.dias}>
                  <header>
                    <div>
                      <small>DÍAS DE ENTRENAMIENTO</small>
                      <h3>{grupo.dias}</h3>
                    </div>
                    <b>{grupo.turno}</b>
                  </header>

                  {grupo.clases.map((clase) => (
                    <div className="schedule-row" key={clase.hora + clase.disciplina}>
                      <strong>{clase.hora}</strong>
                      <div>
                        <h4>{clase.disciplina}</h4>
                        <p>{clase.descripcion}</p>
                      </div>
                      <span className={clase.color}>{clase.publico}</span>
                    </div>
                  ))}

                  <small className="teacher">Profesor a cargo: Sensei Leandro López</small>
                </article>
              ))}
            </div>

            <article className="schedule-card">
              <header>
                <div>
                  <small>DÍAS DE ENTRENAMIENTO</small>
                  <h3>{pestana === 'adultos' ? 'LUNES Y MIÉRCOLES' : 'MARTES Y JUEVES'}</h3>
                </div>
                <b>{pestana === 'adultos' ? 'TURNO TARDE / NOCHE' : 'TURNO NOCHE'}</b>
              </header>

              {horarios.map((clase) => (
                <div className="schedule-row" key={clase.hora + clase.disciplina}>
                  <strong>{clase.hora}</strong>
                  <div>
                    <h4>{clase.disciplina}</h4>
                    <p>{clase.descripcion}</p>
                  </div>
                  <span className={clase.color}>{clase.publico}</span>
                </div>
              ))}

              <small className="teacher">Profesor a cargo: Sensei Leandro López</small>
            </article>

            <p className="question">¿Dudas sobre qué disciplina o turno elegir según tu edad o condición física?</p>
            <a href={enlaceWhatsApp} className="schedule-link" target="_blank" rel="noreferrer">
              CONSULTAR POR WHATSAPP CON LA SECRETARÍA DEL DOJO →
            </a>
          </div>
        </section>

        <section className="contact scroll-reveal" id="contacto">
          <div className="container">
            <div className="heading-row contact-head">
              <div>
                <p className="tag">SEDE CENTRAL</p>
                <h2>UBICACIÓN &amp; CONTACTO</h2>
                <p>Nos encontramos en el corazón de Villa Allende, Córdoba, con instalaciones dedicadas al arte marcial clásico y moderno.</p>
              </div>
              <Mapa />
            </div>

            <div className="contact-grid">
              <div>
                <article className="address">
                  <p className="tag">DIRECCIÓN FÍSICA</p>
                  <h3>AV. GOYCOECHEA 249</h3>
                  <p>Lopez Dojo · Villa Allende<br />Villa Allende, Córdoba, Argentina (CP 5105)</p>
                  <div>
                    <span><Icono nombre="telefono" /> +54 9 351 312 2622</span>
                    <a href={enlaceWhatsApp} target="_blank" rel="noreferrer">ESCRIBIR AL WHATSAPP</a>
                  </div>
                </article>

                <div className="social">
                  <p className="tag">CANALES OFICIALES DE LA ESCUELA</p>
                  <div>
                    <a href="https://www.instagram.com/lopezdojo/" target="_blank" rel="noreferrer">@lopezdojo <small>CANAL GENERAL / DOJO</small><Icono nombre="flecha" /></a>
                    <a href="https://www.instagram.com/karatedo.villaallende/?hl=es" target="_blank" rel="noreferrer">@karatedo.villaallende <small>CANAL DE KARATE-DO</small><Icono nombre="flecha" /></a>
                    <a href="https://www.instagram.com/jiujitsu.lopezdojo/" target="_blank" rel="noreferrer">@jiujitsu.lopezdojo <small>JIU-JITSU BRASILEÑO</small><Icono nombre="flecha" /></a>
                    <a href="https://www.instagram.com/mma_kboxing/?hl=es" target="_blank" rel="noreferrer">@mma_kboxing <small>MMA Y KICKBOXING</small><Icono nombre="flecha" /></a>
                    <a href="https://www.instagram.com/lopezdojokids/?hl=es" target="_blank" rel="noreferrer">@lopezdojokids <small>LOPEZ DOJO KIDS</small><Icono nombre="flecha" /></a>
                  </div>
                </div>
              </div>

              <article className="rules">
                <p className="tag">NORMAS FUNDAMENTALES DEL DOJO</p>
                {['Ingreso con respeto (Rei)', 'Higiene y Equipo', 'Cuidado del Compañero'].map((norma, indice) => (
                  <div key={norma}>
                    <b>0{indice + 1}.</b>
                    <p><strong>{norma}</strong><br />Saludo protocolar y cuidado riguroso del espacio y el compañero.</p>
                  </div>
                ))}
              </article>
            </div>
          </div>
        </section>

        <section className="cta scroll-reveal">
          <div className="container">
            <p className="tag">VILLA ALLENDE · FORMACIÓN MARCIAL OFICIAL</p>
            <h2>COMENZÁ TU CAMINO MARCIAL</h2>
            <p>No se requiere experiencia previa ni condición atlética extraordinaria para empezar. La disciplina se construye paso a paso sobre el tatami.</p>
            <a href={enlaceWhatsApp} className="button button--blue" target="_blank" rel="noreferrer">
              RESERVÁ TU CLASE DE PRUEBA SIN CARGO <Icono nombre="externo" />
            </a>
            <small>AV. GOYCOECHEA 249 · VILLA ALLENDE, CÓRDOBA · WHATSAPP +54 9 351 312 2622</small>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <a href="#inicio" className="brand">
            {logoDojo ? <img className="logo-dojo" src={logoDojo} alt="Lopez Dojo" /> : <Marca />}
            <span><b>LOPEZ</b><small>DOJO</small></span>
          </a>
          <span>FORMACIÓN MARCIAL OFICIAL</span>
          <a href="https://www.instagram.com/lopezdojo/" target="_blank" rel="noreferrer">
            <Icono nombre="instagram" /> @LOPEZDOJO
          </a>
          <span>© {new Date().getFullYear()} LOPEZ DOJO</span>
        </div>
      </footer>
    </div>
  )
}

function Mapa() {
  return (
    <div className="map">
      <div className="map-art">
        <span>VILLA ALLENDE</span>
        <i><Icono nombre="ubicacion" /></i>
      </div>
      <div>
        <small>COORDENADAS DEL TATAMI<br /><b>Av. Goycoechea 249, Villa Allende</b></small>
        <a href="https://maps.google.com/?q=Av.+Goycoechea+249,+Villa+Allende" target="_blank" rel="noreferrer">
          ABRIR EN MAPS <Icono nombre="externo" />
        </a>
      </div>
    </div>
  )
}

export default App
