const query = require('../db/db-connection.ts');
const { multipleColumnSet } = require('../utils/common.utils.ts');
const HttpException = require('../utils/HttpException.utils.ts');

class WithdrawInfoModel {
    tableName = 'withdrawinfo';


    find = async (params = {}) => { 
        try {
            let sql = `SELECT * FROM ${this.tableName}`;

            if (!Object.keys(params).length) {
                return await query(sql);
            }

            const { columnSet, values } = multipleColumnSet(params)
            sql += ` WHERE ${columnSet}`;
            return await query(sql, [...values]);
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }
    findBySort = async (params) => { 
        try {
            let sql = `SELECT * FROM ${this.tableName}`;
            sql += ` ORDER BY ${params}`;
            return await query(sql,'');
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT * FROM ${this.tableName}
            WHERE ${columnSet}`;
            const result = await query(sql, [...values]);

            return result[0];
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    create = async ({userid,date}) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
            (userid,date) VALUES (?,?)`;
            const result = await query(sql, [userid,date]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }
    
    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    delete = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `DELETE FROM ${this.tableName}
            WHERE ${columnSet}`;
            const result = await query(sql, [...values]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }
}

module.exports = new WithdrawInfoModel;