import axios from 'axios';

export interface Solicitud {
  id?: string;
  nombre_completo: string;
  email: string;
  telefono: string;
  pais: string;
  tipo_documento: string;
  numero_documento: string;
  url_imagen: string;
  estado: string;
  nivel_riesgo?: string;
  score_riesgo?: number;
  fecha_creacion?: string;
}

export interface AuditLog {
  _id: string;
  accion: string;
  detalle: string;
  solicitud_id?: string;
  timestamp: string;
}

const api = axios.create({
  baseURL: 'https://backend-prueba-tecnica-7cu9.onrender.com/api/v1',
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
});

export default {
  getSolicitudes: () => api.get<Solicitud[]>('/solicitudes/'),
  createSolicitud: (data: Solicitud) => api.post<Solicitud>('/solicitudes/', data),
  getAuditoria: () => api.get<AuditLog[]>('/solicitudes/auditoria')
};