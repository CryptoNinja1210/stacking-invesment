const query = require('../db/db-connection.ts');
const { multipleColumnSet } = require('../utils/common.utils.ts');
const Role = require('../utils/userRoles.utils.ts');
const HttpException = require('../utils/HttpException.utils.ts');
class EmailVerifyModel {
    tableName = 'emails';

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT * FROM ${this.tableName}
            WHERE ${columnSet}`;

            const result = await query(sql, [...values]);
            // return back the first row (user)
            return result[0];
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    create = async ({ email, verifycode }) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
            (email, verifycode) VALUES (?,?)`;

            const result = await query(sql, [email, verifycode]);
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
            
            const sql = `DELETE * FROM ${this.tableName}
            WHERE ${columnSet}`;

            const result = await query(sql, [...values]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }
}

module.exports = new EmailVerifyModel;