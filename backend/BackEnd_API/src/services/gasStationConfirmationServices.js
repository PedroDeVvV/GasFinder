import { response } from "express";
import database from "../repository/connection.js";
import sql_commands from "../utils/dbQueries.js";

async function insertGasStationLocation(place_ID, id_posto) {
    const conn = await database.getConnection();
    if (conn == null) {
        console.log("erro na conexão")
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    const sql = "CALL InserirPostoELocalizacao(?, ?, @msg);";
    const values = [place_ID, id_posto];
    try {
        let res = await sql_commands.call(conn, sql, values);
        return res != undefined ? res : { message: "dados cadastrados com sucesso", error_code: 200};
    }
    catch (err) {
        console.log(err);
        //LOG_HERE
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    finally {
        try{
            await conn.end();
        }
        catch(err){
            //LOG_HERE
            console.error("erro ao fechar o banco de dados");
        }
    }
}

async function insertGasStationLocationWithLatAndLon(place_ID, id_posto, latitude, longitude) {
    const conn = await database.getConnection();
    if (conn == null) {
        console.log("erro na conexão")
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    const sql = "INSERT INTO tbl_localizacao_posto (place_ID, fk_id_posto, latitude, longitude) VALUES (?, ?, ?, ?);";
    const values = [place_ID, id_posto, latitude, longitude];
    try {
        let res = await conn.query(sql, values, (err, results, fields) => {
            console.log(results);
            console.log(fields);
            if (!!err) throw err;
        });
        return res != undefined ? res : { message: "dados cadastrados com sucesso", error_code: 200};
    }
    catch (err) {
        console.log(`não foi possível inserir um posto, dados do posto:
        place_ID: ${place_ID}
        id_posto: ${id_posto}
        latitude: ${latitude}
        longitude: ${longitude}
        error:
        ${err}`);
        //LOG_HERE
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    finally {
        try{
            await conn.end();
        }
        catch(err){
            //LOG_HERE
            console.error("erro ao fechar o banco de dados");
        }
    }
}

export default { insertGasStationLocation, insertGasStationLocationWithLatAndLon };