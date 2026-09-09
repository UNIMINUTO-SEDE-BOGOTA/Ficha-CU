import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// ─────────────────────────────────────────────
// MAPEO DE CENTRO_ID AL CAMPO "Nivel" EN EL EXCEL
// ─────────────────────────────────────────────
export const CENTRO_TO_NIVEL: Record<string, string> = {
  'sede-bogota':                   'Bogotá',
  'centro-engativa':               'Especial Minuto de Dios - Engativá',
  'centro-santa-fe-las-cruces':    'Las Cruces - Santa Fe',
  'centro-perdomo-ciudad-bolivar': 'Perdomo - Ciudad Bolívar',
  'centro-kennedy':                'Kennedy',
  'centro-san-cristobal-usaquen':  'San Cristóbal Norte - Usaquén',
};

const ANIOS_COLS = ['Linea Base', '2025', '2026', '2027', '2028', '2029', '2030'];

// ─────────────────────────────────────────────
// FORMATEO DINÁMICO DE CADA CELDA
// ─────────────────────────────────────────────
function formatCell(indicador: string, valor: any, colIdx: number): string {
  if (valor === null || valor === undefined || String(valor).trim() === '' || valor === '-') {
    return '-';
  }

  const str = String(valor).trim();
  if (str.includes('%')) {
    return str.replace(/\s+/g, '');
  }
  if (str.includes('/')) {
    return str;
  }

  const num = Number(str);
  if (isNaN(num)) {
    return str.replace(/\s+/g, ' ');
  }

  // Ceros en línea base de indicadores que no aplican en 2024
  if (num === 0) {
    if (colIdx === 0 && [
      'Tasa de Conversión', 'Educación Continua', 'EBITDA',
      'Diversificación de Ingresos', 'Deserción Presencial', 'Deserción Distancia'
    ].includes(indicador)) {
      return '-';
    }
  }

  // Indicadores porcentuales
  const pctIndicators = [
    'Contratación Profesores', 'Escalafón', 'Profesores Doctorado',
    'Índice H', 'Tasa de Conversión', 'Deserción Presencial',
    'Deserción Distancia', 'EBITDA'
  ];
  if (pctIndicators.includes(indicador)) {
    if (num === 0) return '-';
    const pct = num <= 1 ? num * 100 : num;
    const rounded = Math.round(pct * 10) / 10;
    return (rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)) + '%';
  }

  // Indicadores de conteo (personas / estudiantes)
  const countIndicators = ['Estudiantes Centro Universitario', 'Matrícula Nuevos', 'Educación Continua'];
  if (countIndicators.includes(indicador)) {
    if (num === 0) return '-';
    return Math.round(num).toLocaleString('es-CO');
  }

  // Puntajes (Saber Pro) o enteros (Grupos de investigación)
  return Math.round(num).toString();
}

// ─────────────────────────────────────────────
// EXTRAER Y PROCESAR LAS FILAS DINÁMICAMENTE DEL WORKBOOK
// ─────────────────────────────────────────────
export function procesarMetasDesdeWorkbook(workbook: XLSX.WorkBook, centroId: string): string[][] {
  const sheet = workbook.Sheets['Metas Sede Bogota'];
  if (!sheet) {
    console.warn('[excel_temporal] No se encontró la hoja "Metas Sede Bogota" en el Excel');
    return [];
  }

  // Convertir hoja a JSON dinámicamente con SheetJS
  const rawData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);
  const targetNivel = CENTRO_TO_NIVEL[centroId] || centroId;

  // Filtrar filas por el Nivel correspondiente al centro
  const rows = rawData.filter(
    (r) => String(r.Nivel || '').trim().toLowerCase() === targetNivel.trim().toLowerCase()
  );

  return rows.map((r) => {
    const ind = String(r['Nombre Corto'] || r.Indicador || '').trim();

    // Normalizar claves para eliminar espacios y espacios no rompibles (\u00A0)
    const normalizedRow: Record<string, any> = {};
    for (const [k, v] of Object.entries(r)) {
      normalizedRow[k.trim().replace(/\s+/g, '')] = v;
    }

    const values = ANIOS_COLS.map((colKey, idx) => {
      const cleanedKey = colKey.replace(/\s+/g, '');
      const rawVal = normalizedRow[cleanedKey];
      return formatCell(ind, rawVal, idx);
    });

    return [ind, ...values];
  });
}

// ─────────────────────────────────────────────
// LECTURA DINÁMICA DEL ARCHIVO EXCEL (/Metas Fichas CU.xlsx)
// ─────────────────────────────────────────────
let cachedWorkbook: XLSX.WorkBook | null = null;
let workbookPromise: Promise<XLSX.WorkBook> | null = null;

export async function cargarWorkbookExcel(forceReload = false): Promise<XLSX.WorkBook> {
  if (cachedWorkbook && !forceReload) return cachedWorkbook;
  if (workbookPromise && !forceReload) return workbookPromise;

  workbookPromise = (async () => {
    const fileUrl = `/Metas%20Fichas%20CU.xlsx?v=${Date.now()}`;
    const response = await fetch(fileUrl, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Error al descargar el Excel: HTTP ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    // Parseo dinámico en tiempo real usando SheetJS XLSX.read
    const wb = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    cachedWorkbook = wb;
    console.log('[excel_temporal] Excel "Metas Fichas CU.xlsx" cargado dinámicamente. Hojas:', wb.SheetNames);
    return wb;
  })();

  return workbookPromise;
}

// ─────────────────────────────────────────────
// TIPO DE RETORNO: Funciona tanto como Arreglo directo (string[][])
// como Objeto ({ indicatorsRows, loading, error })
// ─────────────────────────────────────────────
export type ExcelIndicatorsResult = string[][] & {
  indicatorsRows: string[][];
  loading: boolean;
  error: string | null;
};

function envolverResultado(
  rows: string[][],
  loading = false,
  error: string | null = null
): ExcelIndicatorsResult {
  const arr = [...rows] as ExcelIndicatorsResult;
  arr.indicatorsRows = rows;
  arr.loading = loading;
  arr.error = error;
  return arr;
}

// ─────────────────────────────────────────────
// HOOK PRINCIPAL: useExcelIndicators(centroId)
// Lee el Excel dinámicamente y entrega la tabla
// ─────────────────────────────────────────────
export function useExcelIndicators(centroId: string): ExcelIndicatorsResult {
  const [result, setResult] = useState<ExcelIndicatorsResult>(() =>
    envolverResultado([], true, null)
  );

  useEffect(() => {
    let cancel = false;

    cargarWorkbookExcel()
      .then((wb) => {
        if (cancel) return;
        const rows = procesarMetasDesdeWorkbook(wb, centroId);
        console.log(`[useExcelIndicators] Centro "${centroId}" (${CENTRO_TO_NIVEL[centroId]}): ${rows.length} filas leídas del Excel`);
        setResult(envolverResultado(rows, false, null));
      })
      .catch((err) => {
        if (cancel) return;
        console.error('[useExcelIndicators] Error al procesar Excel:', err);
        setResult(envolverResultado([], false, err instanceof Error ? err.message : String(err)));
      });

    return () => {
      cancel = true;
    };
  }, [centroId]);

  return result;
}

// ─────────────────────────────────────────────
// COMPONENTE PARA CARGAR UN EXCEL MANUALMENTE (OPCIONAL)
// ─────────────────────────────────────────────
export function ExcelReader({ onWorkbookLoaded }: { onWorkbookLoaded?: (wb: XLSX.WorkBook) => void }) {
  const [datos, setDatos] = useState<any[]>([]);
  const [columnas, setColumnas] = useState<string[]>([]);

  const handleArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      if (!buffer) return;
      const data = new Uint8Array(buffer);
      const workbook = XLSX.read(data, { type: 'array' });
      cachedWorkbook = workbook;
      if (onWorkbookLoaded) onWorkbookLoaded(workbook);

      const nombreHoja = workbook.SheetNames[0];
      const hoja = workbook.Sheets[nombreHoja];
      const filas = XLSX.utils.sheet_to_json<any>(hoja);
      setDatos(filas);
      if (filas.length > 0) {
        setColumnas(Object.keys(filas[0]));
      }
    };
    reader.readAsArrayBuffer(archivo);
  };

  return (
    <div style={{ padding: 12, border: '1px dashed #ccc', borderRadius: 8 }}>
      <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600 }}>Cargar archivo Excel (.xlsx):</p>
      <input type="file" accept=".xlsx,.xls" onChange={handleArchivo} />
      {datos.length > 0 && (
        <div style={{ maxHeight: 200, overflow: 'auto', marginTop: 10 }}>
          <table style={{ fontSize: 11, width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {columnas.map((col) => (
                  <th key={col} style={{ border: '1px solid #ddd', padding: 4, background: '#f5f5f5' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datos.slice(0, 10).map((fila, index) => (
                <tr key={index}>
                  {columnas.map((col) => (
                    <td key={col} style={{ border: '1px solid #ddd', padding: 4 }}>{fila[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExcelReader;