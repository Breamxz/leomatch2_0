// Запрещаем использование контекстного меню (правой кнопки мыши)
document.addEventListener('contextmenu', event => event.preventDefault());

// Предотвращаем растягивание страницы на мобильных устройствах
document.addEventListener('touchmove', function(event) {
  if (event.scale !== 1) {
    event.preventDefault();
  }
}, { passive: false });

// Предотвращаем масштабирование страницы
document.addEventListener('gesturestart', function(event) {
  event.preventDefault();
});

document.addEventListener('gesturechange', function(event) {
  event.preventPreventDefault();
});

document.addEventListener('gestureend', function(event) {
  event.preventDefault();
});

// Функции для переключения страниц
function showPage(pageId) {
  document.querySelectorAll('.container').forEach(container => {
    container.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'flex';
}

// При загрузке страницы инициализируем данные из localStorage
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем ширину экрана
  if (window.innerWidth <= 768) {
    document.body.style.display = 'flex'; // Показываем контент, если ширина экрана 768px или меньше
    showPage('page1'); // Показываем первую страницу
  } else {
    alert('Этот сайт предназначен только для мобильных устройств.');
  }
});

function fetchTelegramUserInfo(userId) {
  fetch(`/getTelegramUserInfo?userId=${userId}`)
    .then(response => response.json())
    .then(data => {
      console.log('User Info:', data);
      // Здесь можно обработать полученные данные о пользователе
    })
    .catch(error => {
      console.error('Error fetching user info:', error);
    });
}

function onTelegramAuth(user) {
  console.log('User authorized:', user);
  fetchTelegramUserInfo(user.id);
}
