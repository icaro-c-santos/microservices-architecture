const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'course-db',
    user: 'root',
    password: 'root',
    database: 'course_service'
});

exports.getSubscriptions = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM subscriptions WHERE id = ?', [userId]);
    return rows[0];
};

exports.initialize = async () => {
    try {
        // Verificar se a tabela 'courses' existe
        const [tables] = await pool.query("SHOW TABLES LIKE 'subscriptions'");
        
        // Se a tabela não existir, cria a tabela e insere os cursos
        if (tables.length === 0) {
            const createTableQuery = `
                CREATE TABLE subscriptions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    courseName VARCHAR(100),
                    courseId VARCHAR(200),
                    status VARCHAR(200),
                    userId VARCHAR(200)
                );
            `;
            await pool.query(createTableQuery);

            const insertCoursesQuery = `
                INSERT INTO subscriptions (id, courseName, courseId, status,userId)
                VALUES
                (1, 'JavaScript Basics', '1e69da8e-569f-44e9-b5f7-a42cfd17ad43', 'PAID', 'cea07d0e-55d5-41bb-9c48-3e4f92161015'),
                (2, 'Python Advanced', '345358eb-44a7-40e0-a010-811b1f4b8a1d', 'PENDING', 'cea07d0e-55d5-41bb-9c48-3e4f92161015');
            `;
            await pool.query(insertCoursesQuery);

            console.log("Tabela 'subscription' criada e subscriptions inseridos com sucesso.");
        } else {
            console.log("Tabela 'subscription' já existe.");
        }
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
};