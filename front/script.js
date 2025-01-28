let userId;
let courses;

 function getUserToke() {
    userId = 'cea07d0e-55d5-41bb-9c48-3e4f92161015';
    courses = ['1e69da8e-569f-44e9-b5f7-a42cfd17ad43','345358eb-44a7-40e0-a010-811b1f4b8a1d'];
}

async function getUser() {

    try { 
        const response = await fetch(`http://localhost:8007/users/me`);
        if(response.status === 200){
            const user = await response.json();
            return user;
        }
    } catch (error) {
        console.log('Cannot get user', error)
        return null;
    }
    return null;
}

// Função para buscar os cursos do usuário pela rota /courses/:id
async function getCourses() {
    
    const coursesReturn = [];

    for ( const id of courses){
        try { 
            const url = `http://localhost:8002/courses/${id}`;
            const response = await fetch(url, {
                method: 'GET'
            });
            if(response.status === 200){
            const data = await response.json();
            coursesReturn.push(data);
            }
        } catch (error) {
            console.log('Cannot get courses', error)
         
        }
    }

   
    return coursesReturn;
}

// Função para buscar as assinaturas do usuário pela rota /subscriptions
async function getSubscriptions() {
    try { 
        const response = await fetch(`http://localhost:8003/subscriptions/${userId}`);
        if(response.status === 200){
            const subscriptions = await response.json();
            return subscriptions;
        }
    } catch (error) {
        console.log('Cannot get subscriptions', error)
        return null;
    }
    return null;
   
}


async function loadHomePage() {
    const user = await getUser();
    const courses = await getCourses();


    if(user){
        document.getElementById("userName").innerText = user?.name;
    }

    
    if(courses.length === 0){
        document.getElementById('error').style.display = 'block';
        return;
    }
  
   

    const coursesList = document.getElementById("coursesList");
    courses.forEach(course => {
        const card = document.createElement('li');
        card.className = 'card';
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.name}</p>
        `;
    
        card.addEventListener('click', () => {
            window.open(course.url, '_blank');
        });
    
        coursesList.appendChild(card);
    });
}



async function loadSubscriptionsPage() {
    const subscriptions = await getSubscriptions(userId);

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

getUserToke();
if (window.location.pathname.includes('/index.html')) {
    loadHomePage();
} else if (window.location.pathname.includes("/subscriptions.html")) {
    loadSubscriptionsPage();
}
