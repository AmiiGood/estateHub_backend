export const buscadorInfo = async (req, res) => {
  try {
    // SE OBTIENEN LOS PARÁMETROS DE LA PETICIÓN
    const input = ({ lat, long, limite, id_region } = req.body);

    // SE INICIALIZAN LOS PARÁMETROS A RETORNAR
    let params = {
      region: null,
      estado: null,
      municipio: null,
      ciudad: null,
      localidad: null,
      colonia: null,
      codigoPostal: null,
      calle: null,
      ageb: null,
      nse: null,
      poi: null,
      denue: null,
    };

    // SE INICIALIZAN VARIABLES DE CONTROL
    let error = false;
    let precision = 0; // 0 es que no encontró nada, el límite es 10
    let where = ``,
      filtros = [];

    // SE OBTIENE EL ID DE LA REGIÓN
    let idRegion = id_region;
    if (typeof id_region === "string") {
      idRegion = id_region.split(",");
    }
    if (typeof id_region === "number") {
      idRegion = [id_region];
    }
    // SE VERIFICA SI EL ID DE LA REGIÓN NO ES INDEFINIDO O NULO
    if (id_region != undefined || id_region != null) {
      // SE EJECUTA UNA CONSULTA PARA OBTENER PUNTOS E INTERSECCIONES DE LA REGIÓN
      let respuesta = await pool.query(
        `SELECT points, intersects FROM  
                (SELECT ST_SetSRID( ST_Point($1, $2)::geometry, 4326) AS points, 
                ST_INTERSECTS("SP_GEOMETRY", (ST_SetSRID( ST_Point($1, $2)::geometry, 4326))) as intersects 
                FROM carto_region r WHERE r.id_region = ANY ($3::INT[])) as t1 WHERE intersects = true`,
        [input.long, input.lat, idRegion]
      );
      if (respuesta.rows[0].intersects) {
        // SE EJECUTAN CONSULTAS PARA OBTENER INFORMACIÓN DETALLADA DE LA REGIÓN, EL ESTADO, EL MUNICIPIO Y LA LOCALIDAD
        const queryRegion = `SELECT region, id_region FROM carto_region 
                WHERE ST_Intersects("SP_GEOMETRY", $1) LIMIT 1;`;
        let region = await pool.query(queryRegion, [respuesta.rows[0].points]);
        if (region.rowCount > 0) {
          params.region = region.rows[0];
          precision++;
        } else {
          error = true;
        }
        const queryEstado = `SELECT estado, id_estado, id_region 
                FROM carto_estado 
                WHERE ST_Intersects("SP_GEOMETRY", $1) AND id_region = $2 LIMIT 1;`;
        let estado = await pool.query(queryEstado, [
          respuesta.rows[0].points,
          params.region.id_region,
        ]);
        if (estado.rowCount > 0) {
          params.estado = estado.rows[0];
          precision++;
        } else {
          error = true;
        }
        const queryMunicipio = `SELECT municipio, id_municipio, id_estado, id_region, region 
                FROM carto_municipio 
                WHERE ST_Intersects("SP_GEOMETRY", $1) AND id_region = $2 AND id_estado = $3 LIMIT 1;`;
        let municipio = await pool.query(queryMunicipio, [
          respuesta.rows[0].points,
          params.region.id_region,
          params.estado.id_estado,
        ]);
        if (municipio.rowCount > 0) {
          params.municipio = municipio.rows[0];
          precision++;
        } else {
          error = true;
        }
        const queryLocalidad = `SELECT id_localidad, id_municipio, id_estado, id_region, localidad
                FROM carto_localidad 
                WHERE st_distance(carto_localidad."SP_GEOMETRY", $1) < .009 AND id_region = $2 AND id_estado = $3 AND id_municipio = $4
                ORDER BY st_distance(carto_localidad."SP_GEOMETRY", $1) LIMIT 1;`;
        let localidad = await pool.query(queryLocalidad, [
          respuesta.rows[0].points,
          params.region.id_region,
          params.estado.id_estado,
          params.municipio.id_municipio,
        ]);
        if (localidad.rowCount > 0) {
          params.localidad = localidad.rows[0];
        } else {
          params.localidad = null;
        }

        //TRAE LA INFORMACIÓN DE LA AGEBS DEPENDIENTO DE LOS PARAMETROS YA OBTENIDOS
        const queryAgeb = `SELECT "POLYGON_NAME", "POBTOT"
                FROM carto_ageb_2020
                WHERE ST_Intersects(carto_ageb_2020."SP_GEOMETRY", $1) AND id_region = $2 AND id_estado = $3 AND id_municipio = $4;`;

        let ageb = await pool.query(queryAgeb, [
          respuesta.rows[0].points,
          params.region.id_region,
          params.estado.id_estado,
          params.municipio.id_municipio,
        ]);

        if (ageb.rowCount > 0) {
          params.ageb = ageb.rows[0];
        } else {
          params.ageb = null;
        }
        // Validación de resultados
        filtros.push(
          respuesta.rows[0].points,
          params.region.id_region,
          params.estado.id_estado,
          params.municipio.id_municipio
        );

        const queryCodigoPostal = `SELECT id_codigo_postal, id_municipio, id_estado, id_region, estado, municipio, codigo_postal 
                FROM carto_codigo_postal 
                WHERE ST_Intersects("SP_GEOMETRY"::geography, $1) AND id_region = $2 AND id_estado = $3 AND id_municipio = $4 ${where};`;
        let codigoPostal = await pool.query(queryCodigoPostal, filtros);
        if (codigoPostal.rowCount > 0) {
          params.codigoPostal = codigoPostal.rows[0];
          precision++;
        } else {
          params.codigoPostal = null;
        }
        filtros = [];
        where = ``;
        // Validación de resultados
        filtros.push(
          respuesta.rows[0].points,
          params.region.id_region,
          params.estado.id_estado,
          params.municipio.id_municipio
        );
        if (params.codigoPostal != null) {
          let i = 5;

          //???
          if (params.codigoPostal != null) {
            filtros.push(params.codigoPostal.id_codigo_postal);
            where += `AND id_codigo_postal = $${i}`;
          }
        }
        const queryColonia = `SELECT id_colonia, id_codigo_postal, id_municipio, id_estado, estado, municipio, colonia, codigo_postal 
                FROM carto_colonia 
                WHERE ST_Intersects("SP_GEOMETRY"::geography, $1) AND id_region = $2 AND id_estado = $3 AND id_municipio = $4 ${where};`;
        let colonia = await pool.query(queryColonia, filtros);
        if (colonia.rowCount > 0) {
          params.colonia = colonia.rows[0];
          precision++;
        } else {
          params.colonia = null;
        }
        const queryCalle = `SELECT id_calle, calle, l_refaddr, l_nrefaddr, r_refaddr, r_nrefaddr ,municipio, id_municipio, estado, id_estado, region, id_region, func_class,
                st_distance(carto_calle."SP_GEOMETRY", $1) as distancia
                FROM carto_calle 
                WHERE st_distance(carto_calle."SP_GEOMETRY", $1) < .00030 AND id_region = $2 AND id_municipio = $3 AND id_estado = $4
                ORDER BY st_distance(carto_calle."SP_GEOMETRY", $1) LIMIT 1`;
        let calle = await pool.query(queryCalle, [
          respuesta.rows[0].points,
          params.region.id_region,
          params.municipio.id_municipio,
          params.estado.id_estado,
        ]);
        if (calle.rowCount > 0) {
          params.calle = calle.rows[0];
          precision++;
        } else {
          params.calle = null;
        }

        filtros = [];
        where = ``;
        // Validación de resultados
        filtros.push(
          respuesta.rows[0].points,
          params.region.id_region,
          params.estado.id_estado,
          params.municipio.id_municipio
        );
        if (params.colonia != null) {
          filtros.push(params.colonia.id_colonia);
          where += `AND id_colonia = $5`;
        }
        const queryNSE = `SELECT id_nse, id_colonia, id_municipio, id_estado, id_region, colonia, codigo_postal, nse, estado, municipio 
                FROM carto_nse 
                WHERE ST_Intersects("SP_GEOMETRY", $1) AND id_region = $2 AND id_estado = $3 AND id_municipio = $4 ${where} LIMIT 1;`;
        let nse = await pool.query(queryNSE, filtros);
        if (nse.rowCount > 0) {
          params.nse = nse.rows[0];
          precision++;
        } else {
          params.nse = null;
        }

        const queryPoi = `SELECT  id_poi, poi AS "Nom_estab",
                COALESCE( 
                    CASE WHEN "numero" IS NULL THEN 'SIN NUMERO EXTERIOR' 
                        WHEN "numero" = '' THEN 'SIN NUMERO EXTERIOR'
                        ELSE "numero" 
                    END) as "numero",
                "codigo_postal", "calle", "municipio", "estado", "region"
                FROM carto_poi
                WHERE st_DWITHIN("SP_GEOMETRY"::geography, $1, 50) AND id_region = $2 LIMIT 1;`;
        let poi = await pool.query(queryPoi, [
          respuesta.rows[0].points,
          params.region.id_region,
        ]);
        // SE VERIFICA SI EL RECIBIDO 'POI' TIENE FILAS
        if (poi.rowCount > 0) {
          // SI HAY FILAS, SE ASIGNA EL PRIMER RESULTADO A LOS PARÁMETROS Y SE INCREMENTA LA PRECISIÓN
          params.poi = poi.rows[0];
          precision++;
        } else {
          // SI NO HAY FILAS, SE ASIGNA NULL A LOS PARÁMETROS
          params.poi = null;
        }
        // SE VERIFICA SI NO HAY ERRORES
        if (!error) {
          // SI NO HAY ERRORES, SE ENVÍA UNA RESPUESTA EXITOSA CON LOS PARÁMETROS Y LA PRECISIÓN
          res.status(200).send({
            ok: true,
            precision,
            params,
          });
        } else {
          // SI HAY ERRORES, SE ENVÍA UNA RESPUESTA DE ERROR CON LOS PARÁMETROS
          res.status(200).send({
            ok: false,
            params,
          });
        }
        // SI EL PUNTO NO ESTÁ DENTRO DE LA REGIÓN, SE ENVÍA UNA RESPUESTA INDICANDO EL ERROR
      } else {
        res.status(200).send({
          ok: false,
          params: "El punto no está dentro de la región",
        });
      }
    } else {
      // SI 'ID_REGION' NO ESTÁ DEFINIDO, SE ENVÍA UNA RESPUESTA INDICANDO EL ERROR
      res.status(200).send({
        ok: false,
        params: "id_region no está definida",
      });
    }
  } catch (error) {
    // EN CASO DE UN ERROR, SE ENVÍA UNA RESPUESTA DE ERROR CON EL MENSAJE DE ERROR
    console.log(error);
    sendErrorResponse(res, 500, error.message);
  }
};

export default { buscadorInfo };
