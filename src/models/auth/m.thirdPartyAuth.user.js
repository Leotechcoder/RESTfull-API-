import { pool } from '../../data/db.js'; 

export const  findOrCreate = async (thirdPartyId, username ) => {
    
    const result = await pool.query('SELECT * FROM public.users WHERE id_ = $1', [thirdPartyId]);

    let user = result.rows[0];
        
    if (!user) {
        const newUser = {
            id: thirdPartyId,
            username
        };
        const columns = ['id_', 'username'];
        const values = [newUser.id, newUser.username];

        // Filtra los valores válidos y sus correspondientes columnas
        const filteredValues = values.map(value => value ?? null);

        const placeholders = filteredValues.map((_, index) => `$${index + 1}`).join(', ');

        const insertQuery = `INSERT INTO public.users (${columns.join(', ')}) VALUES (${placeholders})`;

        try {
            const insertResult = await pool.query(insertQuery, filteredValues);
            console.log(`insertResult: ${insertResult}`);
        } catch (error) {
            console.error('Error inserting user:', error);
        }

    }
    return user;
}
