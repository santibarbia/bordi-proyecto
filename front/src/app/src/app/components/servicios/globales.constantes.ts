import { environment } from '../../../../../environments/environment';

// const URL_LOCAL = "https://bordi-proyecto.appspot.com/";
// const URL_LOCAL = "http://25.94.138.231:3000/";
// const URL_LOCAL = "http://45.132.240.231:3000/";
// const URL_LOCAL = "https://tutticonvos.com/";
const URL_LOCAL = "http://localhost:3000/";
const URL_RELATIVE = "/";

export const URL_GLOBAL = (environment.production) ? URL_RELATIVE : (!environment.production) ? URL_LOCAL : URL_RELATIVE;
export const CONTAINER = "production-tutticonvos.appspot.com"

export const COMBOS = URL_GLOBAL+'api/Combos';
export const COMBOS_DISPONIBLES = URL_GLOBAL+'api/CombosForProjects'
export const HISTORIES = URL_GLOBAL+'api/Histories';
export const PAGINAS = URL_GLOBAL+'api/Combos/count';
export const COMBOS_DESTACADOS = URL_GLOBAL+'api/Combos/getFeaturedCombos';
export const VENTAS = URL_GLOBAL+'api/Projects/saveDetail'
export const PROYECTO_ID = URL_GLOBAL+'api/Projects/getProjectDetails'
export const PROYECTO = URL_GLOBAL+'api/Projects';
export const GEST_PROY = URL_GLOBAL+'api/Projects/registryNewProject';
export const COLABORADORES = URL_GLOBAL+'api/Users?filter[where][and][0][typeRole]=COLABORADOR&filter[where][and][1][status]=ACTIVO';
export const COMBOS_HABILITADOS = URL_GLOBAL+'api/Combos?filter[where][and][0][availability]=true&filter[where][and][1][status]=ACTIVO';
export const GET_SELLER = URL_GLOBAL+'api/Projects/getSellerSummary';
export const GEST_USERS = URL_GLOBAL+'api/Users';
export const META = URL_GLOBAL+'api/Projects/getMeta';
export const STATISTICS = URL_GLOBAL+'api/Projects/getStatistics';
export const MODIFICAR_VENTAS = URL_GLOBAL+'api/Projects/saveChangesDetails';
export const BORRAR_VENTAS = URL_GLOBAL+'api/ProjectDetails';
export const CARGAR_IMAGENES = URL_GLOBAL+'api/containers'
export const USUARIOS = URL_GLOBAL+'api/Users';

//Calendario

export const GET_EVENT = URL_GLOBAL+'api/TuttiEvents'

//SEGURIDAD CONSTANTES
export const LOGIN = URL_GLOBAL+'api/Users/login';
export const LOGOUT = URL_GLOBAL+'api/Users/logout';