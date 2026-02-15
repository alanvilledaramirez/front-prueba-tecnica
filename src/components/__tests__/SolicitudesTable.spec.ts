import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SolicitudesTable from '../SolicitudesTable.vue';

describe('SolicitudesTable.vue', () => {
  it('debe mostrar el mensaje de carga cuando cargando es true', () => {
    const wrapper = mount(SolicitudesTable, {
      props: { solicitudes: [], cargando: true }
    });
    expect(wrapper.text()).toContain('Consultando PostgreSQL...');
  });

  it('debe renderizar la lista de solicitudes y el estado correctamente', () => {
    const mockSolicitudes = [{
      id: 'uuid-1234',
      nombre_completo: 'Juan Perez',
      email: 'juan@test.com',
      telefono: '5551234',
      pais: 'Mexico',
      tipo_documento: 'INE',
      numero_documento: '12345',
      url_imagen: 'laimagen.jpg',
      nivel_riesgo: 'BAJO',
      score_riesgo: 10,
      estado: 'APROBADA',
      fecha_creacion: new Date().toISOString()
    }];

    const wrapper = mount(SolicitudesTable, {
      props: { solicitudes: mockSolicitudes, cargando: false }
    });


    expect(wrapper.text()).toContain('Juan Perez');
    expect(wrapper.text()).toContain('juan@test.com');
    

    expect(wrapper.text()).toContain('APROBADA');
  });

  it('debe mostrar el badge de PENDIENTE si la solicitud no tiene estado', () => {
    const mockSolicitudes = [{
      id: 'uuid-5678',
      nombre_completo: 'Maria Garcia',
      email: 'maria@test.com',
      telefono: '9998887',
      pais: 'Colombia',
      tipo_documento: 'Pasaporte',
      numero_documento: 'ABC123',
      url_imagen: 'laimagen.jpg',
      nivel_riesgo: 'MEDIO',
      score_riesgo: 35,
      estado: '',
      fecha_creacion: new Date().toISOString()
    }];

    const wrapper = mount(SolicitudesTable, {
      props: { solicitudes: mockSolicitudes, cargando: false }
    });

    expect(wrapper.text()).toContain('PENDIENTE');
  });
});