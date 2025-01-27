const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'course-db',
    user: 'root',
    password: 'root',
    database: 'course_service'
});

exports.findById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    if(rows.length > 0){
        return rows[0]
    }else{
        return null
    }

};
exports.initialize = async () => {
    try {
        // Verificar se a tabela 'courses' existe
        const [tables] = await pool.query("SHOW TABLES LIKE 'courses'");
        
        // Se a tabela não existir, cria a tabela e insere os cursos
        if (tables.length === 0) {
            const createTableQuery = `
                CREATE TABLE courses (
                    id VARCHAR(200) PRIMARY KEY,
                    name VARCHAR(100),
                    title VARCHAR(200),
                    subtitle VARCHAR(200),
                    url VARCHAR(200)
                );
            `;
            await pool.query(createTableQuery);

   
            const insertCoursesQuery = `
                INSERT INTO courses (id, name, title, subtitle, url)
                VALUES
                ('1e69da8e-569f-44e9-b5f7-a42cfd17ad43', 'JavaScript Basics', 'Learn JS', 'Introduction to JS', 'https://example.com/js'),
                ('345358eb-44a7-40e0-a010-811b1f4b8a1d', 'Python Advanced', 'Master Python', 'Deep dive into Python', 'https://example.com/python');
            `;
            await pool.query(insertCoursesQuery);

            console.log("Tabela 'courses' criada e cursos inseridos com sucesso.");
        } else {
            console.log("Tabela 'courses' já existe.");
        }
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
};