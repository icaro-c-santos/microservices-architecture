
// Função para buscar o usuário pela rota /users
async function getUser() {
    const userId = 1; // Exemplo de ID do usuário, altere conforme necessário
    const response = await fetch(`localhost:3000/users/me`);
    if(response.status === 200){
        const user = await response.json();
        return user;
    }
   
    return null;
}

// Função para buscar os cursos do usuário pela rota /courses/:id
async function getCourses(userId) {
    const response = await fetch(`localhost:8002/courses/${userId}`);
    if(response.status === 200){
    const courses = await response.json();
    return courses;
    }
    return null
}

// Função para buscar as assinaturas do usuário pela rota /subscriptions
async function getSubscriptions(userId) {
    const response = await fetch(`localhost:8003/subscriptions/${userId}`);

    if(response.status === 200){
        const subscriptions = await response.json();
        return subscriptions;
    }
        return null
}

// Preencher a Home Page
async function loadHomePage() {
    const user = await getUser();
    const courses = await getCourses(user.id);

    if(courses === null){
        document.getElementById('error').style.display = 'block';
        return;
    }
    document.getElementById("userName").innerText = user.name;

    const coursesList = document.getElementById("coursesList");
    courses.forEach(course => {
        const li = document.createElement("li");
        li.innerText = course.name;
        coursesList.appendChild(li);
    });
}

// Preencher a página de Assinaturas
async function loadSubscriptionsPage() {
    const user = await getUser();
    const subscriptions = await getSubscriptions(user.id);
    
    if(subscriptions === null){
        document.getElementById('error').style.display = 'block';
        return;
    }
    const subscriptionsList = document.getElementById("subscriptionsList");
    subscriptions.forEach(subscription => {
        const li = document.createElement("li");
        li.innerText = `Curso: ${subscription.courseName} | Status: ${subscription.status}`;
        subscriptionsList.appendChild(li);
    });
}

console.log("carregou script")
// Carregar as páginas conforme necessário
if (window.location.pathname === "/index.html") {

    loadHomePage();
} else if (window.location.pathname === "/subscriptions.html") {
    loadSubscriptionsPage();
}
